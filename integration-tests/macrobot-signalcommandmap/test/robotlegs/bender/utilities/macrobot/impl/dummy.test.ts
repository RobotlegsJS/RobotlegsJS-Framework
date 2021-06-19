// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { dummyMethod } from "../../../../../../src";
import "../../../../../entry";

describe("Dummy test", () => {
    beforeEach(() => {});

    afterEach(() => {});

    it("dummy_method_works", () => {
        assert.equal(dummyMethod(1, 2), 3);
    });
});
