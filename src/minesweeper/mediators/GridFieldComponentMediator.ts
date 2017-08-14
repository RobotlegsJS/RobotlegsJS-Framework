import { MagicValues } from "./../utils/MagicValues";
import { TileDisplay } from "./../views/components/TileDisplay";
import { Cell } from "./../game/models/Cell";
import { Sprite } from "pixi.js";
import { GameEvent } from "./../events/GameEvent";
import { GameManager } from "./../game/managers/GameManager";
import { LevelModel } from "./../game/models/LevelModel";
import { GameService } from "./../services/GameService";
import { GridFieldComponent } from "./../views/components/GridFieldComponent";

import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class GridFieldComponentMediator extends Mediator<GridFieldComponent> {

    @inject(LevelModel)
    public levelModel: LevelModel;

    @inject(GameManager)
    public gameManager: GameManager;

    @inject(GameService)
    public gameService: GameService;

    private _displays: Map<Cell, TileDisplay>;

    public initialize(): void {
        this._displays = new Map<Cell, TileDisplay>();
        this.view.interactive = true;

        this.generateGrid();
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.UPDATE_GRID, this.onUpdate, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.CLEAR_GRID, this.onClear, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.GAME_OVER_COMMAND, this.onGameOver, this);
    }

    public onClear(e: any): void {
        this.view.removeChildren();
    }

    public onUpdate(e: any): void {
        for (let i = 0; i < this.levelModel.update.length; i++) {
            let cell = this.levelModel.update[i];
            let display = this._displays.get(cell);
            display.show();
        }
    }

    public onGameOver(e: any): void {
        for (let i = 0; i < this.levelModel.mines.length; i++) {
            let cell = this.levelModel.mines[i];
            let display = this._displays.get(cell);
            display.show();
        }
    }

    public generateGrid(): void {
        this.view.setupGrid(this.levelModel.grid);

        for (let row = 0; row < this.levelModel.grid.maxRows; row++) {
            for (let col = 0; col < this.levelModel.grid.maxCols; col++) {
                let cell: Cell = this.levelModel.grid.getCell(col, row);
                let display: TileDisplay = new TileDisplay(cell);
                display.x = MagicValues.TILE_WIDTH * col;
                display.y = MagicValues.TILE_HEIGHT * row;
                this.view.addChild(display);
                this._displays.set(cell, display);
            }
        }
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }
}
