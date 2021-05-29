// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />

import "reflect-metadata";

import { Game } from "./Game";

(<any>window).initGame = () => {
    let game: Game = new Game();
    (<any>window).game = game;
};
