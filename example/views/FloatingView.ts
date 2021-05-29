// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ColorButton } from "./../components/ColorButton";
import { Container, Graphics, TextStyle, Text } from "pixi.js";

export class FloatingView extends Container {
    private _closeButton: ColorButton;
    private _closeAllButton: ColorButton;
    private _addViewButton: ColorButton;

    constructor() {
        super();
        this.createBackground();
        this.createButtons();
        this.createTexts();
    }
    public setTitle(index: number): void {
        const style = new TextStyle({
            align: "center",
            fill: 0xffffff,
            fontFamily: "Arial",
            fontSize: 22,
            fontWeight: "bold"
        });
        const titleText: Text = new Text(`Floating View ${index}`, style);
        titleText.anchor.set(0.5);
        titleText.position.set(480, 185);
        this.addChild(titleText);
    }
    private createTexts(): void {
        const style = new TextStyle({
            fill: 0xffffff,
            fontFamily: "Arial",
            fontSize: 18,
            fontWeight: "bold",
            lineHeight: 40
        });
        const text = "Add - A new FloatingView\nRemove - The current FloatingView\nRemove All - FloatingViews";

        const info: Text = new Text(text, style);
        info.position.set(280 + 50, 250);
        this.addChild(info);
    }
    private createButtons(): void {
        const fontSize = 18;
        const bgWidth = 100;
        const bgHeight = 50;
        const posY = 420;

        this._addViewButton = new ColorButton("add", fontSize, bgWidth, bgHeight);
        this._addViewButton.position.set(280 + 95, posY);
        this.addChild(this._addViewButton);

        this._closeButton = new ColorButton("remove", fontSize, bgWidth, bgHeight);
        this._closeButton.position.set(280 + 200, posY);
        this.addChild(this._closeButton);

        this._closeAllButton = new ColorButton("remove all", fontSize, bgWidth, bgHeight);
        this._closeAllButton.position.set(280 + 305, posY);
        this.addChild(this._closeAllButton);
    }
    private createBackground(): void {
        const graphic: Graphics = new Graphics();
        const colorDark = 0x2b3b47;
        const colorLight = 0x56768f;

        graphic.beginFill(colorDark, 0.8);
        graphic.drawRect(0, 0, 960, 600);

        graphic.beginFill(colorLight);
        graphic.drawRect(320, 150, 320, 300);

        graphic.beginFill(colorDark);
        graphic.drawRoundedRect(280 + 50, 160, 300, 50, 10);

        this.addChild(graphic);
    }
    public get closeButton(): ColorButton {
        return this._closeButton;
    }
    public get closeAllButton(): ColorButton {
        return this._closeAllButton;
    }
    public get addViewButton(): ColorButton {
        return this._addViewButton;
    }
}
