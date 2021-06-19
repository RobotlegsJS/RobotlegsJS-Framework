import { TweenLite } from "gsap";
import { Container } from "pixi.js";
import { AtlasKeys } from "../utils/AtlasKeys";
import { Colors } from "../utils/Colors";
import { MagicValues } from "../utils/MagicValues";
import { PixiFactory } from "../utils/PixiFactory";
import { CustomButton } from "./components/CustomButton";
import { EnemyComponent } from "./components/EnemyComponent";
import { HeroComponent } from "./components/HeroComponent";

export class GameView extends Container {
    private _hero: HeroComponent;
    private _enemy: EnemyComponent;

    private _pauseButton: CustomButton;

    public get pauseButton(): CustomButton {
        return this._pauseButton;
    }

    public constructor() {
        super();
        this._createBackground();
        this._createButtons();
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let tweenButton = new TweenLite(this.pauseButton, 0.1, { y: 50, delay: 0.2 });
    }

    private _createBackground(): void {
        this.addChild(PixiFactory.getColorBackground(Colors.GAME_BACKGROUND));
    }

    private _createButtons(): void {
        this._pauseButton = PixiFactory.getIconButton(AtlasKeys.ICON_PAUSE);
        this._pauseButton.x = MagicValues.MAX_WIDTH - 50;
        this._pauseButton.y = -100;
        this.addChild(this._pauseButton);
    }
}
