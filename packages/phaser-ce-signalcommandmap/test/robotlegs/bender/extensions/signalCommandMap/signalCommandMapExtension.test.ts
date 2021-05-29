// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry.ts";

import { assert } from "chai";

import { Context } from "@robotlegsjs/core";

import { ISignalCommandMap } from "../../../../../src/robotlegs/bender/extensions/signalCommandMap/api/ISignalCommandMap";
import { SignalCommandMap } from "../../../../../src/robotlegs/bender/extensions/signalCommandMap/impl/SignalCommandMap";
import { SignalCommandMapExtension } from "../../../../../src/robotlegs/bender/extensions/signalCommandMap/SignalCommandMapExtension";

import { Data } from "./support/Data";
import { RelayCommand } from "./support/RelayCommand";
import { RelaySignal } from "./support/RelaySignal";
import { TargetCommand } from "./support/TargetCommand";
import { TargetSignal } from "./support/TargetSignal";

describe("SignalCommandMapExtension", () => {
    let context: Context;

    beforeEach(() => {
        context = new Context();
    });

    afterEach(() => {
        context = null;
    });

    it("signalCommandMap is mapped into injector", () => {
        let actual: Object = null;
        context.install(SignalCommandMapExtension);
        context.whenInitializing(function(): void {
            actual = context.injector.get(ISignalCommandMap);
        });
        context.initialize();
        assert.instanceOf(actual, SignalCommandMap);
    });

    it("chained injections pass through injection targets", () => {
        context.install(SignalCommandMapExtension);
        context.initialize();

        let instance: ISignalCommandMap = context.injector.get<ISignalCommandMap>(ISignalCommandMap);

        instance.map(RelaySignal).toCommand(RelayCommand);
        instance.map(TargetSignal).toCommand(TargetCommand);

        TargetCommand.TARGET_VALUE = 0;
        context.injector.get<RelaySignal>(RelaySignal).dispatch(new Data(3));
        assert.equal(TargetCommand.TARGET_VALUE, 3);
    });
});
