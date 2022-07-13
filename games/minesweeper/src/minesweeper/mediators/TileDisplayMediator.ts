import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { GameManager } from "../game/managers/GameManager";
import { Cell } from "../game/models/Cell";
import { TileDisplay } from "../views/components/TileDisplay";

@injectable()
export class TileDisplayMediator extends Mediator<TileDisplay> {
    @inject(GameManager)
    public gameManager: GameManager;

    public initialize(): void {
        this.eventMap.on(this.view, "pointerup", this.onButtonUp, this);
    }

    public onButtonUp(e: any): void {
        const cell: Cell = this.view.cell;
        if (e.data.button === 0) {
            this.gameManager.reveal(cell);
            this.view.reveal();
            this.destroy();
        } else if (e.data.button === 2 && this.gameManager.level.numFlags > 0) {
            this.gameManager.flag(cell);
            this.view.flag();
        }
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }
}
