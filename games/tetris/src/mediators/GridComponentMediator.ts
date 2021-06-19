import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { Sprite } from "pixi.js";
import { GameEvent } from "../events/GameEvent";
import { GameManager } from "../managers/GameManager";
import { GameModel } from "../models/GameModel";
import { Tile } from "../models/Tile";
import { TileGroup } from "../models/TileGroup";
import { GameUtils } from "../utils/GameUtils";
import { PixiFactory } from "../utils/PixiFactory";
import { TilePool } from "../utils/TilePool";
import { GridComponent } from "../views/components/GridComponent";
import { TileDisplay } from "../views/components/TileDisplay";

@injectable()
export class GridComponentMediator extends Mediator<GridComponent> {
    @inject(GameModel)
    private _model: GameModel;

    @inject(GameManager)
    private _gameManager: GameManager;

    private _displays: Map<Tile, Sprite>;

    private _tick: number;

    private _paused: boolean;

    public initialize(): void {
        this._paused = false;

        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.UPDATE_NEXT_PIECE,
            this._onUpdateNextPiece,
            this
        );
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.RESUME, this._onResumeGame, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.PAUSE, this._onPauseGame, this);
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.GAME_OVER,
            this._onGameOVer,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.CLEAR_GRID,
            this._onClearGrid,
            this
        );
    }

    public destroy(): void {
        this._paused = true;
        this.eventMap.unmapListeners();
        document.removeEventListener("keydown", this._onKeyDownMovement.bind(this));
    }

    private _addPiece(): void {
        this._gameManager.addPiece(this._model.currentPiece);

        let display: TileDisplay;
        const group: TileGroup = this._model.currentPiece;

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < group.tiles.length; i++) {
            display = PixiFactory.getTileDisplay(group.typeId);
            this._addDisplayToStage(group.tiles[i], display);
            GameUtils.updateDisplayPositionByTile(group.tiles[i], display);
        }
    }

    private _addDisplayToStage(tile: Tile, display: Sprite): void {
        this.view.addChild(display);
        this._displays.set(tile, display);
    }

    private _updateDisplaysPositions(tiles: Tile[]): void {
        let tile: Tile;
        while (tiles.length > 0) {
            tile = tiles.pop();
            GameUtils.updateDisplayPositionByTile(tile, this._displays.get(tile));
        }
    }

    private _removeDisplays(tiles: Tile[]): void {
        let tile: Tile;
        let tileDisplay: TileDisplay;

        while (tiles.length > 0) {
            tile = tiles.pop();
            tileDisplay = <TileDisplay>this._displays.get(tile);
            tileDisplay.removeFromParent();

            TilePool.back(tileDisplay);

            this._displays.delete(tile);
        }
    }

    private _updateDisplays(): void {
        this._updateDisplaysPositions(this._gameManager.getTilesToUpdate());
        this._removeDisplays(this._gameManager.getTilesToRemove());
    }

    private _onUpdateNextPiece(e: GameEvent): void {
        this._addPiece();
    }

    private _onClearGrid(e: any): void {
        this._displays = new Map<Tile, Sprite>();
        this._tick = 0;

        this._gameManager.createEmpytGrid();
        this.view.clear();
    }

    private _onGameOVer(e: any): void {
        this._paused = true;
        document.removeEventListener("keydown", this._onKeyDownMovement.bind(this));
    }

    private _onPauseGame(e: any): void {
        this._paused = true;
        document.removeEventListener("keydown", this._onKeyDownMovement.bind(this));
    }

    private _onResumeGame(e: any): void {
        this._paused = false;
        document.addEventListener("keydown", this._onKeyDownMovement.bind(this));
        window.requestAnimationFrame(this._onEnterFrame.bind(this));
    }

    private _onKeyDownMovement(e: KeyboardEvent): void {
        if (e.keyCode === 37 || e.keyCode === 65) {
            this._gameManager.moveCurrentPieceLeft();
        } else if (e.keyCode === 39 || e.keyCode === 68) {
            this._gameManager.moveCurrentPieceRight();
        } else if (e.keyCode === 38 || e.keyCode === 87) {
            this._gameManager.rotateCurrentPiece();
        } else if (e.keyCode === 40 || e.keyCode === 83) {
            this._gameManager.moveCurrentPieceDown();
        }
        this._updateDisplays();
    }

    private _onEnterFrame(e: any): void {
        if (this._paused === true) {
            return;
        }

        this._tick++;

        if (this._tick > GameUtils.getCurrentSpeed(this._model.level)) {
            this._gameManager.tickUpdate();
            this._tick = 0;
        }

        this._updateDisplays();
        window.requestAnimationFrame(this._onEnterFrame.bind(this));
    }
}
