// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { assert } from "chai";

import { IContext, Context, LogLevel } from "@robotlegsjs/core";

import { IContextView, IMediatorMap, IViewManager, ContextView, OpenFLBundle } from "../../../../../src";

import { ContainerRegistry } from "../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";

import { CallbackLogTarget } from "../../extensions/contextView/support/CallbackLogTarget";
import { LogParams } from "../../extensions/contextView/support/LogParams";

import Stage from "openfl/display/Stage";

describe("OpenFLBundle", () => {
    let context: IContext;

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }
        context = null;
    });

    it("bundle_is_properly_installed_into_context", () => {
        context = new Context();
        context
            .install(OpenFLBundle)
            .configure(new ContextView(new Stage()))
            .initialize();

        // Verify if all extensions are installed
        assert.isTrue(context.injector.isBound(IContextView));
        assert.isTrue(context.injector.isBound(ContainerRegistry));
        assert.isTrue(context.injector.isBound(IViewManager));
        assert.isTrue(context.injector.isBound(IMediatorMap));
    });

    it("bundle_logs_an_error_message_when_context_view_is_not_provided", () => {
        let errorLogged: boolean = false;
        let logTarget: CallbackLogTarget = new CallbackLogTarget((log: LogParams) => {
            if (log.source instanceof OpenFLBundle && log.level === LogLevel.ERROR) {
                errorLogged = log.message === "OpenFLBundle requires IContextView.";
            }
        });

        context = new Context();
        context.addLogTarget(logTarget);
        context.install(OpenFLBundle).initialize();
        assert.isTrue(errorLogged);
    });
});
