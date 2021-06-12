import { AttackEvent } from "./../events/AttackEvent";
import { Tile } from "./../models/Tile";
import { GameManager } from "./../managers/GameManager";
import { BattleFieldUtils } from "./../utils/BattleFieldUtils";
import { LevelModel } from "./../models/LevelModel";
import { GameService } from "./../../services/GameService";
import { FlowService } from "./../../services/FlowService";

import { injectable, inject, ICommand } from "@robotlegsjs/core";

@injectable()
export class EnemyAttackCommand implements ICommand {
    @inject(LevelModel) public levelModel: LevelModel;

    @inject(GameService) public gameService: GameService;

    @inject(FlowService) public flowService: FlowService;

    @inject(GameManager) public gameManager: GameManager;

    public execute(): void {
        setTimeout(this.enemyAttackWithDelay.bind(this), 400, this);
    }

    private enemyAttackWithDelay(): void {
        let tile: Tile = this.getRandomTile();
        let result = this.gameManager.attack(this.levelModel.hero, tile.col, tile.row);

        this.gameService.updateBattleField();

        if (result === "gameOver") {
            this.flowService.showGameOverPopup();
        } else if (result === AttackEvent.FAIL) {
            this.gameService.heroPhase();
        } else {
            this.gameService.enemyAttackCommand();
        }
    }

    private getRandomTile(): Tile {
        let tiles: Tile[] = BattleFieldUtils.getValidTileList(this.levelModel.hero);
        let rnd = Math.floor(Math.random() * tiles.length);
        return tiles[rnd];
    }
}
