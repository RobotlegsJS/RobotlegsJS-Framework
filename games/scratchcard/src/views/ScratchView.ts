import { Container, Graphics } from "pixi.js";

import { Colors } from "../utils/Colors";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Item } from "./components/Item";

export class ScratchView extends Container {
    private coverMask: Graphics;
    private items: Container;

    constructor() {
        super();
        this.createBackground();
        this.createComponents();
    }
    public setupPrizes(prizes: string[], matched: string[]): void {
        this.items.removeChildren();

        for (let i = 0; i < prizes.length; i++) {
            const hightlight: boolean = matched.indexOf(prizes[i]) !== -1;
            const sprite = new Item(prizes[i], hightlight);
            sprite.x = Math.floor(i / 3) * MagicValues.ITEM_SIZE + 5;
            sprite.y = Math.floor(i % 3) * MagicValues.ITEM_SIZE + 5;
            this.items.addChild(sprite);
        }
        this.setupMask();
    }
    public clearAll(): void {
        this.coverMask.clear();
        this.coverMask.drawRect(0, 0, MagicValues.MAX_WIDTH, MagicValues.MAX_HEIGHT);
    }
    public addScrach(x: number, y: number): void {
        this.coverMask.drawRoundedRect(x - 20, y - 20, 40, 40, Math.random() * 50);
    }
    private setupMask(): void {
        if (this.coverMask) {
            this.coverMask.clear();
        }
        this.coverMask = new Graphics();
        this.coverMask.beginFill(0xff0000, 0.1);
        this.mask = this.coverMask;
    }
    private createComponents(): void {
        this.items = new Container();
        this.addChild(this.items);
    }
    private createBackground(): void {
        const { SCRATCH_BOX_HEIGHT, SCRATCH_BOX_WIDTH } = MagicValues;
        const scratchArea = PixiFactory.getColorBox(
            SCRATCH_BOX_WIDTH,
            SCRATCH_BOX_HEIGHT,
            Colors.BACKGROUND_DARK
        );
        this.addChild(scratchArea);
    }
}
