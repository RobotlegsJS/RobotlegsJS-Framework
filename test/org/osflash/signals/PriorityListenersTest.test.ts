import {assert} from "chai";

import {AsyncUtil} from "../../../util/AsyncUtil";
import {DeluxeSignal} from "../../../../src/org/osflash/signals/DeluxeSignal";
describe("PriorityListenersTest", () => {

    let async: AsyncUtil = new AsyncUtil();

    let completed: DeluxeSignal;
    let listenersCalled: any[];

    beforeEach(() => {
        completed = new DeluxeSignal(this);
        listenersCalled = [];
    });

    afterEach(() => {
        completed.removeAll();
        completed = null;
        listenersCalled = null;
    });

    it("listener_added_second_with_higher_priority_should_be_called_first()", (done) => {
        completed.addWithPriority(async.add(listener1, 5));
        completed.addWithPriority(async.add(listener0, 5, done), 10);

        completed.dispatch();
    });

    function listener0(): void {
        listenersCalled.push(listener0);
        assert.equal(listener0, listenersCalled[0], "this should be the first listener called");
    }

    function listener1(): void {
        listenersCalled.push(listener1);
        assert.equal(listener1, listenersCalled[1], "this should be the second listener called");
    }

    function listener2(): void {
        listenersCalled.push(listener2);
        assert.equal(listener2, listenersCalled[2], "this should be the third listener called");
    }

    it("listeners_added_with_same_priority_should_be_called_in_order_added()", (done) => {
        completed.addWithPriority(async.add(listener0, 5), 10);
        completed.addWithPriority(async.add(listener1, 5), 10);
        completed.addWithPriority(async.add(listener2, 5, done), 10);

        completed.dispatch();
    });

});
