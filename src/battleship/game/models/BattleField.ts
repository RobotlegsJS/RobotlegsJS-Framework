import { Tile } from "./Tile";
import { Ship } from "./Ship";
import { Grid } from "./Grid";
export class BattleField {
    public grid: Grid;
    public ships: Ship[];

    constructor() {
        this.grid = new Grid();
        this.ships = new Array<Ship>();
    }

    public addShip(ship: Ship): void {
        this.ships.push(ship);
        let id = this.ships.length;
        for (let tile of ship.tiles) {
            this.grid.setTileId(id, tile.col, tile.row);
        }
    }

    public attackShip(col: number, row: number): Ship {
        let isBlanked = this.grid.getTileId(col, row) === Tile.BLANKED;
        let wasHitted = this.grid.getTileId(col, row) === Tile.HITTED;
        if (isBlanked || wasHitted) {
            return null;
        }

        let ship = this.ships[this.grid.getTileId(col, row) - 1];
        ship.decreaseHP();
        return ship;
    }
}
