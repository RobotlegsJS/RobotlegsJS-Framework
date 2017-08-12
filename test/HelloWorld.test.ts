import { HelloWorld } from "./../src/HelloWorld";
import { assert } from "chai";

describe("HelloWorld", () => {
    it("get text", () => {
        let text = "hello world";
        let hello: HelloWorld = new HelloWorld();
        assert.equal(text, hello.text);
    });
});
