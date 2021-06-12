import { Container, Sprite, Text } from "pixi.js";

import { AtlasKeys } from "./../utils/AtlasKeys";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { ViewPortSize } from "./../utils/ViewPortSize";

export class IntroView extends Container {
    constructor() {
        super();

        this.createBackground();
        this.createImages();
        this.createText();
    }
    private createBackground(): void {
        this.addChild(PixiFactory.getColorBackground(0x204d63));
    }
    private createImages(): void {
        const logoImg: Sprite = PIXI.Sprite.fromImage(AtlasKeys.LOGO_TYPESCRIPT);
        logoImg.anchor.x = 0.5;
        logoImg.x = ViewPortSize.HALF_WIDTH;
        logoImg.y = ViewPortSize.MAX_HEIGHT - 64;
        this.addChild(logoImg);
    }
    private createText(): void {
        const style = new PIXI.TextStyle({
            align: "center",
            fill: 0xb5d6e6,
            fontFamily: "Arial",
            fontSize: 28,
            fontWeight: "bold"
        });
        const titleText: Text = new PIXI.Text(Texts.DEVELOPER, style);
        titleText.anchor.set(0.5);
        titleText.x = ViewPortSize.HALF_WIDTH;
        titleText.y = ViewPortSize.HALF_HEIGHT;
        this.addChild(titleText);
    }
}
