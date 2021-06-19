export class Tile {
    public static TILE_WIDTH: number = 36;
    public static TILE_HEIGHT: number = 36;

    public col: number;
    public row: number;

    public constructor(col: number = 0, row: number = 0) {
        this.col = col;
        this.row = row;
    }
}
