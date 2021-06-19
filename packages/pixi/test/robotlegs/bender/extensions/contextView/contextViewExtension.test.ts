// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Context, IContext, LogLevel } from "@robotlegsjs/core";
import { assert } from "chai";
import { Container } from "pixi.js";
import { IContextView } from "../../../../../src/robotlegs/bender/extensions/contextView/api/IContextView";
import { ContextViewExtension } from "../../../../../src/robotlegs/bender/extensions/contextView/ContextViewExtension";
import { ContextView } from "../../../../../src/robotlegs/bender/extensions/contextView/impl/ContextView";
import "../../../../entry";
import { CallbackLogTarget } from "./support/CallbackLogTarget";
import { LogParams } from "./support/LogParams";

describe("ContextViewExtension", () => {
    let context: IContext;

    beforeEach(() => {
        context = new Context();
    });

    afterEach(() => {
        context.destroy();
        context = null;
    });

    it("installing_after_initialization_throws_error", () => {
        function installExtensionAfterInitialization(): void {
            context.initialize();
            context.install(ContextViewExtension);
        }
        assert.throws(installExtensionAfterInitialization, Error);
    });

    it("contextView_is_mapped", () => {
        let container = new Container();
        let actual: ContextView = null;
        context.install(ContextViewExtension).configure(new ContextView(container));
        context.whenInitializing(function (): void {
            actual = context.injector.get<ContextView>(IContextView);
        });
        context.initialize();
        assert.equal(actual.view, container);
    });

    it("second_displayObjectContainer_is_ignored", () => {
        let container = new Container();
        let actual: ContextView = null;
        let secondContainer = new Container();
        context
            .install(ContextViewExtension)
            .configure(new ContextView(container), new ContextView(secondContainer));
        context.whenInitializing(function (): void {
            actual = context.injector.get<ContextView>(IContextView);
        });
        context.initialize();
        assert.equal(actual.view, container);
    });

    it("extension_logs_error_when_context_initialized_with_no_contextView", () => {
        let errorLogged: boolean = false;
        let logTarget: CallbackLogTarget = new CallbackLogTarget(function (log: LogParams): void {
            if (log.source instanceof ContextViewExtension && log.level === LogLevel.ERROR) {
                errorLogged = true;
            }
        });
        context.install(ContextViewExtension);
        context.addLogTarget(logTarget);
        context.initialize();
        assert.isTrue(errorLogged);
    });
});
