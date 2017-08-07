// ------------------------------------------------------------------------------
//  2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { ISubCommandPayload } from "../../../../../../src/robotlegs/bender/utilities/macrobot/api/ISubCommandPayload";
import { SubCommandPayload } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SubCommandPayload";

describe("SubCommandPayload", () => {

    let payload: ISubCommandPayload;

    beforeEach(() => {
        ;
    });

    afterEach(() => {
        payload = null;
    });

    it("invalid data and type throws a error", () => {
        function invalidDataAndType(): void {
            payload = new SubCommandPayload(null, null);
        }

        assert.throws(invalidDataAndType, Error);
    });

    it("invalid data throws a error", () => {
        function invalidData(): void {
            payload = new SubCommandPayload(null, String);
        }

        assert.throws(invalidData, Error);
    });

    it("invalid type throws a error", () => {
        function invalidType(): void {
            payload = new SubCommandPayload("Data", null);
        }

        assert.throws(invalidType, Error);
    });
});
