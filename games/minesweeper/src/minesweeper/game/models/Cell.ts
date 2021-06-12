export class Cell {
    public isFlag: boolean;
    private _value: number;
    private _isMine: boolean;

    private _col: number;
    private _row: number;

    public get col(): number {
        return this._col;
    }

    public get row(): number {
        return this._row;
    }

    public get value(): number {
        return this._value;
    }

    constructor(col: number, row: number) {
        this._value = 0;
        this._isMine = false;
        this.isFlag = false;

        this._col = col;
        this._row = row;
    }
    public increaseValue(): void {
        this._value += 1;
    }
    public decreaseValue(): void {
        this._value = Math.max(this.value - 1, 0);
    }
    public setCellAsAMine() {
        this._isMine = true;
    }
    public isMine(): boolean {
        return this._isMine;
    }
}
