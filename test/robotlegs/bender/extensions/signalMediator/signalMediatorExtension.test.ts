// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//  Copyright (c) 2016 San Dinh Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry.ts";

import { assert } from "chai";

import { Context } from "@robotlegsjs/core";

import { SignalMediatorExtension } from "../../../../../src/robotlegs/bender/extensions/signalMediator/SignalMediatorExtension";
import { ISignalMap } from "../../../../../src/robotlegs/bender/extensions/signalMediator/api/ISignalMap";
import { SignalMap } from "../../../../../src/robotlegs/bender/extensions/signalMediator/impl/SignalMap";

describe("SignalMediatorExtension", () => {
    let context: Context;

    beforeEach(() => {
        context = new Context();
    });

    afterEach(() => {
        context = null;
    });

    it("signalMap is mapped into injector", () => {
        let actual: Object = null;
        context.install(SignalMediatorExtension);
        context.whenInitializing(function(): void {
            actual = context.injector.get(ISignalMap);
        });
        context.initialize();
        assert.instanceOf(actual, SignalMap);
    });
});
