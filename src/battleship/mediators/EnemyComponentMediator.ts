import { Sprite } from "pixi.js";
import { IsoUtils } from "../utils/IsoUtils";
import { EnemyTileDisplay } from "./../views/components/EnemyTileDisplay";
import { Ship } from "../game/models/Ship";
import { GameEvent } from "./../events/GameEvent";
import { TileDisplay } from "./../views/components/TileDisplay";
import { MagicValues } from "./../utils/MagicValues";
import { Grid } from "./../game/models/Grid";
import { Player } from "./../game/models/Player";
import { BattleField } from "./../game/models/BattleField";
import { LevelModel } from "../game/models/LevelModel";
import { EnemyComponent } from "./../views/components/EnemyComponent";

import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class EnemyComponentMediator extends Mediator<EnemyComponent> {
    @inject(LevelModel) public levelModel: LevelModel;

    private _shipDisplays: Map<Ship, Sprite>;
    public initialize(): void {
        this._shipDisplays = new Map<Ship, Sprite>();
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.DRAW_BATTLEFIELD, this.onDrawBattleField, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.ENEMY_PHASE, this.onEnemyPhase, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.HERO_PHASE, this.onHeroPhase, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.UPDATE_BATTLEFIELD, this.onUpdatewBattleField, this);
    }

    public destroy(): void {
        this.view.destroy();
    }
    private onEnemyPhase(e: any): void {
        this.view.background.visible = false;
        this.view.interactiveChildren = false;
    }
    private onHeroPhase(e: any): void {
        this.view.background.visible = true;
        this.view.interactiveChildren = true;
    }
    private onDrawBattleField(e: any): void {
        let battlefield: BattleField = this.levelModel.enemy;

        this.drawBattleGrid(battlefield.grid);
        for (let ship of battlefield.ships) {
            this._shipDisplays.set(ship, this.view.createShip(ship));
        }
    }
    private onUpdatewBattleField(e: any): void {
        let battlefield: BattleField = this.levelModel.enemy;
        for (let ship of battlefield.ships) {
            this._shipDisplays.get(ship).visible = !ship.hp;
        }
    }
    private drawBattleGrid(grid: Grid): void {
        for (let row = 0; row < grid.maxRows; row++) {
            for (let col = 0; col < grid.maxCols; col++) {
                let tileId = grid.getTileId(col, row);
                let display: TileDisplay = new EnemyTileDisplay(tileId, col, row);
                let positions = IsoUtils.toIso(col, row);
                display.x = positions.x;
                display.y = positions.y;
                this.view.field.scale.set(1.4);
                this.view.field.addChild(display);
            }
        }
    }
}
