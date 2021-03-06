// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { MessageDispatcher } from "../../../../../src/robotlegs/bender/framework/impl/MessageDispatcher";
import "../../../../entry";
import { createAsyncHandler } from "./safelyCallBackSupport/createAsyncHandler";
import { createCallbackHandlerThatErrors } from "./safelyCallBackSupport/createCallbackHandlerThatErrors";
import { createHandler } from "./safelyCallBackSupport/createHandler";

describe("MessageDispatcher", () => {
    let dispatcher: MessageDispatcher;
    let message: string;

    beforeEach(() => {
        dispatcher = new MessageDispatcher();
        message = "message";
    });

    afterEach(() => {
        dispatcher = null;
        message = null;
    });

    it("function length assumptions", () => {
        let func: Function = function (a: string, b: string, c: string = ""): void {
            assert.equal(arguments.length, 2);
        };
        func("", "");
        assert.equal(func.length, 3);
    });

    it("addMessageHandler runs", () => {
        dispatcher.addMessageHandler(message, () => {});
    });

    it("addMessageHandler stores handler", () => {
        dispatcher.addMessageHandler(message, () => {});
        assert.isTrue(dispatcher.hasMessageHandler(message));
    });

    it("hasMessageHandler runs", () => {
        dispatcher.hasMessageHandler(message);
    });

    it("hasMessageHandler returns false", () => {
        assert.isFalse(dispatcher.hasMessageHandler(message));
    });

    it("hasMessageHandler returns true", () => {
        dispatcher.addMessageHandler(message, () => {});
        assert.isTrue(dispatcher.hasMessageHandler(message));
    });

    it("hasMessageHandler returns false for wrong message", () => {
        dispatcher.addMessageHandler("abcde", () => {});
        assert.isFalse(dispatcher.hasMessageHandler(message));
    });

    it("removeMessageHandler runs", () => {
        dispatcher.removeMessageHandler(message, () => {});
    });

    it("removeMessageHandler removes the handler", () => {
        let handler: Function = () => {};
        dispatcher.addMessageHandler(message, handler);
        dispatcher.removeMessageHandler(message, handler);
        assert.isFalse(dispatcher.hasMessageHandler(message));
    });

    it("removeMessageHandler does not remove the wrong handler", () => {
        let handler: Function = () => {};
        let otherHandler: Function = () => {};
        dispatcher.addMessageHandler(message, handler);
        dispatcher.addMessageHandler(message, otherHandler);
        dispatcher.removeMessageHandler(message, otherHandler);
        assert.isTrue(dispatcher.hasMessageHandler(message));
    });

    it("dispatchMessage runs", () => {
        dispatcher.dispatchMessage(message);
    });

    it("deaf handler handles message", () => {
        let handled: boolean = false;
        dispatcher.addMessageHandler(message, function (): void {
            handled = true;
        });
        dispatcher.dispatchMessage(message);
        assert.isTrue(handled);
    });

    it("handler handles message", () => {
        let actualMessage: any = null;
        dispatcher.addMessageHandler(message, function (msg: any): void {
            actualMessage = msg;
        });
        dispatcher.dispatchMessage(message);
        assert.equal(actualMessage, message);
    });

    it("message is handled by multiple handlers", () => {
        let handleCount: number = 0;
        dispatcher.addMessageHandler(message, function (): void {
            handleCount++;
        });
        dispatcher.addMessageHandler(message, function (): void {
            handleCount++;
        });
        dispatcher.addMessageHandler(message, function (): void {
            handleCount++;
        });
        dispatcher.dispatchMessage(message);
        assert.equal(handleCount, 3);
    });

    it("message is handled by handler multiple times", () => {
        let handleCount: number = 0;
        dispatcher.addMessageHandler(message, function (): void {
            handleCount++;
        });
        dispatcher.dispatchMessage(message);
        dispatcher.dispatchMessage(message);
        dispatcher.dispatchMessage(message);
        assert.equal(handleCount, 3);
    });

    it("handler does not handle the wrong message", () => {
        let handled: boolean = false;
        dispatcher.addMessageHandler(message, function (): void {
            handled = true;
        });
        dispatcher.dispatchMessage("abcde");
        assert.isFalse(handled);
    });

    it("handler with callback handles message", () => {
        let actualMessage: any = null;
        dispatcher.addMessageHandler(message, function (msg: any, callback: Function): void {
            actualMessage = msg;
            callback();
        });
        dispatcher.dispatchMessage(message);
        assert.equal(actualMessage, message);
    });

    it("async handler handles message", (done: Function) => {
        let actualMessage: any;
        dispatcher.addMessageHandler(message, function (msg: any, callback: Function): void {
            actualMessage = msg;
            setTimeout(callback, 5);
        });
        dispatcher.dispatchMessage(message);
        setTimeout(function (): void {
            assert.equal(actualMessage, message);
            done();
        }, 100);
    });

    it("callback is called once", () => {
        let callbackCount: number = 0;
        dispatcher.dispatchMessage(message, function (): void {
            callbackCount++;
        });
        assert.equal(callbackCount, 1);
    });

    it("callback is called once after sync handler", (done: Function) => {
        let callbackCount: number = 0;
        dispatcher.addMessageHandler(message, createHandler());
        dispatcher.dispatchMessage(message, function (): void {
            callbackCount++;
        });
        setTimeout(function (): void {
            assert.equal(callbackCount, 1);
            done();
        }, 100);
    });

    it("callback is called once after async handler", (done: Function) => {
        let callbackCount: number = 0;
        dispatcher.addMessageHandler(message, createAsyncHandler());
        dispatcher.dispatchMessage(message, function (): void {
            callbackCount++;
        });
        setTimeout(function (): void {
            assert.equal(callbackCount, 1);
            done();
        }, 100);
    });

    it("callback is called once after sync and async handlers", (done: Function) => {
        let callbackCount: number = 0;
        dispatcher.addMessageHandler(message, createAsyncHandler());
        dispatcher.addMessageHandler(message, createHandler());
        dispatcher.addMessageHandler(message, createAsyncHandler());
        dispatcher.addMessageHandler(message, createHandler());
        dispatcher.dispatchMessage(message, function (): void {
            callbackCount++;
        });
        setTimeout(function (): void {
            assert.equal(callbackCount, 1);
            done();
        }, 100);
    });

    it("handler passes error to callback", () => {
        let expectedError: any = "Error";
        let actualError: any = null;
        dispatcher.addMessageHandler(message, function (msg: any, callback: Function): void {
            callback(expectedError);
        });
        dispatcher.dispatchMessage(message, function (error: any): void {
            actualError = error;
        });
        assert.equal(actualError, expectedError);
    });

    it("async_handler_passes_error_to_callback", (done: Function) => {
        let expectedError: any = "Error";
        let actualError: any = null;
        dispatcher.addMessageHandler(message, function (msg: any, callback: Function): void {
            setTimeout(callback, 5, expectedError);
        });
        dispatcher.dispatchMessage(message, function (error: any): void {
            actualError = error;
        });
        setTimeout(function (): void {
            assert.equal(actualError, expectedError);
            done();
        }, 100);
    });

    it("handler that calls back more than once is ignored", () => {
        let callbackCount: number = 0;
        dispatcher.addMessageHandler(message, function (msg: any, callback: Function): void {
            callback();
            callback();
        });
        dispatcher.dispatchMessage(message, function (error: any): void {
            callbackCount++;
        });
        assert.equal(callbackCount, 1);
    });

    it("async handler that calls back more than once is ignored", (done: Function) => {
        let callbackCount: number = 0;
        dispatcher.addMessageHandler(message, function (msg: any, callback: Function): void {
            callback();
            callback();
        });
        dispatcher.dispatchMessage(message, function (error: any): void {
            callbackCount++;
        });
        setTimeout(function (): void {
            assert.equal(callbackCount, 1);
            done();
        }, 100);
    });

    it("sync handlers should run in order", () => {
        let expected: string[] = ["A", "B", "C", "D"];
        let results: string[] = [];
        for (const id of expected) {
            dispatcher.addMessageHandler(message, createHandler(results.push.bind(results), id));
        }
        dispatcher.dispatchMessage(message);
        assert.deepEqual(results, expected);
    });

    it("sync handlers should run in reverse order", () => {
        let expected: string[] = ["A", "B", "C", "D"];
        let results: string[] = [];
        for (const id of expected) {
            dispatcher.addMessageHandler(message, createHandler(results.push.bind(results), id));
        }
        dispatcher.dispatchMessage(message, null, true);
        assert.deepEqual(results, expected.reverse());
    });

    it("async handlers should run in order", (done: Function) => {
        let expected: string[] = ["A", "B", "C", "D"];
        let results: string[] = [];
        for (const id of expected) {
            dispatcher.addMessageHandler(
                message,
                createAsyncHandler(results.push.bind(results), id)
            );
        }
        dispatcher.dispatchMessage(message);
        setTimeout(function (): void {
            assert.deepEqual(results, expected);
            done();
        }, 100);
    });

    it("async handlers should run in reverse order when reversed", (done: Function) => {
        let expected: string[] = ["A", "B", "C", "D"];
        let results: string[] = [];
        for (const id of expected) {
            dispatcher.addMessageHandler(
                message,
                createAsyncHandler(results.push.bind(results), id)
            );
        }
        dispatcher.dispatchMessage(message, null, true);
        setTimeout(function (): void {
            assert.deepEqual(results, expected.reverse());
            done();
        }, 100);
    });

    it("async and sync handlers should run in order", (done: Function) => {
        let expected: string[] = ["A", "B", "C", "D"];
        let results: string[] = [];
        dispatcher.addMessageHandler(message, createAsyncHandler(results.push.bind(results), "A"));
        dispatcher.addMessageHandler(message, createHandler(results.push.bind(results), "B"));
        dispatcher.addMessageHandler(message, createAsyncHandler(results.push.bind(results), "C"));
        dispatcher.addMessageHandler(message, createHandler(results.push.bind(results), "D"));
        dispatcher.dispatchMessage(message);
        setTimeout(function (): void {
            assert.deepEqual(results, expected);
            done();
        }, 100);
    });

    it("async and sync handlers should run in order when reversed", (done: Function) => {
        let expected: string[] = ["A", "B", "C", "D"];
        let results: string[] = [];
        dispatcher.addMessageHandler(message, createAsyncHandler(results.push.bind(results), "A"));
        dispatcher.addMessageHandler(message, createHandler(results.push.bind(results), "B"));
        dispatcher.addMessageHandler(message, createAsyncHandler(results.push.bind(results), "C"));
        dispatcher.addMessageHandler(message, createHandler(results.push.bind(results), "D"));
        dispatcher.dispatchMessage(message, null, true);
        setTimeout(function (): void {
            assert.deepEqual(results, expected.reverse());
            done();
        }, 100);
    });

    it("terminated message should not reach further handlers", () => {
        let expected: string[] = ["A", "B", "C (with error)"];
        let results: string[] = [];
        dispatcher.addMessageHandler(message, createHandler(results.push.bind(results), "A"));
        dispatcher.addMessageHandler(message, createHandler(results.push.bind(results), "B"));
        dispatcher.addMessageHandler(
            message,
            createCallbackHandlerThatErrors(results.push.bind(results), "C (with error)")
        );
        dispatcher.addMessageHandler(message, createHandler(results.push.bind(results), "D"));
        dispatcher.dispatchMessage(message);
        assert.deepEqual(results, expected);
    });

    it("terminated message should not reach further handlers when reversed", () => {
        let expected: string[] = ["D", "C (with error)"];
        let results: string[] = [];
        dispatcher.addMessageHandler(message, createHandler(results.push.bind(results), "A"));
        dispatcher.addMessageHandler(message, createHandler(results.push.bind(results), "B"));
        dispatcher.addMessageHandler(
            message,
            createCallbackHandlerThatErrors(results.push.bind(results), "C (with error)")
        );
        dispatcher.addMessageHandler(message, createHandler(results.push.bind(results), "D"));
        dispatcher.dispatchMessage(message, null, true);
        assert.deepEqual(results, expected);
    });

    it("terminated async message should not reach further handlers", (done: Function) => {
        let expected: string[] = ["A", "B", "C (with error)"];
        let results: string[] = [];
        dispatcher.addMessageHandler(message, createAsyncHandler(results.push.bind(results), "A"));
        dispatcher.addMessageHandler(message, createAsyncHandler(results.push.bind(results), "B"));
        dispatcher.addMessageHandler(
            message,
            createCallbackHandlerThatErrors(results.push.bind(results), "C (with error)")
        );
        dispatcher.addMessageHandler(message, createAsyncHandler(results.push.bind(results), "D"));
        dispatcher.dispatchMessage(message);
        setTimeout(function (): void {
            assert.deepEqual(results, expected);
            done();
        }, 100);
    });

    it("terminated_async_message_should_not_reach_further_handlers_when_reversed", (done: Function) => {
        let expected: string[] = ["D", "C (with error)"];
        let results: string[] = [];
        dispatcher.addMessageHandler(message, createAsyncHandler(results.push.bind(results), "A"));
        dispatcher.addMessageHandler(message, createAsyncHandler(results.push.bind(results), "B"));
        dispatcher.addMessageHandler(
            message,
            createCallbackHandlerThatErrors(results.push.bind(results), "C (with error)")
        );
        dispatcher.addMessageHandler(message, createAsyncHandler(results.push.bind(results), "D"));
        dispatcher.dispatchMessage(message, null, true);
        setTimeout(function (): void {
            assert.deepEqual(results, expected);
            done();
        }, 100);
    });

    it("handler is only added once", () => {
        let callbackCount: number = 0;
        const handler: Function = function (): void {
            callbackCount++;
        };
        dispatcher.addMessageHandler(message, handler);
        dispatcher.addMessageHandler(message, handler);
        dispatcher.dispatchMessage(message);
        assert.equal(callbackCount, 1);
    });
});
