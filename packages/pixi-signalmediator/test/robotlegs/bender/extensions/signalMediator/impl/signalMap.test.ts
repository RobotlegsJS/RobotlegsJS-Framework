// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry.ts";

import { assert } from "chai";

import { Signal } from "@robotlegsjs/signals";

import { ISignalMap } from "../../../../../../src/robotlegs/bender/extensions/signalMediator/api/ISignalMap";
import { SignalMap } from "../../../../../../src/robotlegs/bender/extensions/signalMediator/impl/SignalMap";

describe("SignalMap", () => {
    let signalMap: ISignalMap;

    beforeEach(() => {
        signalMap = new SignalMap();
    });

    afterEach(() => {
        signalMap = null;
    });

    it("can_be_instantiated", () => {
        assert.instanceOf(signalMap, SignalMap);
    });

    it("addToSignal_handler_is_called", () => {
        let called: boolean = false;

        let signal: Signal = new Signal();

        signalMap.addToSignal(signal, () => {
            called = true;
        });

        signal.dispatch();

        assert.isTrue(called);
    });

    it("addToSignal_handlers_are_called", () => {
        const expected: number = 3;
        let count: number = 0;

        let signal: Signal = new Signal();

        signalMap.addToSignal(signal, () => {
            count++;
        });
        signalMap.addToSignal(signal, () => {
            count++;
        });
        signalMap.addToSignal(signal, () => {
            count++;
        });

        signal.dispatch();

        assert.deepEqual(count, expected);
    });

    it("addToSignal_handlers_are_called_twice_when_signal_dispatch_twice", () => {
        const expected: number = 3;
        let count: number = 0;

        let signal: Signal = new Signal();

        signalMap.addToSignal(signal, () => {
            count++;
        });
        signalMap.addToSignal(signal, () => {
            count++;
        });
        signalMap.addToSignal(signal, () => {
            count++;
        });

        signal.dispatch();
        signal.dispatch();

        assert.deepEqual(count, expected * 2);
    });

    it("addOnceToSignal_handler_is_called", () => {
        let called: boolean = false;

        let signal: Signal = new Signal();

        signalMap.addOnceToSignal(signal, () => {
            called = true;
        });

        signal.dispatch();

        assert.isTrue(called);
    });

    it("addOnceToSignal_handler_is_called_once_when_signal_dispatch_twice", () => {
        const expected: number = 1;
        let count: number = 0;

        let signal: Signal = new Signal();

        signalMap.addOnceToSignal(signal, () => {
            count++;
        });

        signal.dispatch();

        assert.equal(count, expected);
    });

    it("addOnceToSignal_handlers_are_called", () => {
        const expected: number = 3;
        let count: number = 0;

        let signal: Signal = new Signal();

        signalMap.addOnceToSignal(signal, () => {
            count++;
        });
        signalMap.addOnceToSignal(signal, () => {
            count++;
        });
        signalMap.addOnceToSignal(signal, () => {
            count++;
        });

        signal.dispatch();

        assert.equal(count, expected);
    });

    it("addOnceToSignal_handlers_are_called_once_when_signal_dispatch_twice", () => {
        const expected: number = 3;
        let count: number = 0;

        let signal: Signal = new Signal();

        signalMap.addOnceToSignal(signal, () => {
            count++;
        });
        signalMap.addOnceToSignal(signal, () => {
            count++;
        });
        signalMap.addOnceToSignal(signal, () => {
            count++;
        });

        signal.dispatch();
        signal.dispatch();

        assert.equal(count, expected);
    });

    it("removeFromSignal_removes_handler_that_is_not_called", () => {
        let called: boolean = false;

        let signal: Signal = new Signal();
        let handler: Function = () => {
            called = true;
        };

        signalMap.addToSignal(signal, handler);
        signalMap.removeFromSignal(signal, handler);

        signal.dispatch();

        assert.isFalse(called);
    });

    it("removeFromSignal_do_nohing_when_handler_was_not_added_before", () => {
        let called: boolean = false;

        let signal: Signal = new Signal();
        let handler: Function = () => {
            called = true;
        };

        signalMap.removeFromSignal(signal, handler);

        signal.dispatch();

        assert.isFalse(called);
    });

    it("removeFromSignal_remove_handlers", () => {
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

        signalMap.addToSignal(signal, handler1);
        signalMap.addToSignal(signal, handler2);
        signalMap.addToSignal(signal, handler3);
        signalMap.removeFromSignal(signal, handler1);
        signalMap.removeFromSignal(signal, handler2);
        signalMap.removeFromSignal(signal, handler3);

        signal.dispatch();

        assert.equal(count, expected);
    });

    it("removeFromSignal_do_nothing_when_signal_have_handlers_but_handler_removed_was_not_added_before", () => {
        const expected: number = 3;
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
        let handler4: Function = () => {
            count++;
        };

        signalMap.addToSignal(signal, handler1);
        signalMap.addToSignal(signal, handler2);
        signalMap.addToSignal(signal, handler3);
        signalMap.removeFromSignal(signal, handler4);

        signal.dispatch();

        assert.equal(count, expected);
    });

    it("removeAll_do_nothing_when_no_handler_is_stored", () => {
        signalMap.removeAll();
    });

    it("removeAll_remove_all_handlers", () => {
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
        let handler4: Function = () => {
            count++;
        };

        signalMap.addToSignal(signal, handler1);
        signalMap.addToSignal(signal, handler2);
        signalMap.addToSignal(signal, handler3);
        signalMap.addToSignal(signal, handler4);
        signalMap.removeAll();

        signal.dispatch();

        assert.equal(count, expected);
    });
});
