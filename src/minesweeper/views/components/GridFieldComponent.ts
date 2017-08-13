import { TileDisplay } from "./TileDisplay";
import { MagicValues } from "../../utils/MagicValues";
import { GridData } from "../../game/models/GridData";

import { ViewPortSize } from "./../../utils/ViewPortSize";
import { Container, Graphics } from "pixi.js";

export class GridFieldComponent extends Container {

    constructor() {
        super();

        this.setupValues();
    }

    public setupGrid(grid: GridData): void {
        let gridSize = grid.maxCols * MagicValues.TILE_WIDTH;
        let newX = (ViewPortSize.MAX_WIDTH - gridSize) * .5;
        this.x = newX + (MagicValues.TILE_WIDTH * .5);
    }

    private setupValues(): void {
        this.x = 10 + (MagicValues.TILE_WIDTH * .5);
        this.y = 130 + (MagicValues.TILE_HEIGHT * .5);
    }
}
