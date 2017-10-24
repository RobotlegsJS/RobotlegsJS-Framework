import { Player } from "./Player";
import { injectable } from "@robotlegsjs/core";
@injectable()
export class LevelModel {
    private _hero: Player;
    private _enemy: Player;
    public turn: string;

    public get hero(): Player {
        return this._hero;
    }

    public get enemy(): Player {
        return this._enemy;
    }

    constructor() {
        this._hero = new Player(Player.HUMAN);
        this._enemy = new Player(Player.BOT);
        this.turn = Player.HUMAN;
    }
}
