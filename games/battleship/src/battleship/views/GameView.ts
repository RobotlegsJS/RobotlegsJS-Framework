import { Colors } from "../utils/Colors";
import { AtlasKeys } from "./../utils/AtlasKeys";
import { TweenLite } from "gsap";
import { CustomButton } from "./components/CustomButton";
import { EnemyComponent } from "./components/EnemyComponent";
import { Player } from "./../game/models/Player";
import { MagicValues } from "../utils/MagicValues";
import { HeroComponent } from "./components/HeroComponent";
import { PixiFactory } from "./../utils/PixiFactory";

import { Container } from "pixi.js";

export class GameView extends Container {
    private _hero: HeroComponent;
    private _enemy: EnemyComponent;

    private _pauseButton: CustomButton;
    public get pauseButton(): CustomButton {
        return this._pauseButton;
    }
    constructor() {
        super();
        this.createBackground();
        this.createButtons();
    }

    public destroy(): void {
        this.removeChild(this._hero);
        this.removeChild(this._enemy);

        this._hero = null;
        this._enemy = null;
    }

    public createComponents(): void {
        this._hero = new HeroComponent();
        this.addChildAt(this._hero, 1);

        this._enemy = new EnemyComponent();
        this._enemy.y = MagicValues.HALF_HEIGHT - 20;
        this.addChild(this._enemy);
    }

    public animationIn(): void {
        let tweenButton = new TweenLite(this.pauseButton, 0.1, { y: 50, delay: 0.2 });
    }
    private createBackground(): void {
        this.addChild(PixiFactory.getColorBackground(Colors.GAME_BACKGROUND));
    }
    private createButtons(): void {
        this._pauseButton = PixiFactory.getIconButton(AtlasKeys.ICON_PAUSE);
        this._pauseButton.x = MagicValues.MAX_WIDTH - 50;
        this._pauseButton.y = -100;
        this.addChild(this._pauseButton);
    }
}
