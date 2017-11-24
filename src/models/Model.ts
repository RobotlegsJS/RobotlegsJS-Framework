import { injectable } from "@robotlegsjs/core";

@injectable()
export class Model {
    public attempts: number;
    public pressed: boolean;
    public prizes: string[];

    public posX: number;
    public posY: number;

    constructor() {
        this.attempts = 5;
        this.pressed = false;
    }
    public decreaseAttemps(): void {
        this.attempts -= 1;
    }
}
