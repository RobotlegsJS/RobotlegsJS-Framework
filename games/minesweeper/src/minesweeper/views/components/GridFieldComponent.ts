import { Container } from "pixi.js";
import { GridData } from "../../game/models/GridData";
import { MagicValues } from "../../utils/MagicValues";
import { PixiFactory } from "../../utils/PixiFactory";
import { ViewPortSize } from "../../utils/ViewPortSize";

export class GridFieldComponent extends Container {
    public constructor() {
        super();
    }

    public setupGridPosition(grid: GridData): void {
        this.removeChildren();

        const gridHeight = grid.maxRows * MagicValues.TILE_HEIGHT;
        const gridWidth = grid.maxCols * MagicValues.TILE_WIDTH;
        this.y = 130 + (ViewPortSize.MAX_HEIGHT - 130 - gridHeight) * 0.5;
        this.x = (ViewPortSize.MAX_WIDTH - gridWidth) * 0.5 + MagicValues.TILE_WIDTH * 0.5;

        const gridBackground = PixiFactory.getColorBox(gridWidth + 6, gridHeight + 6, 0x000000);
        gridBackground.x = -(MagicValues.TILE_WIDTH * 0.5) - 3;
        gridBackground.y = -(MagicValues.TILE_HEIGHT * 0.5) - 3;
        this.addChild(gridBackground);
    }
}
