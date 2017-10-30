import { GameService } from "../services/GameService";
import { GameManager } from "./../game/managers/GameManager";
import { EnemyTileDisplay } from "./../views/components/EnemyTileDisplay";
import { Player } from "./../game/models/Player";
import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class EnemyTileDisplayMediator extends Mediator<EnemyTileDisplay> {
    @inject(GameManager) public gameManager: GameManager;
    @inject(GameService) public gameService: GameService;

    public initialize(): void {
        this.eventMap.mapListener(this.view, "pointerup", this.onButtonUp, this);
    }

    public onButtonUp(e: any): void {
        if (e.data.button === 0 && this.view.enabled) {
            this.view.attack();
            this.gameService.heroAttackCommand(this.view.tile.col, this.view.tile.row);
            this.disable();
        }
    }
    public disable(): void {
        this.view.enabled = false;
        this.eventMap.unmapListeners();
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
        this.view.destroy();
    }
}
