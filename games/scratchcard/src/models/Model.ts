import { injectable } from "@robotlegsjs/core";

@injectable()
export class Model {
    public attempts: number;
    public pressed: boolean;
    public prizes: string[];

    public posX: number;
    public posY: number;

    public feedback: string;
    public matchedPrizes: string[];

    public constructor() {
        this.attempts = 25;
        this.pressed = false;
    }

    public decreaseAttemps(): void {
        this.attempts -= 1;
    }
}
