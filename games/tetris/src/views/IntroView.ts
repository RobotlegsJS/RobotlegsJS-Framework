import { Container, Sprite, Text, TilingSprite } from "pixi.js";
import { AtlasKeys } from "../utils/AtlasKeys";
import { Colors } from "../utils/Colors";
import { PixiFactory } from "../utils/PixiFactory";
import { Texts } from "../utils/Texts";
import { ViewPortSize } from "../utils/ViewPortSize";

export class IntroView extends Container {
    public constructor() {
        super();

        this._setupBackground();
        this._setupImages();
        this._setupText();
    }

    private _setupBackground(): void {
        this.addChild(PixiFactory.getColorBackground());
    }

    private _setupImages(): void {
        const logo: Sprite = TilingSprite.from(AtlasKeys.LOGO_TYPESCRIPT, {
            width: 340,
            height: 64
        });
        logo.anchor.x = 0.5;
        logo.x = ViewPortSize.HALF_WIDTH;
        logo.y = ViewPortSize.MAX_HEIGHT - 64;
        this.addChild(logo);
    }

    private _setupText(): void {
        const title: Text = PixiFactory.getText(
            Texts.DEVELOPER,
            Colors.GAME_ITEMS,
            Texts.FONT_SIZE_DEFAULT + 6
        );
        title.anchor.set(0.5);
        title.x = ViewPortSize.HALF_WIDTH;
        title.y = ViewPortSize.HALF_HEIGHT;
        this.addChild(title);
    }
}
