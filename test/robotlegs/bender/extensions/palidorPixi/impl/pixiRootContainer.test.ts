// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "./../../../../../entry";

import { PixiRootContainer } from "./../../../../../../src";

import { assert } from "chai";
import { Container } from "pixi.js";

describe("PixiRootContainer", () => {
    it("should return the registered container when the method getRootContainer is called", () => {
        let container: Container = new Container();
        let pixiContainers: PixiRootContainer = new PixiRootContainer(
            container
        );
        assert.instanceOf(pixiContainers.getRootContainer(), Container);
        assert.equal(pixiContainers.getRootContainer(), container);
    });
});
