// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IPixiRootContainer } from "../api/IPixiRootContainer";

import { Container } from "pixi.js";
import { injectable } from "@robotlegsjs/core";

@injectable()
export class PixiRootContainer implements IPixiRootContainer {
    private _root: Container;

    constructor(root: Container) {
        this._root = root;
    }

    public getRootContainer(): Container {
        return this._root;
    }
}
