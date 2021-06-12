import { IEventDispatcher, inject, injectable } from "@robotlegsjs/core";

import { MagicValues } from "../utils/MagicValues";
import { GameEvent } from "./../events/GameEvent";
import { Model } from "./../models/Model";
import { Prizes } from "./../utils/Prizes";

@injectable()
export class ScratchManager {
    @inject(IEventDispatcher) private eventDispatcher: IEventDispatcher;
    @inject(Model) private model: Model;

    private covered: Set<string>;

    constructor() {
        this.covered = new Set<string>();
    }
    public create(): void {
        this.covered.clear();
        this.model.posX = NaN;
        this.model.posY = NaN;
        this.model.pressed = false;
        this.model.prizes = Prizes.getNine();
        this.model.matchedPrizes = this.matchedPrizes();
    }
    public scratchPosition(x: number, y: number): void {
        this.model.posX = Math.min(x, MagicValues.SCRATCH_BOX_WIDTH + 50);
        this.model.posY = Math.min(y, MagicValues.SCRATCH_BOX_HEIGHT + 100);
        this.validate(x, y);
    }
    private validate(x: number, y: number): void {
        x = Math.floor(x / MagicValues.TILE_SQUARE);
        y = Math.floor(y / MagicValues.TILE_SQUARE);
        this.covered.add(`${x}_${y}`);

        if (this.covered.size >= this.mimPercent()) {
            this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.END_GAME_COMMAND));
        }
    }
    private mimPercent(): number {
        const { SCRATCH_BOX_HEIGHT, SCRATCH_BOX_WIDTH, TILE_SQUARE } = MagicValues;
        const rows = SCRATCH_BOX_HEIGHT / TILE_SQUARE;
        const cols = SCRATCH_BOX_WIDTH / TILE_SQUARE;
        return rows * cols * 0.9;
    }
    private matchedPrizes(): string[] {
        const prizes = this.model.prizes;
        const count = {};
        const hightlight = [];
        for (const prize of prizes) {
            count[prize] = count[prize] ? count[prize] + 1 : 1;
        }
        for (const prize in count) {
            if (count[prize] >= 3) {
                hightlight.push(prize);
            }
        }
        return hightlight;
    }
}
