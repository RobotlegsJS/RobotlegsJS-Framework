import "./entry";
import { Foo } from "../src/foo";
import { assert } from "chai";

describe("Foo", () => {
    it("bar", () => {
        let foo: Foo = new Foo();
        assert.equal(foo.bar(1, 3), 4);
    });
});
