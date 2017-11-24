import { Container } from "pixi.js";

import { Colors } from "../utils/Colors";
import { MagicValues } from "../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";

export class FeedbackPopup extends Container {
    constructor() {
        super();
        this.createBackground();
    }
    public createMSG(msg: string): void {
        const text = PixiFactory.getText(msg, Colors.TEXT);
        text.x = MagicValues.HALF_WIDTH;
        text.y = MagicValues.HALF_HEIGHT;
        text.anchor.set(0.5);
        this.addChild(text);
    }
    private createBackground(): void {
        const background = PixiFactory.getColorBackground(Colors.BACKGROUND_DARK);
        background.alpha = 0.6;
        this.addChild(background);
    }
}
