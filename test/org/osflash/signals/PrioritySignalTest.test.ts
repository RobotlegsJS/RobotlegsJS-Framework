import {assert} from "chai";

import {IPrioritySignal} from "../../../../src/org/osflash/signals/IPrioritySignal";
import {PrioritySignal} from "../../../../lib/src/org/osflash/signals/PrioritySignal";
import {ISignal} from "../../../../src/org/osflash/signals/ISignal";
import {Signal} from "../../../../src/org/osflash/signals/Signal";

describe("PrioritySignalTest", () => {

    let signal: ISignal;
    let prioritySignal: IPrioritySignal;

    let gotListenerDispatchOrder: any[];

    const A = "A";
    const B = "B";
    const C = "C";

    beforeEach(() => {
        signal = new Signal();
        gotListenerDispatchOrder = [];
        prioritySignal = new PrioritySignal();
        signal = prioritySignal;
    });

    afterEach(() => {
        gotListenerDispatchOrder = null;
        prioritySignal.removeAll();
        prioritySignal = null;
        signal = null;
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_1()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerA, 3);
        prioritySignal.addWithPriority(listenerB, 2);
        prioritySignal.addWithPriority(listenerC, 1);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_2()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerA, 3);
        prioritySignal.addWithPriority(listenerC, 1);
        prioritySignal.addWithPriority(listenerB, 2);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_3()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerB, 2);
        prioritySignal.addWithPriority(listenerA, 3);
        prioritySignal.addWithPriority(listenerC, 1);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_4()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerB, 2);
        prioritySignal.addWithPriority(listenerC, 1);
        prioritySignal.addWithPriority(listenerA, 3);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_5()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerC, 1);
        prioritySignal.addWithPriority(listenerA, 3);
        prioritySignal.addWithPriority(listenerB, 2);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_6()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerC, 1);
        prioritySignal.addWithPriority(listenerB, 2);
        prioritySignal.addWithPriority(listenerA, 3);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_even_if_unconsecutive_1()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerA, 20);
        prioritySignal.addWithPriority(listenerB, 10);
        prioritySignal.addWithPriority(listenerC, 5);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_even_if_unconsecutive_2()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerA, 20);
        prioritySignal.addWithPriority(listenerC, 5);
        prioritySignal.addWithPriority(listenerB, 10);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_even_if_unconsecutive_3()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerB, 10);
        prioritySignal.addWithPriority(listenerA, 20);
        prioritySignal.addWithPriority(listenerC, 5);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_even_if_unconsecutive_4()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerB, 10);
        prioritySignal.addWithPriority(listenerC, 5);
        prioritySignal.addWithPriority(listenerA, 20);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_even_if_unconsecutive_5()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerC, 5);
        prioritySignal.addWithPriority(listenerA, 20);
        prioritySignal.addWithPriority(listenerB, 10);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_even_if_unconsecutive_6()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerC, 5);
        prioritySignal.addWithPriority(listenerB, 10);
        prioritySignal.addWithPriority(listenerA, 20);
        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_even_if_negative_1()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerA, -1);
        prioritySignal.addWithPriority(listenerB, -2);
        prioritySignal.addWithPriority(listenerC, -3);
        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_even_if_negative_2()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerA, -1);
        prioritySignal.addWithPriority(listenerC, -3);
        prioritySignal.addWithPriority(listenerB, -2);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_even_if_negative_3()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerB, -2);
        prioritySignal.addWithPriority(listenerA, -1);
        prioritySignal.addWithPriority(listenerC, -3);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_even_if_negative_4()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerB, -2);
        prioritySignal.addWithPriority(listenerC, -3);
        prioritySignal.addWithPriority(listenerA, -1);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_even_if_negative_5()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerC, -3);
        prioritySignal.addWithPriority(listenerA, -1);
        prioritySignal.addWithPriority(listenerB, -2);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_higher_priority_should_be_called_first_independant_of_order_added_even_if_negative_6()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerC, -3);
        prioritySignal.addWithPriority(listenerB, -2);
        prioritySignal.addWithPriority(listenerA, -1);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_same_priority_should_be_called_in_order_added_1()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerA, 1);
        prioritySignal.addWithPriority(listenerB, 1);
        prioritySignal.addWithPriority(listenerC, 1);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_same_priority_should_be_called_in_order_added_2()", () => {
        let expectedListenerDispatchOrder: any[] = [B, A, C];

        prioritySignal.addWithPriority(listenerB, 1);
        prioritySignal.addWithPriority(listenerA, 1);
        prioritySignal.addWithPriority(listenerC, 1);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_priority_zero_should_be_called_in_order_added_1()", () => {
        let expectedListenerDispatchOrder: any[] = [B, C, A];

        prioritySignal.add(listenerB);
        prioritySignal.add(listenerC);
        prioritySignal.add(listenerA);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_priority_zero_should_be_called_in_order_added_2()", () => {
        let expectedListenerDispatchOrder: any[] = [C, B, A];

        prioritySignal.add(listenerC);
        prioritySignal.add(listenerB);
        prioritySignal.add(listenerA);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_priority_zero_should_be_called_after_high_and_before_negative_1()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerC, -10);
        prioritySignal.add(listenerB);
        prioritySignal.addWithPriority(listenerA, 10);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    it("listeners_added_with_priority_zero_should_be_called_after_high_and_before_negative_2()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addWithPriority(listenerC, -10);
        prioritySignal.addWithPriority(listenerA, 10);
        prioritySignal.add(listenerB);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
    });

    function listenerA(): void {
        gotListenerDispatchOrder.push(A);
    }

    function listenerB(): void {
        gotListenerDispatchOrder.push(B);
    }

    function listenerC(): void {
        gotListenerDispatchOrder.push(C);
    }

    function assertArrayEqual(expected: any[], got: any[]): void {
        assert.equal(expected.length, got.length, "array length unequal");
        for (let i = 0; i < gotListenerDispatchOrder.length; i++) {
            assert.equal(expected[i], got[i], "@i=" + i);
        }
    }
});
