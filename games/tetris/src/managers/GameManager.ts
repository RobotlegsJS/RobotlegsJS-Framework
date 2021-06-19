import { inject, injectable } from "@robotlegsjs/core";
import { Grid } from "../models/Grid";
import { TileGroup } from "../models/TileGroup";
import { GameService } from "../services/GameService";
import { Tile } from "./../models/Tile";

@injectable()
export class GameManager {
    @inject(GameService)
    private _gameService: GameService;

    private _grid: Grid;
    private _currentPiece: TileGroup;
    private _tilesToUpdate: Tile[];
    private _tilesToRemove: Tile[];

    public createEmpytGrid(cols: number = 10, rows: number = 20): void {
        this._grid = new Grid(cols, rows);
        this._tilesToUpdate = [];
        this._tilesToRemove = [];
    }

    public addPiece(currentPiece: TileGroup): void {
        this._currentPiece = currentPiece;
        this._currentPiece.moveHorizontal(4);
        this._addTilesToUpdate(this._currentPiece.tiles);

        this._validateGameOver();
    }

    public tickUpdate(): void {
        this.moveCurrentPieceDown();
    }

    public rotateCurrentPiece(): void {
        this._currentPiece.rotate();

        if (this._isMovementValid() === false) {
            this._currentPiece.rollback();
        } else {
            this._addTilesToUpdate(this._currentPiece.tiles);
        }
    }

    public getTilesToUpdate(): Tile[] {
        return this._tilesToUpdate;
    }

    public getTilesToRemove(): Tile[] {
        return this._tilesToRemove;
    }

    public moveCurrentPieceLeft(): void {
        this._currentPiece.moveHorizontal(-1);

        if (this._isMovementValid() === false) {
            this._currentPiece.rollbackX();
        } else {
            this._addTilesToUpdate(this._currentPiece.tiles);
        }
    }

    public moveCurrentPieceRight(): void {
        this._currentPiece.moveHorizontal(1);

        if (this._isMovementValid() === false) {
            this._currentPiece.rollbackX();
        } else {
            this._addTilesToUpdate(this._currentPiece.tiles);
        }
    }

    public moveCurrentPieceDown(): void {
        this._currentPiece.moveVertical();

        if (this._isMovementValid() === false) {
            this._currentPiece.rollbackY();

            const tiles: Tile[] = this._currentPiece.tiles;

            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i: number = 0; i < tiles.length; i++) {
                this._grid.setTile(tiles[i], tiles[i].col, tiles[i].row);
            }

            this._solveCompletedRows();
            this._gameService.getNextPiece();
        } else {
            this._addTilesToUpdate(this._currentPiece.tiles);
        }
    }

    private _solveCompletedRows(): void {
        let linesRemoved = 0;

        const updateTiles: Tile[] = [];
        let removeTiles: Tile[] = [];

        let isToRemove: boolean;
        let hasToUpdate: boolean;

        let tile: Tile;

        for (let row = this._grid.maxRows - 1; row > 0; row--) {
            isToRemove = true;
            for (let col = 0; col < this._grid.maxCols; col++) {
                tile = this._grid.getTile(col, row);

                if (tile && hasToUpdate) {
                    tile.setPosition(col, row);
                    this._tilesToUpdate.push(tile);
                }
                isToRemove = isToRemove && tile !== null;
            }
            if (isToRemove) {
                removeTiles = removeTiles.concat(this._grid.removeRow(row));
                hasToUpdate = true;
                row++;
                linesRemoved++;
            }
        }

        if (linesRemoved > 0) {
            this._gameService.increasePoints(linesRemoved);
        }

        this._tilesToUpdate = this._tilesToUpdate.concat(updateTiles);
        this._tilesToRemove = this._tilesToRemove.concat(removeTiles);
    }

    private _isMovementValid(): boolean {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this._currentPiece.tiles.length; i++) {
            const tile = this._currentPiece.tiles[i];
            if (this._isOffBounds(tile) || this._isNotEmptyTile(tile)) {
                return false;
            }
        }
        return true;
    }

    private _addTilesToUpdate(tiles: Tile[]): void {
        this._tilesToUpdate = this._tilesToUpdate.concat(tiles);
    }

    private _validateGameOver(): void {
        if (this._isMovementValid() === false) {
            this._gameService.gameOver();
        }
    }

    private _isNotEmptyTile(tile: Tile): boolean {
        return !this._grid.isEmptyTile(tile.col, tile.row);
    }

    private _isOffBounds(tile: Tile): boolean {
        return (
            tile.col < 0 ||
            tile.col >= this._grid.maxCols ||
            tile.row < 0 ||
            tile.row >= this._grid.maxRows
        );
    }
}
