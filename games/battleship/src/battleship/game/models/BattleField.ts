import { Tile } from "./Tile";
import { Ship } from "./Ship";
import { Grid } from "./Grid";
export class BattleField {
    public grid: Grid;
    public ships: Ship[];
    public listTile: Map<{ col; row }, any>;

    constructor() {
        this.grid = new Grid();
        this.ships = new Array<Ship>();
        this.listTile = new Map<{ col; row }, any>();
    }

    public addShip(ship: Ship): void {
        this.ships.push(ship);
        ship.id = this.ships.length;
        for (let tile of ship.tiles) {
            this.grid.setTileId(ship.id, tile.col, tile.row);
        }
    }
    public attackTile(col: number, row: number): number {
        let tileId = this.grid.getTileId(col, row);
        this.grid.setTileId(Tile.HITTED, col, row);
        return tileId;
    }

    public decreaseShipHP(tileId: number): void {
        let ship = this.ships[tileId - 1];
        ship.decreaseHP();
    }

    public isGameOver(): boolean {
        for (let ship of this.ships) {
            if (ship.hp > 0) {
                return false;
            }
        }
        return true;
    }
}
