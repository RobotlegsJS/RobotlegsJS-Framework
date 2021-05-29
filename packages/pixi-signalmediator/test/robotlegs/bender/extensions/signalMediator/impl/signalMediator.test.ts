// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry.ts";

import { assert } from "chai";

import { Signal } from "@robotlegsjs/signals";

import { TestMediator } from "../support/TestMediator";

describe("SignalMediator", () => {
    let testMediator: TestMediator;

    beforeEach(() => {
        testMediator = new TestMediator();
    });

    afterEach(() => {
        testMediator = null;
    });

    it("addToSignal_handler_is_called", () => {
        let called: boolean = false;

        let signal: Signal = new Signal();

        testMediator.addToSignalRouter(signal, () => {
            called = true;
        });

        signal.dispatch();

        assert.isTrue(called);
    });

    it("addToSignal_handlers_are_called", () => {
        const expected: number = 3;
        let count: number = 0;

        let signal: Signal = new Signal();

        testMediator.addToSignalRouter(signal, () => {
            count++;
        });
        testMediator.addToSignalRouter(signal, () => {
            count++;
        });
        testMediator.addToSignalRouter(signal, () => {
            count++;
        });

        signal.dispatch();

        assert.deepEqual(count, expected);
    });

    it("addToSignal_handlers_are_called_twice_when_signal_dispatch_twice", () => {
        const expected: number = 3;
        let count: number = 0;

        let signal: Signal = new Signal();

        testMediator.addToSignalRouter(signal, () => {
            count++;
        });
        testMediator.addToSignalRouter(signal, () => {
            count++;
        });
        testMediator.addToSignalRouter(signal, () => {
            count++;
        });

        signal.dispatch();
        signal.dispatch();

        assert.deepEqual(count, expected * 2);
    });

    it("addOnceToSignal_handler_is_called", () => {
        let called: boolean = false;

        let signal: Signal = new Signal();

        testMediator.addOnceToSignalRouter(signal, () => {
            called = true;
        });

        signal.dispatch();

        assert.isTrue(called);
    });

    it("addOnceToSignal_handler_is_called_once_when_signal_dispatch_twice", () => {
        const expected: number = 1;
        let count: number = 0;

        let signal: Signal = new Signal();

        testMediator.addOnceToSignalRouter(signal, () => {
            count++;
        });

        signal.dispatch();

        assert.equal(count, expected);
    });

    it("addOnceToSignal_handlers_are_called", () => {
        const expected: number = 3;
        let count: number = 0;

        let signal: Signal = new Signal();

        testMediator.addOnceToSignalRouter(signal, () => {
            count++;
        });
        testMediator.addOnceToSignalRouter(signal, () => {
            count++;
        });
        testMediator.addOnceToSignalRouter(signal, () => {
            count++;
        });

        signal.dispatch();

        assert.equal(count, expected);
    });

    it("addOnceToSignal_handlers_are_called_once_when_signal_dispatch_twice", () => {
        const expected: number = 3;
        let count: number = 0;

        let signal: Signal = new Signal();

        testMediator.addOnceToSignalRouter(signal, () => {
            count++;
        });
        testMediator.addOnceToSignalRouter(signal, () => {
            count++;
        });
        testMediator.addOnceToSignalRouter(signal, () => {
            count++;
        });

        signal.dispatch();
        signal.dispatch();

        assert.equal(count, expected);
    });

    it("postDestroy_removes_all_handlers", () => {
        const expected: number = 0;
        let count: number = 0;

        let signal: Signal = new Signal();

        let handler1: Function = () => {
            count++;
        };
        let handler2: Function = () => {
            count++;
        };
        let handler3: Function = () => {
            count++;
        };

        testMediator.addOnceToSignalRouter(signal, handler1);
        testMediator.addOnceToSignalRouter(signal, handler2);
        testMediator.addOnceToSignalRouter(signal, handler3);
        testMediator.postDestroy();

        signal.dispatch();

        assert.equal(count, expected);
    });

    it("initialize_and_destroy_are_normally_called", () => {
        testMediator.initialize();
        testMediator.destroy();
    });
});
