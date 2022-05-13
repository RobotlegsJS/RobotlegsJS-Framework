import { Container, Sprite, Text, TextStyle, TilingSprite } from "pixi.js";
import { AtlasKeys } from "../utils/AtlasKeys";
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
        this.addChild(PixiFactory.getColorBackground(0x204d63));
    }

    private _createImages(): void {
        let logoImg: Sprite = TilingSprite.from(AtlasKeys.LOGO_TYPESCRIPT, {
            width: 340,
            height: 64
        });

        logoImg.anchor.x = 0.5;
        logoImg.x = MagicValues.HALF_WIDTH;
        logoImg.y = MagicValues.MAX_HEIGHT - 64;

        this.addChild(logoImg);
    }

    private _createText(): void {
        let style = new TextStyle({
            align: "center",
            fill: 0xb5d6e6,
            fontFamily: "Arial",
            fontSize: 28,
            fontWeight: "bold"
        });

        let titleText: Text = new Text(Texts.DEVELOPER, style);

        titleText.anchor.set(0.5);
        titleText.x = MagicValues.HALF_WIDTH;
        titleText.y = MagicValues.HALF_HEIGHT;

        this.addChild(titleText);
    }
}
