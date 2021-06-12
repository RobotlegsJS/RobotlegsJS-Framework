import { Container } from "pixi.js";

import { Colors } from "./../utils/Colors";
import { PixiFactory } from "./../utils/PixiFactory";
import { BattleFieldComponent } from "./components/BattleFieldComponent";
import { HUDGameComponent } from "./components/HUDGameComponent";

export class GameView extends Container {
    private _battleField: BattleFieldComponent;

    private _hudComponent: HUDGameComponent;

    constructor() {
        super();

        this.createBackground();
    }
    public destroy(): void {
        this.removeChild(this._battleField);
        this.removeChild(this._hudComponent);

        this._battleField = null;
        this._hudComponent = null;
    }
    public createComponents(): void {
        this._battleField = new BattleFieldComponent();
        this.addChild(this._battleField);

        this._hudComponent = new HUDGameComponent();
        this.addChild(this._hudComponent);
    }
    private createBackground(): void {
        this.addChild(PixiFactory.getColorBackground(Colors.BACKGROUND));
    }
}
