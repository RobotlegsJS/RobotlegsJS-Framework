import { BattleFieldComponent } from "./components/BattleFieldComponent";
import { HUDGameComponent } from "./components/HUDGameComponent";
import { PixiFactory } from "./../utils/PixiFactory";

import { Container } from "pixi.js";

export class GameView extends Container {

    private _battleField: BattleFieldComponent;
    private _hudComponent: HUDGameComponent;

    public get battleField(): BattleFieldComponent {
        return this._battleField;
    }

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
        this._hudComponent = new HUDGameComponent();
        this.addChild(this._hudComponent);

        this._battleField = new BattleFieldComponent();
        this.addChild(this._battleField);
    }

    private createBackground(): void {
        this.addChild(PixiFactory.getColorBackground());
    }
}
