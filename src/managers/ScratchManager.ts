import { IEventDispatcher, inject, injectable } from "@robotlegsjs/core";

import { MagicValues } from "../utils/MagicValues";
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
        this.model.prizes = this.generatePrizes();
    }
    public scratchPosition(x: number, y: number): void {
        this.model.posX = Math.min(x, MagicValues.SCRATCH_BOX_WIDTH + 50);
        this.model.posY = Math.min(y, MagicValues.SCRATCH_BOX_HEIGHT + 100);
    }
    private generatePrizes(): string[] {
        const prizes = [];
        const total = Prizes.ALL.length;
        for (let i = 0; i < total; i++) {
            const rnd = Math.floor(Math.random() * total);
            prizes.push(Prizes.ALL[rnd]);
        }
        return prizes;
    }
}
