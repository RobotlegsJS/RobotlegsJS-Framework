import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { Sprite } from "pixi.js";
import { GameEvent } from "../events/GameEvent";
import { GameModel } from "../models/GameModel";
import { Tile } from "../models/Tile";
import { PixiFactory } from "../utils/PixiFactory";
import { NextPieceComponent } from "../views/components/NextPieceComponent";

@injectable()
export class NextPieceComponentMediator extends Mediator<NextPieceComponent> {
    @inject(GameModel)
    private _model: GameModel;

    public initialize(): void {
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.UPDATE_NEXT_PIECE,
            this.game_updateNextPiece,
            this
        );
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private game_updateNextPiece(e: any): void {
        this.view.removeChildren();

        let display: Sprite;

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this._model.nextPiece.tiles.length; i++) {
            display = this._createDisplay(this._model.nextPiece.typeId);
            display.x = (this._model.nextPiece.tiles[i].col + 2) * Tile.TILE_WIDTH;
            display.y = this._model.nextPiece.tiles[i].row * Tile.TILE_WIDTH;
            display.anchor.x = 0.5;
            this.view.addChild(display);
        }
    }

    private _createDisplay(assetId: number): Sprite {
        return PixiFactory.getTileDisplay(assetId);
    }
}
