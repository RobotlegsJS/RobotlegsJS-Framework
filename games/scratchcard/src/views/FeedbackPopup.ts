import { Container } from "pixi.js";
import { Colors } from "../utils/Colors";
import { MagicValues } from "../utils/MagicValues";
import { PixiFactory } from "../utils/PixiFactory";

export class FeedbackPopup extends Container {
    public constructor() {
        super();
        this._createBackground();
    }

    public createMSG(msg: string): void {
        const text = PixiFactory.getText(msg, Colors.TEXT);
        text.x = MagicValues.HALF_WIDTH;
        text.y = 40;
        text.anchor.set(0.5);
        this.addChild(text);
    }

    private _createBackground(): void {
        const background = PixiFactory.getColorBackground(Colors.BACKGROUND_DARK);
        background.alpha = 0.6;
        this.addChild(background);

        const { MAX_WIDTH, HUD_HEIGHT } = MagicValues;
        this.addChild(PixiFactory.getColorBox(MAX_WIDTH, HUD_HEIGHT, Colors.BACKGROUND_DARK));
    }
}
