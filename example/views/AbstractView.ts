// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";

import { ColorButton } from "./../components/ColorButton";

export class AbstractView extends Container {
    protected _setViewButton: ColorButton;
    protected _addViewButton: ColorButton;

    constructor(title: string, imgUrl: string, lightColor: number, darkColor: number) {
        super();
        this.createBackground(lightColor, darkColor);
        this.createImages(imgUrl);
        this.createText(title);
        this.createButtons();
    }
    private createButtons(): void {
        const posY = 550;

        this._setViewButton = new ColorButton("View");
        this._setViewButton.position.set(100, posY);
        this.addChild(this._setViewButton);

        this._addViewButton = new ColorButton("Floating\nView");
        this._addViewButton.position.set(300, posY);
        this.addChild(this._addViewButton);
    }
    private createText(title: string): void {
        const style = new TextStyle({
            align: "center",
            fill: 0xffffff,
            fontFamily: "Arial",
            fontSize: 28,
            fontWeight: "bold"
        });
        const titleText: Text = new Text(title, style);
        titleText.anchor.set(0.5);
        titleText.position.set(200, 60);
        this.addChild(titleText);
    }
    private createImages(imgUrl: string): void {
        const logo: Sprite = PIXI.Sprite.fromImage(imgUrl);
        logo.anchor.set(0.5);
        logo.position.set(200, 300);
        this.addChild(logo);
    }
    private createBackground(lightColor: number, darkColor: number): void {
        const graphic: Graphics = new Graphics();
        graphic.beginFill(lightColor);
        graphic.drawRect(0, 0, 400, 600);

        graphic.beginFill(darkColor);
        graphic.drawRoundedRect(10, 10, 380, 100, 10);

        this.addChild(graphic);
    }
    public get setViewButton(): ColorButton {
        return this._setViewButton;
    }
    public get addViewButton(): ColorButton {
        return this._addViewButton;
    }
}
