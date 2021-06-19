import { Event } from "@robotlegsjs/core";
import { assert } from "chai";
import { AttackEvent } from "../../../../src/battleship/game/events/AttackEvent";
import "../../../entry";

describe("AttackEvent", () => {
    context("constants", () => {
        it("should exist the events SUCCESS and FAIL", () => {
            assert.exists(AttackEvent.SUCCESS);
            assert.exists(AttackEvent.FAIL);
        });
    });

    it("should extend from Event (@robotlegsjs/core)", () => {
        let event: Event = new AttackEvent("event");
        assert.instanceOf(event, Event);
    });
});
