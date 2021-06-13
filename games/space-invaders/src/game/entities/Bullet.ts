import { Entity } from "./Entity";

export class Bullet extends Entity {
    public static ENEMY: number = 0;
    public static PlAYER: number = 1;

    public target: number = Bullet.ENEMY;

    public constructor(typeID: number = Entity.BULLET) {
        super(typeID);
    }
}
