export class LevelData {
    public cols: number;
    public rows: number;
    public map: number[][];

    public constructor(cols: number, rows: number) {
        this.cols = cols;
        this.rows = rows;
    }
}
