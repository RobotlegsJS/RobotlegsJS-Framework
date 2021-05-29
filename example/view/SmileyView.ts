// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import Sprite from "openfl/display/Sprite";
import Graphics from "openfl/display/Graphics";
import Event from "openfl/events/Event";

export class SmileyView extends Sprite {
    private _radius: number;

    constructor(radius: number) {
        super();

        this._radius = Math.max(radius, 50);

        this.addEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
    }

    private onAddedToStage = (event: Event): void => {
        if (event.target === this) {
            this.drawSmiley();
            this.move();
            this.enableButtonMode();
        }
    };

    private drawSmiley(): void {
        let graphics: Graphics = this.graphics;

        // Head
        graphics.lineStyle(10, 0x000000);
        graphics.beginFill(0xffcc00);
        graphics.drawCircle(0, 0, this._radius);
        graphics.endFill();

        // Mouth
        graphics.lineStyle(10, 0x000000);
        graphics.beginFill(0xffcc00);
        this.drawArc(graphics, 0, 0, this._radius * 0.6, 0, 180, 1);
        graphics.endFill();

        // Right eye
        graphics.lineStyle(10, 0x000000);
        graphics.beginFill(0x000);
        graphics.drawCircle(-(this._radius / 3), -(this._radius / 4), this._radius / 8);
        graphics.endFill();

        // Left eye
        graphics.lineStyle(10, 0x000000);
        graphics.beginFill(0x000);
        graphics.drawCircle(this._radius / 3, -(this._radius / 4), this._radius / 8);
        graphics.endFill();
    }

    private drawArc(
        graphics: Graphics,
        centerX: number,
        centerY: number,
        radius: number,
        angleFrom: number,
        angleTo: number,
        precision: number
    ) {
        const degToRad = 0.0174532925;

        let angleDiff = angleTo - angleFrom;
        let steps = Math.round(angleDiff * precision);
        let angle = angleFrom;
        let px = centerX + radius * Math.cos(angle * degToRad);
        let py = centerY + radius * Math.sin(angle * degToRad);

        graphics.moveTo(px, py);

        for (let i: number = 1; i <= steps; i++) {
            angle = angleFrom + (angleDiff / steps) * i;
            graphics.lineTo(centerX + radius * Math.cos(angle * degToRad), centerY + radius * Math.sin(angle * degToRad));
        }
    }

    private move(): void {
        this.x = Math.random() * 960;
        this.y = Math.random() * 400;

        this.x = Math.max(this.x, this.width / 2);
        this.x = Math.min(this.x, 960 - this.width / 2);

        this.y = Math.max(this.y, this.height / 2);
        this.y = Math.min(this.y, 400 - this.height / 2);
    }

    private enableButtonMode(): void {
        this.useHandCursor = true;
        this.mouseEnabled = true;
        this.mouseChildren = false;
        this.buttonMode = true;
    }
}
