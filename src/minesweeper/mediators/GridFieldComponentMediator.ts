import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { TweenLite } from "gsap";

import { GameEvent } from "./../events/GameEvent";
import { GameManager } from "./../game/managers/GameManager";
import { Cell } from "./../game/models/Cell";
import { LevelModel } from "./../game/models/LevelModel";
import { GameService } from "./../services/GameService";
import { MagicValues } from "./../utils/MagicValues";
import { GridFieldComponent } from "./../views/components/GridFieldComponent";
import { TileDisplay } from "./../views/components/TileDisplay";

@injectable()
export class GridFieldComponentMediator extends Mediator<GridFieldComponent> {
    @inject(LevelModel) public levelModel: LevelModel;
    @inject(GameManager) public gameManager: GameManager;
    @inject(GameService) public gameService: GameService;

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
            const cell = this.levelModel.update[i];
            const display = this._displays.get(cell);
            display.show();
        }
    }
    public onGameOver(e: any): void {
        for (let i = 0; i < this.levelModel.mines.length; i++) {
            const cell = this.levelModel.mines[i];
            const display = this._displays.get(cell);
            display.show();
        }
    }
    public generateGrid(): void {
        this.view.setupGridPosition(this.levelModel.grid);
        this.view.alpha = 0;

        for (let row = 0; row < this.levelModel.grid.maxRows; row++) {
            for (let col = 0; col < this.levelModel.grid.maxCols; col++) {
                const cell: Cell = this.levelModel.grid.getCell(col, row);
                const display: TileDisplay = new TileDisplay(cell);
                display.x = MagicValues.TILE_WIDTH * col;
                display.y = MagicValues.TILE_HEIGHT * row;
                this.view.addChild(display);
                this._displays.set(cell, display);
            }
        }

        const tweenView = new TweenLite(this.view, 0.3, { alpha: 1 });
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
}
