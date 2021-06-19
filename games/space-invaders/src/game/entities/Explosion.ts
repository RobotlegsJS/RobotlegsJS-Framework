import { ExplosionDisplay } from "../displays/ExplosionDisplay";
import { Entity } from "./Entity";

export class Explosion extends Entity {
    public remove: Boolean;
    private _count: number = 0;

    public constructor(typeID: number = Entity.EXPLOSION) {
        super(typeID);
    }

    public update(): void {
        if (this._count === 1) {
            this.remove = true;
            return;
        }
        this._count++;
        (<ExplosionDisplay>this.display).nextFrame();
    }

    public reset(): void {
        this._count = 0;
        this.remove = false;
        (<ExplosionDisplay>this.display).firstFrame();
    }
}
