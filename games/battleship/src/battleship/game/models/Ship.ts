import { Tile } from "./Tile";
export class Ship {
    public id: number;
    private _hp: number;
    private _size: number;
    private _tiles: Tile[];

    public get hp(): number {
        return this._hp;
    }

    public get size(): number {
        return this._size;
    }

    public get tiles(): Tile[] {
        return this._tiles;
    }

    constructor(size: number) {
        this._hp = size;
        this._size = size;
        this._tiles = new Array<Tile>();
    }

    public setTiles(tiles: Tile[]): void {
        this._tiles = tiles;
        this._hp = tiles.length;
        this._size = tiles.length;
    }

    public decreaseHP(): void {
        this._hp = Math.max(0, this._hp - 1);
    }
}
