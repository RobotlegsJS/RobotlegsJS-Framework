// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import sinon = require("sinon");

import { assert } from "chai";

import Stage from "openfl/display/Stage";
import DisplayObjectContainer from "openfl/display/DisplayObjectContainer";

import { instantiateUnmapped, IInjector, ITypeFilter, RobotlegsInjector, TypeMatcher } from "@robotlegsjs/core";

import { IMediator } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/api/IMediator";
import { IMediatorMapping } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/api/IMediatorMapping";
import { MediatorFactory } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorFactory";
import { MediatorMapping } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorMapping";
import { MediatorManager } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorManager";

import { CallbackMediator } from "../support/CallbackMediator";
import { EmptyMediator } from "../support/EmptyMediator";
import { LifecycleReportingMediator } from "../support/LifecycleReportingMediator";

describe("MediatorManager", () => {
    let injector: IInjector = null;
    let factory: MediatorFactory = null;
    let manager: MediatorManager = null;
    let stage: Stage = null;

    beforeEach(() => {
        injector = new RobotlegsInjector();
        factory = new MediatorFactory(injector);
        manager = <MediatorManager>(<any>factory)._manager;
        stage = new Stage();
    });

    afterEach(() => {
        injector = null;
        factory = null;
        manager = null;
        stage = null;
    });

    function createTypeFilter(allOf: any[], anyOf: any[] = null, noneOf: any[] = null): ITypeFilter {
        const matcher: TypeMatcher = new TypeMatcher();

        if (allOf) {
            matcher.allOf(allOf);
        }
        if (anyOf) {
            matcher.anyOf(anyOf);
        }
        if (noneOf) {
            matcher.noneOf(noneOf);
        }

        return matcher.createTypeFilter();
    }

    it("mediator_is_removed_from_factory_when_view_leaves_stage", () => {
        let factoryMock = sinon.mock(factory);
        factoryMock.expects("removeMediators").once();

        const view: DisplayObjectContainer = new DisplayObjectContainer();
        const mapping: IMediatorMapping = new MediatorMapping(createTypeFilter([DisplayObjectContainer]), CallbackMediator);
        const mediator: IMediator = instantiateUnmapped<IMediator>(injector, CallbackMediator);

        stage.addChild(view);
        manager.addMediator(mediator, view, mapping);
        stage.removeChild(view);

        factoryMock.restore();
        factoryMock.verify();
    });

    it("mediator_is_NOT_removed_when_view_leaves_stage_when_autoRemove_is_false", () => {
        let factoryMock = sinon.mock(factory);
        factoryMock.expects("removeMediators").never();

        const view: DisplayObjectContainer = new DisplayObjectContainer();
        const mapping: MediatorMapping = new MediatorMapping(createTypeFilter([DisplayObjectContainer]), CallbackMediator);
        mapping.autoRemove(false);
        const mediator: IMediator = instantiateUnmapped<IMediator>(injector, CallbackMediator);

        stage.addChild(view);
        manager.addMediator(mediator, view, mapping);
        stage.removeChild(view);

        factoryMock.restore();
        factoryMock.verify();
    });

    it("mediator_lifecycle_methods_are_invoked", () => {
        const expected: string[] = ["preInitialize", "initialize", "postInitialize", "preDestroy", "destroy", "postDestroy"];
        const actual: string[] = [];
        expected.forEach((phase: string) => {
            injector
                .bind("Function")
                .toFunction((ph: string) => {
                    actual.push(ph);
                })
                .whenTargetNamed(phase + "Callback");
        });
        const item: DisplayObjectContainer = new DisplayObjectContainer();
        const mediator: IMediator = instantiateUnmapped<IMediator>(injector, LifecycleReportingMediator);
        const mapping: IMediatorMapping = new MediatorMapping(createTypeFilter([DisplayObjectContainer]), LifecycleReportingMediator);
        manager.addMediator(mediator, item, mapping);
        manager.removeMediator(mediator, item, mapping);
        assert.deepEqual(actual, expected);
    });

    it("mediator_is_given_view", () => {
        const view: DisplayObjectContainer = new DisplayObjectContainer();
        const mapping: IMediatorMapping = new MediatorMapping(createTypeFilter([DisplayObjectContainer]), LifecycleReportingMediator);
        const mediator: LifecycleReportingMediator = instantiateUnmapped<LifecycleReportingMediator>(injector, LifecycleReportingMediator);
        manager.addMediator(mediator, view, mapping);
        assert.equal(mediator.view, view);
    });

    it("empty_mediator_is_created", () => {
        let managerMock = sinon.mock(manager);
        managerMock.expects("initializeMediator").once();

        const view: DisplayObjectContainer = new DisplayObjectContainer();
        const mapping: IMediatorMapping = new MediatorMapping(createTypeFilter([DisplayObjectContainer]), EmptyMediator);

        factory.createMediators(view, DisplayObjectContainer, [mapping]);

        managerMock.restore();
        managerMock.verify();
    });

    it("empty_mediator_is_destroyed", () => {
        let managerMock = sinon.mock(manager);
        managerMock.expects("initializeMediator").once();
        managerMock.expects("destroyMediator").once();

        const view: DisplayObjectContainer = new DisplayObjectContainer();

        const mapping: IMediatorMapping = new MediatorMapping(createTypeFilter([DisplayObjectContainer]), EmptyMediator);

        factory.createMediators(view, DisplayObjectContainer, [mapping]);

        stage.addChild(view);
        stage.removeChild(view);

        managerMock.restore();
        managerMock.verify();
    });
});
