import "./../../../../../entry";

import { PixiRootContainer } from "./../../../../../../src/robotlegs/bender/extensions/palidorPixi/impl/PixiRootContainer";

import { assert } from "chai";
import { Container } from "pixi.js";

describe("PixiRootContainer", () => {
    it("should return the registered container when the method getRootContainer is called", () => {
        let container: Container = new Container();
        let pixiContainers: PixiRootContainer = new PixiRootContainer(container);
        assert.instanceOf(pixiContainers.getRootContainer(), Container);
        assert.equal(pixiContainers.getRootContainer(), container);
    });
});
