// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { ISubCommandPayload } from "../../../../../../src/robotlegs/bender/utilities/macrobot/api/ISubCommandPayload";
import { SubCommandPayload } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SubCommandPayload";

describe("SubCommandPayload", () => {
    let payload: ISubCommandPayload<any>;

    afterEach(() => {
        payload = null;
    });

    it("invalid_data_throws_a_error", () => {
        function invalidData(): void {
            payload = new SubCommandPayload(null);
        }

        assert.throws(invalidData, Error);
    });

    it("data_without_type_has_type_automatically_resolved", () => {
        const data: string = "I'm a string";
        payload = new SubCommandPayload(data);
        assert.equal(payload.data, data);
        assert.equal(payload.type, String);
    });

    it("valid_data_and_valid_type_are_stored", () => {
        const data: string = "I'm a string";
        payload = new SubCommandPayload(data, String);
        assert.equal(payload.data, data);
        assert.equal(payload.type, String);
    });

    it("payload_is_initialized_with_empty_name", () => {
        payload = new SubCommandPayload("I'm a string", String);
        assert.equal(payload.name, "");
        assert.equal(payload.name.length, 0);
    });

    it("withName_define_name", () => {
        payload = new SubCommandPayload("I'm a string", String);
        payload.withName("callback");
        assert.equal(payload.name, "callback");
    });

    it("ofClass_define_type", () => {
        payload = new SubCommandPayload("I'm a string");
        payload.ofType(String);
        assert.equal(payload.type, String);
    });
});
