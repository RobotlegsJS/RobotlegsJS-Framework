import "../../../entry";

import { assert } from "chai";

import { Promise } from "../../../../src/org/osflash/signals/Promise";

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
        let received: Object;

        function listener(data: Object): void {
            received = data;
        }

        let object: Object = { hello: "world" };
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
        let received: Object;

        function listener(data: Object): void {
            received = data;
        }

        let object: Object = { hello: "world" };
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
