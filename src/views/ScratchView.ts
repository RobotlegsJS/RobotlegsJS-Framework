import { Colors } from "../utils/Colors";
import { Prizes } from "./../utils/Prizes";
import { Container } from "pixi.js";

import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";

export class ScratchView extends Container {
    constructor() {
        super();
        this.createBackground();
        this.setupPrizes();
    }
    public setupPrizes(): void {
        const prizes = Prizes.getNine();
        for (let i = 0; i < prizes.length; i++) {
            const sprite = PixiFactory.getSprite(prizes[i]);
            sprite.x = Math.floor(i / 3) * (128 + 5) + 5;
            sprite.y = Math.floor(i % 3) * (128 + 5) + 5;
            this.addChild(sprite);
        }
    }
    private createBackground(): void {
        const { SCRATCH_BOX_HEIGHT, SCRATCH_BOX_WIDTH } = MagicValues;
        const scratchArea = PixiFactory.getColorBox(SCRATCH_BOX_WIDTH, SCRATCH_BOX_HEIGHT, Colors.BACKGROUND_DARK);
        this.addChild(scratchArea);
    }
}
