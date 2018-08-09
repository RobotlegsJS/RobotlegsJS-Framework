// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import DisplayObjectContainer from "openfl/display/DisplayObjectContainer";
import DisplayObject from "openfl/display/DisplayObject";

import { IInjector, IContext, Context, TypeMatcher } from "@robotlegsjs/core";

import { MediatorMap } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorMap";

import { Alpha50PercentHook } from "../support/Alpha50PercentHook";
import { ExampleMediator } from "../support/ExampleMediator";
import { ExampleMediator2 } from "../support/ExampleMediator2";
import { ExampleView } from "../support/ExampleView";
import { HappyGuard } from "../support/HappyGuard";
import { ExampleDisplayObjectMediator } from "../support/ExampleDisplayObjectMediator";
import { HookWithMediatorAndViewInjectionReportFunction } from "../support/HookWithMediatorAndViewInjectionReportFunction";
import { MediatorWatcher } from "../support/MediatorWatcher";
import { NotAView } from "../support/NotAView";
import { NotAViewMediator } from "../support/NotAViewMediator";
import { OnlyIfViewHasChildrenGuard } from "../support/OnlyIfViewHasChildrenGuard";
import { RectangleMediator } from "../support/RectangleMediator";

describe("MediatorMap", () => {
    let context: IContext = null;
    let injector: IInjector = null;
    let mediatorMap: MediatorMap = null;
    let mediatorWatcher: MediatorWatcher = null;

    beforeEach(() => {
        context = new Context();
        injector = context.injector;
        mediatorMap = new MediatorMap(context);
        mediatorWatcher = new MediatorWatcher();
        injector.bind(MediatorWatcher).toConstantValue(mediatorWatcher);
    });

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }

        context = null;
        injector = null;
        mediatorMap = null;
        mediatorWatcher = null;
    });

    it("can_be_instantiated", () => {
        assert.instanceOf(mediatorMap, MediatorMap);
    });

    it("a_hook_runs_and_receives_injections_of_view_and_mediator", () => {
        const expectedView: ExampleView = new ExampleView();
        const expectedViewWidth: number = 100;
        const expectedViewHeight: number = 200;

        let actualView: ExampleView = null;
        let actualViewWidth: number = 0;
        let actualViewHeight: number = 0;

        mediatorMap
            .map(ExampleView)
            .toMediator(RectangleMediator)
            .withHooks(HookWithMediatorAndViewInjectionReportFunction);

        injector
            .bind(Number)
            .toConstantValue(expectedViewWidth)
            .whenTargetNamed("width");
        injector
            .bind(Number)
            .toConstantValue(expectedViewHeight)
            .whenTargetNamed("height");

        injector
            .bind("Function")
            .toFunction((view: ExampleView, width: number, height: number) => {
                actualView = view;
                actualViewWidth = width;
                actualViewHeight = height;
            })
            .whenTargetNamed("reportView");

        mediatorMap.handleView(expectedView, ExampleView);

        assert.equal(actualView, expectedView);
        assert.equal(actualViewWidth, expectedViewWidth);
        assert.equal(actualViewHeight, expectedViewHeight);
    });

    it("create_mediator_instantiates_mediator_for_view_when_mapped", () => {
        mediatorMap.map(ExampleView).toMediator(ExampleMediator);

        mediatorMap.handleView(new ExampleView(), ExampleView);

        const expectedNotifications: string[] = ["ExampleMediator"];

        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });

    it("doesnt_leave_view_and_mediator_mappings_lying_around", () => {
        mediatorMap.mapMatcher(new TypeMatcher().anyOf(ExampleView)).toMediator(ExampleMediator);
        mediatorMap.handleView(new ExampleView(), ExampleView);

        assert.isFalse(injector.isBound(DisplayObjectContainer));
        assert.isFalse(injector.isBound(ExampleView));
        assert.isFalse(injector.isBound(ExampleMediator));
    });

    xit("handler_creates_mediator_for_view_mapped_by_matcher", () => {
        mediatorMap.mapMatcher(new TypeMatcher().allOf(DisplayObject)).toMediator(ExampleDisplayObjectMediator);

        mediatorMap.handleView(new ExampleView(), ExampleView);

        const expectedNotifications: string[] = ["ExampleDisplayObjectMediator"];

        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });

    xit("handler_doesnt_create_mediator_for_wrong_view_mapped_by_matcher", () => {
        mediatorMap.mapMatcher(new TypeMatcher().allOf(DisplayObjectContainer)).toMediator(ExampleDisplayObjectMediator);

        mediatorMap.handleView(new DisplayObject(), null);

        const expectedNotifications: string[] = [];

        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });

    it("mediate_instantiates_mediator_for_view_when_matched_to_mapping", () => {
        mediatorMap.map(ExampleView).toMediator(ExampleMediator);

        mediatorMap.mediate(new ExampleView());

        const expectedNotifications: string[] = ["ExampleMediator"];

        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });

    it("mediator_is_created_if_guard_allows_it", () => {
        mediatorMap
            .map(ExampleView)
            .toMediator(ExampleMediator)
            .withGuards(OnlyIfViewHasChildrenGuard);
        const view: ExampleView = new ExampleView();
        view.addChild(new ExampleView());
        mediatorMap.mediate(view);
        const expectedNotifications: string[] = ["ExampleMediator"];
        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });

    it("no_mediator_is_created_if_guard_prevents_it", () => {
        mediatorMap
            .map(ExampleView)
            .toMediator(ExampleMediator)
            .withGuards(OnlyIfViewHasChildrenGuard);
        const view: ExampleView = new ExampleView();
        mediatorMap.mediate(view);
        const expectedNotifications: string[] = [];
        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });

    it("runs_destroy_on_created_mediator_when_unmediate_runs", () => {
        mediatorMap.map(ExampleView).toMediator(ExampleMediator);
        const view: ExampleView = new ExampleView();
        mediatorMap.mediate(view);
        mediatorMap.unmediate(view);
        const expectedNotifications: string[] = ["ExampleMediator", "ExampleMediator destroy"];
        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });

    it("multiple_mappings_per_matcher_create_mediators", () => {
        mediatorMap.map(ExampleView).toMediator(ExampleMediator);
        mediatorMap.map(ExampleView).toMediator(ExampleMediator2);
        mediatorMap.mediate(new ExampleView());
        const expectedNotifications: string[] = ["ExampleMediator", "ExampleMediator2"];
        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });

    it("multiple_mappings_per_matcher_destroy_mediators", () => {
        mediatorMap.map(ExampleView).toMediator(ExampleMediator);
        mediatorMap.map(ExampleView).toMediator(ExampleMediator2);

        const view: ExampleView = new ExampleView();

        mediatorMap.mediate(view);
        mediatorMap.unmediate(view);

        const expectedNotifications: string[] = [
            "ExampleMediator",
            "ExampleMediator2",
            "ExampleMediator destroy",
            "ExampleMediator2 destroy"
        ];
        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });

    it("only_one_mediator_created_if_identical_mapping_duplicated", () => {
        mediatorMap
            .map(ExampleView)
            .toMediator(ExampleMediator)
            .withGuards(HappyGuard)
            .withHooks(Alpha50PercentHook);
        mediatorMap
            .map(ExampleView)
            .toMediator(ExampleMediator)
            .withGuards(HappyGuard)
            .withHooks(Alpha50PercentHook);

        mediatorMap.mediate(new ExampleView());
        const expectedNotifications: string[] = ["ExampleMediator"];
        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });

    it("removing_a_mapping_that_doesnt_exist_doesnt_throw_an_error", () => {
        mediatorMap.unmap(ExampleView).fromMediator(ExampleMediator);
    });

    it("unmediateAll_removes_all_mediators", () => {
        mediatorMap.map(ExampleView).toMediator(ExampleMediator);
        mediatorMap.map(ExampleView).toMediator(ExampleMediator2);

        const view: ExampleView = new ExampleView();

        mediatorMap.mediate(view);
        mediatorMap.unmediateAll();

        const expectedNotifications: string[] = [
            "ExampleMediator",
            "ExampleMediator2",
            "ExampleMediator destroy",
            "ExampleMediator2 destroy"
        ];
        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });

    it("mediator_is_created_for_non_view_object", () => {
        mediatorMap.map(NotAView).toMediator(NotAViewMediator);
        const notAView: NotAView = new NotAView();
        mediatorMap.mediate(notAView);
        const expectedNotifications: string[] = ["NotAViewMediator"];
        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });

    it("non_view_object_injected_into_mediator_correctly", () => {
        mediatorMap.map(NotAView).toMediator(NotAViewMediator);
        const notAView: NotAView = new NotAView();
        mediatorMap.mediate(notAView);
        assert.equal(notAView.mediatorName, "NotAViewMediator");
    });

    it("mediator_is_destroyed_for_non_view_object", () => {
        mediatorMap.map(NotAView).toMediator(NotAViewMediator);
        const notAView: NotAView = new NotAView();
        mediatorMap.mediate(notAView);
        mediatorMap.unmediate(notAView);
        const expectedNotifications: string[] = ["NotAViewMediator", "NotAViewMediator destroy"];
        assert.deepEqual(expectedNotifications, mediatorWatcher.notifications);
    });
});
