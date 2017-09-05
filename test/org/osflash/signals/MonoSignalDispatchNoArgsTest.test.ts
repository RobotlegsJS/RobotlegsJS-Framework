import "../../../entry";

import { assert } from "chai";

import { AsyncUtil } from "../../../util/AsyncUtil";
import { MonoSignal } from "../../../../src/org/osflash/signals/MonoSignal";

describe("MonoSignalDispatchNoArgsTest", () => {
    let async: AsyncUtil = new AsyncUtil();

    let completed: MonoSignal;

    beforeEach(() => {
        completed = new MonoSignal();
    });

    afterEach(() => {
        completed.removeAll();
        completed = null;
    });

    it("dispatch_no_args_should_call_listener_with_no_args()", done => {
        completed.add(async.add(onCompleted, 10, done));
        completed.dispatch();
    });

    function onCompleted(): void {
        assert.equal(0, arguments.length);
    }

    it("addOnce_in_handler_and_dispatch_should_call_new_listener()", done => {
        completed.addOnce(async.add(addOnceInHandler, 10));
        completed.dispatch(done);
    });

    function addOnceInHandler(doneCallback: Function): void {
        completed.addOnce(async.add(secondAddOnceListener, 10, doneCallback));
        completed.dispatch();
    }

    function secondAddOnceListener(): void {}
});
