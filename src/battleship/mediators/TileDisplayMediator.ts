import { GameManager } from "../game/managers/GameManager";
import { TileDisplay } from "../views/components/TileDisplay";

import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class TileDisplayMediator extends Mediator<TileDisplay> {
    @inject(GameManager) public gameManager: GameManager;

    public initialize(): void {
        this.eventMap.mapListener(this.view, "pointerup", this.onButtonUp, this);
    }

    public onButtonUp(e: any): void {
        if (e.data.button === 0 && this.view.enabled) {
            this.view.attack();
            this.view.enabled = false;
            this.gameManager.attackEnemy(this.view.tile.col, this.view.tile.row);
            this.eventMap.unmapListeners();
        }
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
        this.view.destroy();
    }
}
