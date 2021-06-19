import { Sprite } from "pixi.js";

export class Entity {
    public static BULLET: number = 11;
    public static CANNON: number = 10;
    public static ENEMY_1: number = 1;
    public static ENEMY_2: number = 2;
    public static ENEMY_3: number = 3;
    public static EXPLOSION: number = 12;

    public x: number;
    public y: number;
    public display: Sprite;

    private _typeID: number;

    public get typeID(): number {
        return this._typeID;
    }

    public constructor(typeID: number) {
        this._typeID = typeID;
    }

    public applyPosition(): void {
        this.display.x = this.x;
        this.display.y = this.y;
    }
}
