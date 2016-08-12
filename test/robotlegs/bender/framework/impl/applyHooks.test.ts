// ------------------------------------------------------------------------------
//  Copyright (c) 2009-2013 the original author or authors. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/// <reference path="../../../../../node_modules/reflect-metadata/reflect-metadata.d.ts" />
/// <reference path="../../../../../typings/index.d.ts" />

import "reflect-metadata";

import { assert } from "chai";

import { applyHooks } from "../../../../../src/robotlegs/bender/framework/impl/applyHooks";
import { RobotlegsInjector } from "../../../../../src/robotlegs/bender/framework/impl/RobotlegsInjector";

import { CallbackHook } from "./hookSupport/CallbackHook";

describe("applyHooks", () => {

    it("function hooks run", () => {
        let callCount: number = 0;
        applyHooks([function(): void { callCount++; }]);
        assert.equal(callCount, 1);
    });

    it("class hooks run", () => {
        let callCount: number = 0;
        let injector: RobotlegsInjector = new RobotlegsInjector();
        injector.bind("Function").toConstantValue(function(): void { callCount++; }).whenTargetNamed("hookCallback");
        applyHooks([CallbackHook], injector);
        assert.equal(callCount, 1);
    });

    it("instance hooks run", () => {
        let callCount: number = 0;
        let hook: CallbackHook = new CallbackHook(function(): void { callCount++; });
        applyHooks([hook]);
        assert.equal(callCount, 1);
    });

    it("instance without hook throws error", () => {
        function hookInstanceWithoutHook(): void {
            applyHooks([{}]);
        }
        assert.throws(hookInstanceWithoutHook, TypeError, "hook.hook is not a function");
    });
});
