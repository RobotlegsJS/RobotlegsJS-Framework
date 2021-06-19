/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { assert } from "chai";
import { Signal } from "../../../../src/org/osflash/signals/Signal";
import "../../../entry";
import { failIfCalled } from "../../../util/TestBase";

describe("AmbiguousRelationshipTest", () => {
    let instance: Signal;

    beforeEach(() => {
        instance = new Signal();
    });

    afterEach(() => {
        instance = null;
    });

    it("add_then_addOnce_throws_error()", () => {
        assert.throws(() => {
            instance.add(failIfCalled);
            instance.addOnce(failIfCalled);
        }, Error);
    });

    it("addOnce_then_add_should_throw_error()", () => {
        assert.throws(() => {
            instance.addOnce(failIfCalled);
            instance.add(failIfCalled);
        }, Error);
    });

    it("add_then_add_should_not_throw_error()", () => {
        instance.add(failIfCalled);
        instance.add(failIfCalled);
        assert.equal(1, instance.numListeners);
    });

    it("addOnce_then_addOnce_should_not_throw_error()", () => {
        instance.addOnce(failIfCalled);
        instance.addOnce(failIfCalled);
        assert.equal(1, instance.numListeners);
    });
});
