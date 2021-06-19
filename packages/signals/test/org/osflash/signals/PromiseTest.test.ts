/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { assert } from "chai";
import { Promise } from "../../../../src/org/osflash/signals/Promise";
import "../../../entry";

describe("PromiseTest", () => {
    let promise: Promise;

    beforeEach(() => {
        promise = new Promise();
    });

    it("addOncedListenerWillExecuteWhenPromiseIsDispatched()", () => {
        let isCalled = false;

        function listener(): void {
            isCalled = true;
        }

        promise.addOnce(listener);
        promise.dispatch();

        assert.isTrue(isCalled);
    });

    it("addOncedListenerWillReceiveDataWhenPromiseIsDispatched()", () => {
        let received: any;

        function listener(data: any): void {
            received = data;
        }

        let object: any = { hello: "world" };
        promise.addOnce(listener);
        promise.dispatch(object);

        assert.equal(received, object);
    });

    it("listenerWillExecuteWhenBoundAfterPromiseIsDispatched()", () => {
        let isCalled = false;

        function listener(): void {
            isCalled = true;
        }

        promise.dispatch();
        promise.addOnce(listener);

        assert.isTrue(isCalled);
    });

    it("listenerWillReceiveDataWhenBoundAfterPromiseIsDispatched()", () => {
        let received: any;

        function listener(data: any): void {
            received = data;
        }

        let object: any = { hello: "world" };
        promise.dispatch(object);
        promise.addOnce(listener);

        assert.equal(received, object);
    });

    it("promiseWillThrowErrorIfDispatchedTwice()", () => {
        assert.throws(() => {
            promise.dispatch();
            promise.dispatch();
        }, Error);
    });
});
