import { Container, Sprite, Text, TextStyle, TilingSprite } from "pixi.js";
import { AssetKeys } from "../utils/AssetKeys";
import { Colors } from "../utils/Colors";
import { MagicValues } from "../utils/MagicValues";
import { PixiFactory } from "../utils/PixiFactory";
import { Texts } from "../utils/Texts";

export class IntroView extends Container {
    public constructor() {
        super();

        this._createBackground();
        this._createImages();
        this._createText();
    }

    private _createBackground(): void {
        this.addChild(PixiFactory.getColorBackground(Colors.BACKGROUND_DARK));
    }

    private _createImages(): void {
        const logoImg: Sprite = TilingSprite.from(AssetKeys.LOGO_TYPESCRIPT);
        logoImg.anchor.x = 0.5;
        logoImg.x = MagicValues.HALF_WIDTH;
        logoImg.y = MagicValues.MAX_HEIGHT - 64;
        this.addChild(logoImg);
    }

    private _createText(): void {
        const style = new TextStyle({
            align: "center",
            fill: Colors.TEXT,
            fontFamily: "Arial",
            fontSize: 28,
            fontWeight: "bold"
        });
        const titleText: Text = new Text(Texts.DEVELOPER, style);
        titleText.anchor.set(0.5);
        titleText.x = MagicValues.HALF_WIDTH;
        titleText.y = MagicValues.HALF_HEIGHT;
        this.addChild(titleText);
    }
}
