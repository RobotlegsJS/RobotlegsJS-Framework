export class Tile {
    public static HITTED: number = -1;
    public static BLANKED: number = 0;

    public col: number;
    public row: number;

    constructor(col: number = 0, row: number = 0) {
        this.col = col;
        this.row = row;
    }
}
