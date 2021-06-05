// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container, Graphics, Sprite, Text, TextStyle, TilingSprite } from "pixi.js";

import { ColorButton } from "./../components/ColorButton";

export class AbstractView extends Container {
    protected _setViewButton: ColorButton;
    protected _addViewButton: ColorButton;

    public constructor(title: string, imgUrl: string, lightColor: number, darkColor: number) {
        super();
        this._createBackground(lightColor, darkColor);
        this._createImages(imgUrl);
        this._createText(title);
        this._createButtons();
    }

    private _createButtons(): void {
        const posY = 550;

        this._setViewButton = new ColorButton("View");
        this._setViewButton.position.set(240, posY);
        this.addChild(this._setViewButton);

        this._addViewButton = new ColorButton("Floating\nView");
        this._addViewButton.position.set(720, posY);
        this.addChild(this._addViewButton);
    }

    private _createText(title: string): void {
        const style = new TextStyle({
            align: "center",
            fill: 0xffffff,
            fontFamily: "Arial",
            fontSize: 28,
            fontWeight: "bold"
        });
        const titleText: Text = new Text(title, style);
        titleText.anchor.set(0.5);
        titleText.position.set(480, 60);
        this.addChild(titleText);
    }

    private _createImages(imgUrl: string): void {
        const logo: Sprite = TilingSprite.from(imgUrl, { width: 230, height: 230 });
        logo.anchor.set(0.5);
        logo.position.set(480, 300);
        this.addChild(logo);
    }

    private _createBackground(lightColor: number, darkColor: number): void {
        const graphic: Graphics = new Graphics();
        graphic.beginFill(lightColor);
        graphic.drawRect(0, 0, 960, 600);

        graphic.beginFill(darkColor);
        graphic.drawRoundedRect(10, 10, 940, 100, 10);

        this.addChild(graphic);
    }

    public get setViewButton(): ColorButton {
        return this._setViewButton;
    }

    public get addViewButton(): ColorButton {
        return this._addViewButton;
    }
}
