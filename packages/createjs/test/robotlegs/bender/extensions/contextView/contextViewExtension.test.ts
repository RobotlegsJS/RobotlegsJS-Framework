// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { assert } from "chai";

import { IContext, Context, LogLevel } from "@robotlegsjs/core";

import { IContextView, ContextView, ContextViewExtension } from "../../../../../src";

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
        let stage: createjs.Stage = new createjs.Stage("canvas");
        let actual: ContextView = null;
        context.install(ContextViewExtension).configure(new ContextView(stage));
        context.whenInitializing(function (): void {
            actual = context.injector.get<ContextView>(IContextView);
        });
        context.initialize();
        assert.equal(actual.view, stage);
    });

    it("second_displayObjectContainer_is_ignored", () => {
        let stage: createjs.Stage = new createjs.Stage("canvas");
        let actual: ContextView = null;
        let secondStage: createjs.Stage = new createjs.Stage("canvas2");
        context
            .install(ContextViewExtension)
            .configure(new ContextView(stage), new ContextView(secondStage));
        context.whenInitializing(function (): void {
            actual = context.injector.get<ContextView>(IContextView);
        });
        context.initialize();
        assert.equal(actual.view, stage);
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
