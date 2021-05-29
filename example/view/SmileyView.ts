// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

export class SmileyView extends createjs.Container {
    private _radius: number;

    constructor(radius: number) {
        super();

        this._radius = Math.max(radius, 50);

        this.drawSmiley();
        this.move();
    }

    private drawSmiley(): void {
        let shape: createjs.Shape = new createjs.Shape();
        let graphics: createjs.Graphics = shape.graphics;

        // Head
        graphics.setStrokeStyle(10, "round", "round");
        graphics.beginStroke("#000");
        graphics.beginFill("#FC0");
        graphics.drawCircle(0, 0, this._radius);

        // Mouth
        graphics.beginFill("FC0");
        graphics.arc(0, 0, this._radius * 0.65, 0, Math.PI, false);

        // Right eye
        graphics.beginStroke("FC0");
        graphics.beginFill("#000");
        graphics.drawCircle(-(this._radius / 3), -(this._radius / 4), this._radius / 8);

        // Left eye
        graphics.beginStroke("FC0");
        graphics.beginFill("#000");
        graphics.drawCircle(this._radius / 3, -(this._radius / 4), this._radius / 8);

        this.addChild(shape);
    }

    private move(): void {
        this.x = Math.random() * 960;
        this.y = Math.random() * 400;

        this.x = Math.max(this.x, this._radius);
        this.x = Math.min(this.x, 960 - this._radius);

        this.y = Math.max(this.y, this._radius);
        this.y = Math.min(this.y, 400 - this._radius);
    }
}
