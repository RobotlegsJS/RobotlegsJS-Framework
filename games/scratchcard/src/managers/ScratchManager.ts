import { IEventDispatcher, inject, injectable } from "@robotlegsjs/core";

import { MagicValues } from "../utils/MagicValues";
import { GameEvent } from "./../events/GameEvent";
import { Model } from "./../models/Model";
import { Prizes } from "./../utils/Prizes";

@injectable()
export class ScratchManager {
    @inject(IEventDispatcher)
    private _eventDispatcher: IEventDispatcher;

    @inject(Model)
    private _model: Model;

    private _covered: Set<string>;

    public constructor() {
        this._covered = new Set<string>();
    }

    public create(): void {
        this._covered.clear();
        this._model.posX = NaN;
        this._model.posY = NaN;
        this._model.pressed = false;
        this._model.prizes = Prizes.getNine();
        this._model.matchedPrizes = this._matchedPrizes();
    }

    public scratchPosition(x: number, y: number): void {
        this._model.posX = Math.min(x, MagicValues.SCRATCH_BOX_WIDTH + 50);
        this._model.posY = Math.min(y, MagicValues.SCRATCH_BOX_HEIGHT + 100);
        this._validate(x, y);
    }

    private _validate(x: number, y: number): void {
        x = Math.floor(x / MagicValues.TILE_SQUARE);
        y = Math.floor(y / MagicValues.TILE_SQUARE);
        this._covered.add(`${x}_${y}`);

        if (this._covered.size >= this._mimPercent()) {
            this._eventDispatcher.dispatchEvent(new GameEvent(GameEvent.END_GAME_COMMAND));
        }
    }

    private _mimPercent(): number {
        const { SCRATCH_BOX_HEIGHT, SCRATCH_BOX_WIDTH, TILE_SQUARE } = MagicValues;
        const rows = SCRATCH_BOX_HEIGHT / TILE_SQUARE;
        const cols = SCRATCH_BOX_WIDTH / TILE_SQUARE;
        return rows * cols * 0.9;
    }

    private _matchedPrizes(): string[] {
        const prizes = this._model.prizes;
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
