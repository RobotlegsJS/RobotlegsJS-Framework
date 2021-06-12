import { Ship } from "./../models/Ship";
import { Tile } from "./../models/Tile";
import { BattleField } from "./../models/BattleField";
export class BattleFieldUtils {
    public static generateBattleField(): BattleField {
        const battleField: BattleField = new BattleField();
        this.addRandomShipToBattleField(battleField, 2);
        this.addRandomShipToBattleField(battleField, 3);
        this.addRandomShipToBattleField(battleField, 3);
        this.addRandomShipToBattleField(battleField, 4);
        this.addRandomShipToBattleField(battleField, 5);
        return battleField;
    }

    public static addRandomShipToBattleField(battleField: BattleField, size: number): void {
        let direction = Math.floor(Math.random() * 2) ? "horizontal" : "vertical";
        let maxCols = battleField.grid.maxCols;
        let maxRows = battleField.grid.maxRows;
        if (direction === "horizontal") {
            maxCols = maxCols - size;
        } else {
            maxRows = maxRows - size;
        }
        let col = Math.floor(Math.random() * maxCols);
        let row = Math.floor(Math.random() * maxRows);
        let tiles: Tile[] = new Array<Tile>();
        for (let i = 0; i < size; i++) {
            let tile = new Tile(col, row);
            if (direction === "horizontal") {
                tile.col = col + i;
            } else {
                tile.row = row + i;
            }
            tiles.push(tile);

            if (!this.isTileEmpty(battleField, tile.col, tile.row)) {
                this.addRandomShipToBattleField(battleField, size);
                return;
            }
        }
        this.addShipByTiles(battleField, tiles);
    }

    public static addShipByTiles(battleField: BattleField, tiles: Tile[]): void {
        let ship: Ship = new Ship(tiles.length);
        ship.setTiles(tiles);
        battleField.addShip(ship);
    }

    public static isTileEmpty(battleField: BattleField, col, row): boolean {
        return battleField.grid.getTileId(col, row) === Tile.BLANKED;
    }

    public static getValidTileList(battleField: BattleField): Tile[] {
        let tiles = new Array<Tile>();
        for (let row = 0; row < battleField.grid.maxRows; row++) {
            for (let col = 0; col < battleField.grid.maxCols; col++) {
                if (battleField.grid.getTileId(col, row) !== Tile.HITTED) {
                    tiles.push(new Tile(col, row));
                }
            }
        }
        return tiles;
    }
}
