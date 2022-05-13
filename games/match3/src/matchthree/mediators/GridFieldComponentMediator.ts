import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { TweenLite } from "gsap";
import { Sprite } from "pixi.js";
import { GameEvent } from "../events/GameEvent";
import { GameManager } from "../game/managers/GameManager";
import { LevelModel } from "../game/models/LevelModel";
import { PieceData } from "../game/models/PieceData";
import { Tile } from "../game/models/Tile";
import { TouchPhase } from "../game/models/TouchPhase";
import { AnimationUtils } from "../game/utils/AnimationUtils";
import { PixiSpritePool } from "../game/utils/PieceDisplayPool";
import { PieceUtils } from "../game/utils/PieceUtils";
import { GameService } from "../services/GameService";
import { GridFieldComponent } from "../views/components/GridFieldComponent";

@injectable()
export class GridFieldComponentMediator extends Mediator<GridFieldComponent> {
    @inject(LevelModel)
    private _levelModel: LevelModel;

    @inject(GameManager)
    private _gameManager: GameManager;

    @inject(GameService)
    private _gameService: GameService;

    private _displays: Map<PieceData, Sprite>;

    public initialize(): void {
        this._displays = new Map<PieceData, Sprite>();
        this.view.generateGrid(this._levelModel.maxCols, this._levelModel.maxRows);

        this.view.interactive = true;

        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.CLEAR_GRID,
            this._onClearGridHandlerGame,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.UPDATE_GRID,
            this._onUpdateGridHandlerGame,
            this
        );

        this.eventMap.on(this.view, "mousedown", this._onSelectPiecesHandlerView, this);
        this.eventMap.on(this.view, "mouseup", this._onSelectPiecesHandlerView, this);

        this._gameManager.nextStep();
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    public updateDisplays(): void {
        if (this._levelModel.toRemove.length > 0) {
            this.removeDisplays();
        } else if (this._levelModel.toAdd.length > 0) {
            this.addDisplays();
        } else if (this._levelModel.toMove.length > 0) {
            this.moveDisplays();
        }
    }

    public addDisplays(): void {
        let piece: PieceData;
        while (this._levelModel.toAdd.length > 0) {
            piece = this._levelModel.toAdd.pop();
            if (this._displays.get(piece)) {
                continue;
            }
            const assetId: string = PieceUtils.getAssetId(piece.pieceId, piece.pieceType);
            piece.display = PixiSpritePool.getImage(assetId);
            piece.updateDisplayPosition();
            this.addDisplayToStage(piece);
        }
        this._gameManager.nextStep();
    }

    public removeDisplays(): void {
        let piece: PieceData;
        const animationList: TweenLite[] = [];

        while (this._levelModel.toRemove.length > 0) {
            piece = this._levelModel.toRemove.pop();

            this._levelModel.removePiece(piece);
            this._displays.delete(piece);

            animationList.push(AnimationUtils.createRemoveTween(piece, this.destroyDisplay));
        }
        AnimationUtils.applyAnimation(animationList, this._gameManager.nextStep);
    }

    public destroyDisplay(display: Sprite): void {
        PixiSpritePool.back(display);
        display.parent.removeChild(display);
    }

    public moveDisplays(): void {
        const animationList: TweenLite[] = [];

        while (this._levelModel.toMove.length > 0) {
            animationList.push(AnimationUtils.createMoveTween(this._levelModel.toMove.pop()));
        }
        AnimationUtils.applyAnimation(animationList, this.onComplete);
    }

    public onComplete = (ob: GridFieldComponentMediator = this): void => {
        ob._gameManager.nextStep();
    };

    public addDisplayToStage(piece: PieceData): void {
        this.view.addChild(piece.display);
        this._displays.set(piece, piece.display);
    }

    public removeDisplayFromStage(piece: PieceData): void {
        piece.display.parent.removeChild(piece.display);
        this._displays.delete(piece);
    }

    private _onSelectPiecesHandlerView(e: any): void {
        if (
            this._levelModel.toMove.length ||
            this._levelModel.toRemove.length ||
            this._levelModel.toAdd.length
        ) {
            return;
        }

        if (e.type === TouchPhase.BEGAN || e.type === TouchPhase.ENDED) {
            let col;
            let row;
            const touchPhase = e.type;
            if (touchPhase === TouchPhase.BEGAN) {
                col = Math.floor(
                    (e.data.global.x - (this.view.x - Tile.TILE_WIDTH * 0.5)) / Tile.TILE_WIDTH
                );
                row = Math.floor(
                    (e.data.global.y - (this.view.y - Tile.TILE_HEIGHT * 0.5)) / Tile.TILE_HEIGHT
                );

                this._gameService.swapPiecesCommand(TouchPhase.BEGAN, col, row);
            } else if (touchPhase === TouchPhase.ENDED) {
                col = Math.floor(
                    (e.data.global.x - (this.view.x - Tile.TILE_WIDTH * 0.5)) / Tile.TILE_WIDTH
                );
                row = Math.floor(
                    (e.data.global.y - (this.view.y - Tile.TILE_HEIGHT * 0.5)) / Tile.TILE_HEIGHT
                );

                this._gameService.swapPiecesCommand(TouchPhase.ENDED, col, row);
            }
        }
    }

    private _onClearGridHandlerGame(e: any): void {
        this._displays.forEach((display: Sprite, piece: PieceData, map: Map<PieceData, Sprite>) => {
            this.removeDisplayFromStage(piece);
        }, this);
    }

    private _onUpdateGridHandlerGame(e: any): void {
        this.updateDisplays();
    }
}
