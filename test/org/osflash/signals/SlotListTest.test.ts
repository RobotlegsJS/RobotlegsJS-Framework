import "../../../entry";

import { assert } from "chai";

import { Slot } from "../../../../src/org/osflash/signals/Slot";
import { Signal } from "../../../../src/org/osflash/signals/Signal";
import { ISlot } from "../../../../src/org/osflash/signals/ISlot";
import { SlotList } from "../../../../src/org/osflash/signals/SlotList";
import { PrioritySignal } from "../../../../src/org/osflash/signals/PrioritySignal";

describe("SlotListTest", () => {

    let signal: Signal;
    let listenerA: Function;
    let listenerB: Function;
    let listenerC: Function;
    let listenerD: Function;
    let slotA: ISlot;
    let slotB: ISlot;
    let slotC: ISlot;
    let listOfA: SlotList;
    let listOfAB: SlotList;
    let listOfABC: SlotList;

    beforeEach(() => {
        signal = new Signal();
        listenerA = function(e: any = null): void {
        };
        listenerB = function(e: any = null): void {
        };
        listenerC = function(e: any = null): void {
        };
        listenerD = function(e: any = null): void {
        };
        slotA = new Slot(listenerA, signal);
        slotB = new Slot(listenerB, signal);
        slotC = new Slot(listenerC, signal);
        listOfA = new SlotList(slotA);
        listOfAB = listOfA.append(slotB);
        listOfABC = listOfAB.append(slotC);
    });

    it("NIL_has_length_zero", () => {
        assert.equal(0, SlotList.NIL.length);
    });

    it("NIL_can_not_append_a_new_slot", () => {
        let list: SlotList = SlotList.NIL.append(slotA);
        // list should be a new SlotList with only one element
        assert.equal(1, list.length);
        // append a element to NIL should not change it's length
        assert.equal(0, SlotList.NIL.length);
    });

    it("tail_defaults_to_NIL_if_omitted_in_constructor", () => {
        const noTail: SlotList = new SlotList(slotA);
        assert.equal(SlotList.NIL, noTail.tail);
    });

    it("tail_defaults_to_NIL_if_passed_null_in_constructor", () => {
        const nullTail: SlotList = new SlotList(slotA, null);
        assert.equal(SlotList.NIL, nullTail.tail);
    });

    it("constructing_with_null_head_throws_error", () => {
        assert.throws(() => new SlotList(null, listOfA), Error);
    });

    it("constructing_with_null_head_and_null_tail_throws_error", () => {
        assert.throws(() => new SlotList(null, null), Error);
    });

    it("contains_should_return_false_when_listener_is_not_part_of_list", () => {
        assert.isFalse(listOfABC.contains(listenerD));
    });

    it("list_with_one_listener_contains_it", () => {
        assert.isTrue(listOfA.contains(listenerA));
    });

    it("find_the_only_listener_yields_its_slot", () => {
        assert.equal(slotA, listOfA.find(listenerA));
    });

    it("list_with_one_listener_has_it_in_its_head", () => {
        assert.equal(listenerA, listOfA.head.listener);
    });

    it("list_with_one_listener_has_it_in_its_head", () => {
        assert.equal(listenerA, listOfA.head.listener);
    });

    it("NIL_does_not_contain_anonymous_listener", () => {
        assert.isFalse(SlotList.NIL.contains(new Function()));
    });

    it("find_in_empty_list_yields_null", () => {
        assert.isNull(SlotList.NIL.find(listenerA));
    });

    it("NIL_does_not_contain_null_listener", () => {
        assert.isFalse(SlotList.NIL.contains(null));
    });

    it("find_the_1st_of_2_listeners_yields_its_slot", () => {
        assert.equal(slotA, listOfAB.find(listenerA));
    });

    it("find_the_2nd_of_2_listeners_yields_its_slot", () => {
        assert.equal(slotB, listOfAB.find(listenerB));
    });

    it("find_the_1st_of_3_listeners_yields_its_slot", () => {
        assert.equal(slotA, listOfABC.find(listenerA));
    });

    it("find_the_2nd_of_3_listeners_yields_its_slot", () => {
        assert.equal(slotB, listOfABC.find(listenerB));
    });

    it("find_the_3rd_of_3_listeners_yields_its_slot", () => {
        assert.equal(slotC, listOfABC.find(listenerC));
    });

    it("prepend_a_slot_makes_it_head_of_new_list", () => {
        let newList: SlotList = listOfA.prepend(slotB);
        assert.equal(slotB, newList.head);
    });

    it("prepend_a_slot_makes_the_old_list_the_tail", () => {
        let newList: SlotList = listOfA.prepend(slotB);
        assert.equal(listOfA, newList.tail);
    });

    it("after_prepend_slot_new_list_contains_its_listener", () => {
        let newList: SlotList = listOfA.prepend(slotB);
        assert.isTrue(newList.contains(slotB.listener));
    });

    it("append_a_slot_yields_new_list_with_same_head", () => {
        let oldHead: ISlot = listOfA.head;
        let newList: SlotList = listOfA.append(slotB);
        assert.equal(oldHead, newList.head);
    });

    it("append_to_list_of_one_yields_list_of_length_two", () => {
        let newList: SlotList = listOfA.append(slotB);
        assert.equal(2, newList.length);
    });

    it("after_append_slot_new_list_contains_its_listener", () => {
        let newList: SlotList = listOfA.append(slotB);
        assert.isTrue(newList.contains(slotB.listener));
    });

    it("append_slot_yields_a_different_list", () => {
        let newList: SlotList = listOfA.append(slotB);
        assert.notEqual(listOfA, newList);
    });

    it("append_null_yields_same_list", () => {
        let newList: SlotList = listOfA.append(null);
        assert.equal(listOfA, newList);
    });

    it("filterNot_on_empty_list_yields_same_list", () => {
        let newList: SlotList = SlotList.NIL.filterNot(listenerA);
        assert.equal(SlotList.NIL, newList);
    });

    it("filterNot_null_yields_same_list", () => {
        let newList: SlotList = listOfA.filterNot(null);
        assert.equal(listOfA, newList);
    });

    it("filterNot_head_from_list_of_1_yields_empty_list", () => {
        let newList: SlotList = listOfA.filterNot(listOfA.head.listener);
        assert.equal(SlotList.NIL, newList);
    });

    it("filterNot_1st_listener_from_list_of_2_yields_list_of_2nd_listener", () => {
        let newList: SlotList = listOfAB.filterNot(listenerA);
        assert.equal(listenerB, newList.head.listener);
        assert.equal(1, newList.length);
    });

    it("filterNot_2nd_listener_from_list_of_2_yields_list_of_head", () => {
        let newList: SlotList = listOfAB.filterNot(listenerB);
        assert.equal(listenerA, newList.head.listener);
        assert.equal(1, newList.length);
    });

    it("filterNot_2nd_listener_from_list_of_3_yields_list_of_1st_and_3rd", () => {
        let newList: SlotList = listOfABC.filterNot(listenerB);
        assert.equal(listenerA, newList.head.listener);
        assert.equal(listenerC, newList.tail.head.listener);
        assert.equal(2, newList.length);
    });

    it("filterNot_with_unknow_listener_should_not_change_list", () => {
        let newList: SlotList = listOfABC.filterNot(listenerD);
        assert.equal(listenerA, newList.head.listener);
        assert.equal(listenerB, newList.tail.head.listener);
        assert.equal(listenerC, newList.tail.tail.head.listener);
        assert.equal(3, newList.length);
        assert.equal(listOfABC, newList);
    });

    // Issue #56
    it("insertWithPriority_adds_4_slots_without_losing_any", () => {
        let s: PrioritySignal = new PrioritySignal();
        let l1: Function = new Function();
        let l2: Function = new Function();
        let l3: Function = new Function();
        let l4: Function = new Function();
        let slot1: ISlot = new Slot(l1, s);
        let slot2: ISlot = new Slot(l2, s, false, -1);
        let slot3: ISlot = new Slot(l3, s);
        let slot4: ISlot = new Slot(l4, s);
        let list: SlotList = new SlotList(slot1);
        list = list.insertWithPriority(slot2);
        list = list.insertWithPriority(slot3);
        list = list.insertWithPriority(slot4);
        // This was failing because one slot was being lost.
        assert.equal(4, list.length, "number of slots in list");
        assert.equal(slot1, list.head);
        assert.equal(slot3, list.tail.head);
        assert.equal(slot4, list.tail.tail.head);
        assert.equal(slot2, list.tail.tail.tail.head);
    });

    it("toString_should_return_string", () => {
        assert.isString(listOfA.toString());
        assert.isString(listOfAB.toString());
        assert.isString(listOfABC.toString());
    });
});
