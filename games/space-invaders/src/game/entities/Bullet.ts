import { Entity } from "./Entity";

export class Bullet extends Entity {
    public static ENEMY = 0;
    public static PlAYER = 1;

    public target = Bullet.ENEMY;

    constructor(typeID: number = Entity.BULLET) {
        super(typeID);
    }
}
