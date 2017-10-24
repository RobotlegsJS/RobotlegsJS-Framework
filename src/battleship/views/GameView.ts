import { Player } from "./../game/models/Player";
import { MagicValues } from "../utils/MagicValues";
import { PlayerComponent } from "./components/PlayerComponent";
import { PixiFactory } from "./../utils/PixiFactory";

import { Container } from "pixi.js";

export class GameView extends Container {
    private _hero: PlayerComponent;
    private _enemy: PlayerComponent;

    constructor() {
        super();
        this.createBackground();
    }

    public destroy(): void {
        this.removeChild(this._hero);
        this.removeChild(this._enemy);

        this._hero = null;
        this._enemy = null;
    }

    public createComponents(): void {
        this._hero = new PlayerComponent(Player.HUMAN);
        this.addChild(this._hero);

        this._enemy = new PlayerComponent(Player.BOT);
        this._enemy.y = MagicValues.HALF_HEIGHT;
        this.addChild(this._enemy);
    }

    private createBackground(): void {
        this.addChild(PixiFactory.getColorBackground());
    }
}
