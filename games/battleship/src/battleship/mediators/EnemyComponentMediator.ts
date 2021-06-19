import { GameEvent } from "../events/GameEvent";
import { BattleField } from "../game/models/BattleField";
import { LevelModel } from "../game/models/LevelModel";
import { EnemyComponent } from "../views/components/EnemyComponent";

import { injectable, inject } from "@robotlegsjs/core";

import { Mediator } from "@robotlegsjs/pixi";
@injectable()
export class EnemyComponentMediator extends Mediator<EnemyComponent> {
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
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.UPDATE_BATTLEFIELD,
            this._onUpdateBattleField,
            this
        );
    }

    public destroy(): void {
        this.view.destroy();
    }

    private _onEnemyPhase(e: any): void {
        this.view.grid.focus = false;
        this.view.interactiveChildren = false;
    }

    private _onHeroPhase(e: any): void {
        this.view.grid.focus = true;
        this.view.interactiveChildren = true;
    }

    private _onDrawBattleField(e: any): void {
        let battlefield: BattleField = this.levelModel.enemy;
        this.view.grid.drawGrid(battlefield.grid);
        this.view.ships.addShips(battlefield.ships);
        this.view.ships.hideAll(battlefield.ships);
    }

    private _onUpdateBattleField(e: any): void {
        let battlefield: BattleField = this.levelModel.enemy;
        this.view.ships.updateHPs(battlefield.ships);
    }
}
