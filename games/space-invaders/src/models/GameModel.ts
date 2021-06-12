import { injectable } from "@robotlegsjs/core";

@injectable()
export class GameModel {
    public hiScore: number;
    public score: number;
    public level: number;
    public lives: number;

    public status: String;

    constructor() {
        this.hiScore = 0;
        this.clear();
    }

    public clear(): void {
        this.level = 1;
        this.lives = 3;
        this.score = 0;
    }
}
