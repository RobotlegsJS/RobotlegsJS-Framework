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
    public initialize(): void {
        this._tileDisplays = new Map<string, TileDisplay>();
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
        this.udpateBattleGrid(battlefield.grid);
    }

    private onDrawBattleField(e: any): void {
        let battlefield: BattleField = this.levelModel.hero;

        this.drawBattleGrid(battlefield.grid);
        this.updateInfo(battlefield.ships);
    }

    private drawBattleGrid(grid: Grid): void {
        for (let row = 0; row < grid.maxRows; row++) {
            for (let col = 0; col < grid.maxCols; col++) {
                let tileId = grid.getTileId(col, row);
                let display: TileDisplay = new TileDisplay(tileId, col, row);
                display.show();
                display.x = MagicValues.TILE_WIDTH * col;
                display.y = MagicValues.TILE_HEIGHT * row;
                this.view.field.addChild(display);
                this._tileDisplays.set(`${col}_${row}`, display);
            }
        }
    }
    private udpateBattleGrid(grid: Grid): void {
        for (let row = 0; row < grid.maxRows; row++) {
            for (let col = 0; col < grid.maxCols; col++) {
                let display: TileDisplay = this._tileDisplays.get(`${col}_${row}`);
                if (grid.getTileId(col, row) === Tile.HITTED) {
                    display.attack();
                }
            }
        }
    }
    private updateInfo(ships: Ship[]): void {
        let shipNames = ["Minesweeper", "Submarine", "Frigate", "Battleship", "Aircraftcarrier"];
        for (let i = 0; i < ships.length; i++) {
            this.view.doubleTexts[i].label = shipNames[i];
            this.view.doubleTexts[i].text = ships[i].hp.toString();
        }
    }
}
