// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Context, IContext, LogLevel } from "@robotlegsjs/core";
import { assert } from "chai";
import { Container } from "pixi.js";
import { PixiBundle } from "../../../../../src/robotlegs/bender/bundles/pixi/PixiBundle";
import { IContextView } from "../../../../../src/robotlegs/bender/extensions/contextView/api/IContextView";
import { ContextView } from "../../../../../src/robotlegs/bender/extensions/contextView/impl/ContextView";
import { IMediatorMap } from "../../../../../src/robotlegs/bender/extensions/mediatorMap/api/IMediatorMap";
import { IViewManager } from "../../../../../src/robotlegs/bender/extensions/viewManager/api/IViewManager";
import { ContainerRegistry } from "../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";
import "../../../../entry";
import { CallbackLogTarget } from "../../extensions/contextView/support/CallbackLogTarget";
import { LogParams } from "../../extensions/contextView/support/LogParams";

describe("PixiBundle", () => {
    let context: IContext;

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }
        context = null;
    });

    it("bundle_is_properly_installed_into_context", () => {
        context = new Context();
        context.install(PixiBundle).configure(new ContextView(new Container())).initialize();

        // Verify if all extensions are installed
        assert.isTrue(context.injector.isBound(IContextView));
        assert.isTrue(context.injector.isBound(ContainerRegistry));
        assert.isTrue(context.injector.isBound(IViewManager));
        assert.isTrue(context.injector.isBound(IMediatorMap));
    });

    it("bundle_logs_an_error_message_when_context_view_is_not_provided", () => {
        let errorLogged: boolean = false;
        let logTarget: CallbackLogTarget = new CallbackLogTarget((log: LogParams) => {
            if (log.source instanceof PixiBundle && log.level === LogLevel.ERROR) {
                errorLogged = log.message === "PixiBundle requires IContextView.";
            }
        });

        context = new Context();
        context.addLogTarget(logTarget);
        context.install(PixiBundle).initialize();
        assert.isTrue(errorLogged);
    });
});
