import { MagicValues } from "./../utils/MagicValues";
import { BattleFieldUtils } from "./../game/utils/BattleFieldUtils";
import { TileDisplay } from "./../views/components/TileDisplay";
import { Grid } from '../game/models/Grid';
import { BattleFieldComponent } from "./../views/components/BattleFieldComponent";
import { LevelModel } from "./../game/models/LevelModel";
import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class BattleFieldComponentMediator extends Mediator<BattleFieldComponent> {
    @inject(LevelModel) public levelModel: LevelModel;

    public initialize(): void {
        this.levelModel.hero.battleField = BattleFieldUtils.generateBattleField();
        this.levelModel.enemy.battleField = BattleFieldUtils.generateBattleField();
        this.drawHeroField();
        this.drawEnemyField();
    }

    public destroy(): void {
        /*  */
    }

    private drawHeroField(): void {
        let grid:Grid = this.levelModel.hero.battleField.grid;

        for (let row = 0; row < grid.maxRows; row++) {
            for (let col = 0; col < grid.maxCols; col++) {
                let tileId = grid.getTileId(col, row);
                let display: TileDisplay = new TileDisplay(tileId);
                display.x = MagicValues.TILE_WIDTH * col;
                display.y = MagicValues.TILE_HEIGHT * row;
                this.view.hero.addChild(display);
                /* this._displays.set(tileId, display); */
            }
        }
    }
    private drawEnemyField(): void {
        let grid:Grid = this.levelModel.enemy.battleField.grid;

        for (let row = 0; row < grid.maxRows; row++) {
            for (let col = 0; col < grid.maxCols; col++) {
                let tileId = grid.getTileId(col, row);
                let display: TileDisplay = new TileDisplay(tileId);
                display.x = MagicValues.TILE_WIDTH * col;
                display.y = MagicValues.TILE_HEIGHT * row;
                this.view.enemy.addChild(display);
                /* this._displays.set(tileId, display); */
            }
        }
    }
}
