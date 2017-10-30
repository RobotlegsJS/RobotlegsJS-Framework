import { IsoUtils } from "../utils/IsoUtils";
import { Tile } from "../game/models/Tile";
import { Ship } from "../game/models/Ship";
import { GameEvent } from "./../events/GameEvent";
import { MagicValues } from "./../utils/MagicValues";
import { Grid } from "./../game/models/Grid";
import { BattleField } from "./../game/models/BattleField";
import { LevelModel } from "../game/models/LevelModel";
import { HeroComponent } from "./../views/components/HeroComponent";
import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
@injectable()
export class HeroComponentMediator extends Mediator<HeroComponent> {
    @inject(LevelModel) public levelModel: LevelModel;
    public initialize(): void {
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.DRAW_BATTLEFIELD, this.onDrawBattleField, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.UPDATE_BATTLEFIELD, this.onUpdatewBattleField, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.ENEMY_PHASE, this.onEnemyPhase, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.HERO_PHASE, this.onHeroPhase, this);
    }
    public destroy(): void {
        this.view.destroy();
    }
    private onEnemyPhase(e: any): void {
        this.view.grid.focus = true;
    }
    private onHeroPhase(e: any): void {
        this.view.grid.focus = false;
    }
    private onUpdatewBattleField(e: any): void {
        let battlefield: BattleField = this.levelModel.hero;
        this.view.grid.updateGrid(battlefield.grid);
        this.updateHPs(battlefield.ships);
    }
    private onDrawBattleField(e: any): void {
        let battlefield: BattleField = this.levelModel.hero;
        this.view.grid.drawGrid(battlefield.grid);
        this.view.ships.addShips(battlefield.ships);
        this.view.hps.addShipHPs(battlefield.ships);
    }
    private updateHPs(ships: Ship[]): void {
        this.view.ships.updateHPs(ships);
        this.view.hps.updateHPs(ships);
    }
}
