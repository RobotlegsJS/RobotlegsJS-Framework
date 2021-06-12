import { ExplosionDisplay } from "./../displays/ExplosionDisplay";
import { Entity } from "./Entity";

export class Explosion extends Entity {
    public remove: Boolean;
    private count = 0;

    constructor(typeID: number = Entity.EXPLOSION) {
        super(typeID);
    }
    public update(): void {
        if (this.count === 1) {
            this.remove = true;
            return;
        }
        this.count++;
        (<ExplosionDisplay>this.display).nextFrame();
    }
    public reset(): void {
        this.count = 0;
        this.remove = false;
        (<ExplosionDisplay>this.display).firstFrame();
    }
}
