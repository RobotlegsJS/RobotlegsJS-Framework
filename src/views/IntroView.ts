import { Container, Sprite, Text } from "pixi.js";

import { AssetKeys } from "./../utils/AssetKeys";
import { Colors } from "./../utils/Colors";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";

export class IntroView extends Container {
    constructor() {
        super();

        this.createBackground();
        this.createImages();
        this.createText();
    }
    private createBackground(): void {
        this.addChild(PixiFactory.getColorBackground(Colors.BACKGROUND_DARK));
    }
    private createImages(): void {
        const logoImg: Sprite = PIXI.Sprite.fromImage(AssetKeys.LOGO_TYPESCRIPT);
        logoImg.anchor.x = 0.5;
        logoImg.x = MagicValues.HALF_WIDTH;
        logoImg.y = MagicValues.MAX_HEIGHT - 64;
        this.addChild(logoImg);
    }
    private createText(): void {
        const style = new PIXI.TextStyle({
            align: "center",
            fill: Colors.TEXT,
            fontFamily: "Arial",
            fontSize: 28,
            fontWeight: "bold"
        });
        const titleText: Text = new PIXI.Text(Texts.DEVELOPER, style);
        titleText.anchor.set(0.5);
        titleText.x = MagicValues.HALF_WIDTH;
        titleText.y = MagicValues.HALF_HEIGHT;
        this.addChild(titleText);
    }
}
