// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container, Sprite } from "pixi.js";

export class RobotlegsView extends Container {
    private _robotlegsLogo: Sprite;

    public constructor() {
        super();

        this._loadLogo();
        this._move();
        this._enable();
    }

    private _loadLogo(): void {
        // create a PIXI sprite from an image path
        this._robotlegsLogo = Sprite.from("images/robotlegs.png");

        // add logo
        this.addChild(this._robotlegsLogo);
    }

    private _move(): void {
        // center the sprite's anchor point
        this._robotlegsLogo.anchor.set(0.5);

        // move the sprite to the center of the canvas
        this._robotlegsLogo.x = 960 * 0.5;
        this._robotlegsLogo.y = 400 * 0.5;
    }

    private _enable(): void {
        // Opt-in to interactivity
        this.interactive = true;

        // Shows hand cursor
        this.buttonMode = true;
    }
}
