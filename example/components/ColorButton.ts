// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container, Graphics, Text, TextStyle } from "pixi.js";

export class ColorButton extends Container {
    constructor(text: string, fontSize: number = 28, bgWidth: number = 460, bgHeight: number = 90) {
        super();

        this.interactive = true;
        this.buttonMode = true;

        this.createBackground(bgWidth, bgHeight);
        this.setupEvents();
        this.setText(text, fontSize);
    }
    private setText(text: string, fontSize: number): void {
        const style = new TextStyle({
            align: "center",
            fill: 0xffffff,
            fontFamily: "Arial",
            fontSize,
            fontWeight: "bold"
        });
        const label = new Text(text, style);
        label.pivot.x = label.width * 0.5;
        label.pivot.y = label.height * 0.5;
        this.addChild(label);
    }
    private createBackground(bgWidth: number, bgHeight: number): void {
        const background = new Graphics();
        background.beginFill(0x000000);
        background.drawRoundedRect(0, 0, bgWidth, bgHeight, 10);
        background.pivot.x = background.width * 0.5;
        background.pivot.y = background.height * 0.5;
        this.addChild(background);
    }
    private setupEvents(): void {
        this.on("pointerup", this.onButtonUp);
        this.on("pointerupoutside", this.onButtonUp);
        this.on("pointerdown", this.onButtonDown);
        this.on("pointerout", this.onButtonOut);
    }
    private onButtonDown(): void {
        this.scale.set(0.95, 0.95);
    }
    private onButtonOut(): void {
        this.scale.set(1, 1);
    }
    private onButtonUp(): void {
        this.scale.set(1, 1);
    }
}
