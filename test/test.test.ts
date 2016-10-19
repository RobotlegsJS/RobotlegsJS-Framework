import { assert } from "chai";

import { Test } from "../src/test";

describe("Context", () => {

    let test: Test;

    beforeEach(() => {
        test = new Test();
    });

    afterEach(() => {
        test = null;
    });

    it("can check version of test", () => {
        assert.equal(test.version, "1.0.0-alpha.1");
    });
});
