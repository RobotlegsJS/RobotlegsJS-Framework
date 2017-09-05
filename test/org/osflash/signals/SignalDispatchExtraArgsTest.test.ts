import "../../../entry";

import { assert } from "chai";

import { Signal } from "../../../../src/org/osflash/signals/Signal";
import { AsyncUtil } from "../../../util/AsyncUtil";

describe("SignalDispatchExtraArgsTest", () => {
    let async: AsyncUtil = new AsyncUtil();

    let completed: Signal;

    beforeEach(() => {
        completed = new Signal();
    });

    afterEach(() => {
        completed.removeAll();
        completed = null;
    });

    it("dispatch_extra_args_should_call_listener_with_extra_args", done => {
        completed.add(async.add(onCompleted, 10, done));
        completed.dispatch(22, "done", new Date());
    });

    function onCompleted(a: number, b: string, c: Date): void {
        assert.equal(3, arguments.length);
        assert.equal(22, a);
        assert.equal("done", b);
        assert.isTrue(c instanceof Date);
    }
});
