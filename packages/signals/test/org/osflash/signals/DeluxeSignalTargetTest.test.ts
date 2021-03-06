/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { assert } from "chai";
import { DeluxeSignal } from "../../../../src/org/osflash/signals/DeluxeSignal";
import "../../../entry";

describe("DeluxeSignaltargetTest", () => {
    let signal: DeluxeSignal;
    let self = this;

    beforeEach(() => {
        signal = new DeluxeSignal(self, Number, String, Boolean);
    });

    afterEach(() => {
        signal.removeAll();
        signal = null;
    });

    it("target_should_be_empty()", () => {
        signal = new DeluxeSignal();
        assert.isNull(signal.target);
    });

    it("target_should_be_null()", () => {
        signal = new DeluxeSignal(null);
        assert.isNull(signal.target);
    });

    it("set_target_should_change_target()", () => {
        let target: object = {};
        signal.target = target;
        assert.equal(signal.target, target);
    });

    it("set_same_target_should_not_change_target()", () => {
        signal.target = self;
        assert.equal(signal.target, self);
    });
});
