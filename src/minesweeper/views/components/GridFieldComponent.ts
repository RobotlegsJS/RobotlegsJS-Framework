import { TileDisplay } from "./TileDisplay";
import { GridData } from "../../game/models/GridData";
import { MagicValues } from "../../utils/MagicValues";
import { PixiFactory } from "../../utils/PixiFactory";
import { ViewPortSize } from "./../../utils/ViewPortSize";

import { Container, Graphics } from "pixi.js";

export class GridFieldComponent extends Container {

    constructor() {
        super();
    }

    public setupGridPosition(grid: GridData): void {
        this.removeChildren();

        let gridHeight = grid.maxRows * MagicValues.TILE_HEIGHT;
        let gridWidth = grid.maxCols * MagicValues.TILE_WIDTH;
        this.y = 130 + ((ViewPortSize.MAX_HEIGHT - 130) - gridHeight) * .5;
        this.x = (ViewPortSize.MAX_WIDTH - gridWidth) * .5 + (MagicValues.TILE_WIDTH * .5);

        let gridBackground = PixiFactory.getColorBox(gridWidth + 6, gridHeight + 6, 0x000000);
        gridBackground.x = -(MagicValues.TILE_WIDTH * .5) - 3;
        gridBackground.y = -(MagicValues.TILE_HEIGHT * .5) - 3;
        this.addChild(gridBackground);
    }
}
