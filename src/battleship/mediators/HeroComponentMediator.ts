import { ShipDisplay } from "./../views/components/ShipDisplay";
import { Sprite } from "pixi.js";
import { IsoUtils } from "../utils/IsoUtils";
import { Tile } from "../game/models/Tile";
import { Ship } from "../game/models/Ship";
import { GameEvent } from "./../events/GameEvent";
import { TileDisplay } from "./../views/components/TileDisplay";
import { MagicValues } from "./../utils/MagicValues";
import { Grid } from "./../game/models/Grid";
import { Player } from "./../game/models/Player";
import { BattleField } from "./../game/models/BattleField";
import { LevelModel } from "../game/models/LevelModel";
import { HeroComponent } from "./../views/components/HeroComponent";

import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class HeroComponentMediator extends Mediator<HeroComponent> {
    @inject(LevelModel) public levelModel: LevelModel;
    private _tileDisplays: Map<string, TileDisplay>;
    private _shipDisplays: Map<Ship, Sprite>;
    public initialize(): void {
        this._tileDisplays = new Map<string, TileDisplay>();
        this._shipDisplays = new Map<Ship, Sprite>();
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.DRAW_BATTLEFIELD, this.onDrawBattleField, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.UPDATE_BATTLEFIELD, this.onUpdatewBattleField, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.ENEMY_PHASE, this.onEnemyPhase, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.HERO_PHASE, this.onHeroPhase, this);
    }

    public destroy(): void {
        this.view.destroy();
    }
    private onEnemyPhase(e: any): void {
        this.view.background.visible = true;
    }
    private onHeroPhase(e: any): void {
        this.view.background.visible = false;
    }
    private onUpdatewBattleField(e: any): void {
        let battlefield: BattleField = this.levelModel.hero;
        this.updateInfo(battlefield.ships);
        this.udpateBattleGrid(battlefield);
    }

    private onDrawBattleField(e: any): void {
        let battlefield: BattleField = this.levelModel.hero;

        this.drawBattleGrid(battlefield.grid);
        this.updateInfo(battlefield.ships);
        for (let ship of battlefield.ships) {
            let shipDisplay = new ShipDisplay(ship);
            this.view.field.addChild(shipDisplay);
            this._shipDisplays.set(ship, shipDisplay);
        }
    }

    private drawBattleGrid(grid: Grid): void {
        for (let row = 0; row < grid.maxRows; row++) {
            for (let col = 0; col < grid.maxCols; col++) {
                let tileId = grid.getTileId(col, row);
                let display: TileDisplay = new TileDisplay(tileId, col, row);
                let positions = IsoUtils.toIso(col, row);
                display.x = positions.x;
                display.y = positions.y;
                this.view.field.addChild(display);
                this._tileDisplays.set(`${col}_${row}`, display);
            }
        }
    }
    private udpateBattleGrid(battlefield: BattleField): void {
        let grid: Grid = battlefield.grid;
        for (let row = 0; row < grid.maxRows; row++) {
            for (let col = 0; col < grid.maxCols; col++) {
                let display: TileDisplay = this._tileDisplays.get(`${col}_${row}`);
                if (grid.getTileId(col, row) === Tile.HITTED) {
                    display.attack();
                }
            }
        }
        for (let ship of battlefield.ships) {
            if (ship.hp > 0) {
                continue;
            }
            let shipDisplay = this._shipDisplays.get(ship);
            shipDisplay.alpha = 0.5;
        }
    }
    private updateInfo(ships: Ship[]): void {
        for (let i = 0; i < ships.length; i++) {
            this.view.doubleTexts[i].text = ships[i].hp.toString();
        }
    }
}
