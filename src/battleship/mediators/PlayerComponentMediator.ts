import { Ship } from "../game/models/Ship";
import { GameEvent } from "./../events/GameEvent";
import { TileDisplay } from "./../views/components/TileDisplay";
import { MagicValues } from "./../utils/MagicValues";
import { Grid } from "./../game/models/Grid";
import { Player } from "./../game/models/Player";
import { BattleField } from "./../game/models/BattleField";
import { LevelModel } from "../game/models/LevelModel";
import { PlayerComponent } from "./../views/components/PlayerComponent";

import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class PlayerComponentMediator extends Mediator<PlayerComponent> {
    @inject(LevelModel) public levelModel: LevelModel;

    public initialize(): void {
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.DRAW_BATTLEFIELD, this.onDrawBattleField, this);
    }

    public destroy(): void {
        this.view.destroy();
    }

    private onDrawBattleField(e: any): void {
        let battlefield: BattleField;
        if (this.view.type === Player.HUMAN) {
            battlefield = this.levelModel.hero.battleField;
        } else if (this.view.type === Player.BOT) {
            battlefield = this.levelModel.enemy.battleField;
        }

        this.drawBattleGrid(battlefield.grid);
        this.setShipsHP(battlefield.ships);
    }
    private drawBattleGrid(grid: Grid): void {
        for (let row = 0; row < grid.maxRows; row++) {
            for (let col = 0; col < grid.maxCols; col++) {
                let tileId = grid.getTileId(col, row);
                let display: TileDisplay = new TileDisplay(tileId);
                display.x = MagicValues.TILE_WIDTH * col;
                display.y = MagicValues.TILE_HEIGHT * row;
                this.view.field.addChild(display);
            }
        }
    }
    private setShipsHP(ships: Ship[]): void {
        for (let i = 0; i < ships.length; i++) {
            this.view.doubleTexts[i].label = "Ship HP:";
            this.view.doubleTexts[i].text = ships[i].hp.toString();
        }
    }
}
