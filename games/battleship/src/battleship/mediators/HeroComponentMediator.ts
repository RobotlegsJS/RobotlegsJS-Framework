import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { GameEvent } from "../events/GameEvent";
import { BattleField } from "../game/models/BattleField";
import { LevelModel } from "../game/models/LevelModel";
import { Ship } from "../game/models/Ship";
import { HeroComponent } from "../views/components/HeroComponent";

@injectable()
export class HeroComponentMediator extends Mediator<HeroComponent> {
    @inject(LevelModel)
    public levelModel: LevelModel;

    public initialize(): void {
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.DRAW_BATTLEFIELD,
            this._onDrawBattleField,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.UPDATE_BATTLEFIELD,
            this._onUpdatewBattleField,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.ENEMY_PHASE,
            this._onEnemyPhase,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.HERO_PHASE,
            this._onHeroPhase,
            this
        );
    }

    public destroy(): void {
        this.view.destroy();
    }

    private _onEnemyPhase(e: any): void {
        this.view.grid.focus = true;
    }

    private _onHeroPhase(e: any): void {
        this.view.grid.focus = false;
    }

    private _onUpdatewBattleField(e: any): void {
        let battlefield: BattleField = this.levelModel.hero;
        this.view.grid.updateGrid(battlefield.grid);
        this._updateHPs(battlefield.ships);
    }

    private _onDrawBattleField(e: any): void {
        let battlefield: BattleField = this.levelModel.hero;
        this.view.grid.drawGrid(battlefield.grid);
        this.view.ships.addShips(battlefield.ships);
        this.view.hps.addShipHPs(battlefield.ships);
    }

    private _updateHPs(ships: Ship[]): void {
        this.view.ships.updateHPs(ships);
        this.view.hps.updateHPs(ships);
    }
}
