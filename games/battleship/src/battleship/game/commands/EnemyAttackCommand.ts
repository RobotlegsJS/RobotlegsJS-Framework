import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { FlowService } from "../../services/FlowService";
import { GameService } from "../../services/GameService";
import { AttackEvent } from "../events/AttackEvent";
import { GameManager } from "../managers/GameManager";
import { LevelModel } from "../models/LevelModel";
import { Tile } from "../models/Tile";
import { BattleFieldUtils } from "../utils/BattleFieldUtils";

@injectable()
export class EnemyAttackCommand implements ICommand {
    @inject(LevelModel)
    public levelModel: LevelModel;

    @inject(GameService)
    public gameService: GameService;

    @inject(FlowService)
    public flowService: FlowService;

    @inject(GameManager)
    public gameManager: GameManager;

    public execute(): void {
        setTimeout(this._enemyAttackWithDelay.bind(this), 400, this);
    }

    private _enemyAttackWithDelay(): void {
        let tile: Tile = this._getRandomTile();
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

    private _getRandomTile(): Tile {
        let tiles: Tile[] = BattleFieldUtils.getValidTileList(this.levelModel.hero);
        let rnd = Math.floor(Math.random() * tiles.length);
        return tiles[rnd];
    }
}
