import { Sprite } from "pixi.js";

export class Entity {
    public static BULLET = 11;
    public static CANNON = 10;
    public static ENEMY_1 = 1;
    public static ENEMY_2 = 2;
    public static ENEMY_3 = 3;
    public static EXPLOSION = 12;

    public x: number;
    public y: number;
    public display: Sprite;

    private _typeID: number;
    public get typeID(): number {
        return this._typeID;
    }
    constructor(typeID: number) {
        this._typeID = typeID;
    }
    public applyPosition(): void {
        this.display.x = this.x;
        this.display.y = this.y;
    }
}
