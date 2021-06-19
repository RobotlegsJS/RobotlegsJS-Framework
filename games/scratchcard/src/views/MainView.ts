import { Container } from "pixi.js";
import { MagicValues } from "../utils/MagicValues";
import { PixiFactory } from "../utils/PixiFactory";
import { Colors } from "./../utils/Colors";
import { HUDView } from "./HUDView";
import { ScratchView } from "./ScratchView";

export class MainView extends Container {
    private _hud: HUDView;
    private _scratchView: ScratchView;

    public constructor() {
        super();
        this._createBackground();
    }

    public createComponents(): void {
        this._scratchView = new ScratchView();
        this._scratchView.x = 10;
        this._scratchView.y = 100;
        this.addChild(this._scratchView);

        this._hud = new HUDView();
        this.addChild(this._hud);
    }

    private _createBackground(): void {
        this.addChild(PixiFactory.getColorBackground(Colors.BACKGROUND_LIGHT));

        const { SCRATCH_BOX_HEIGHT, SCRATCH_BOX_WIDTH } = MagicValues;
        const scratchArea = PixiFactory.getColorBox(
            SCRATCH_BOX_WIDTH,
            SCRATCH_BOX_HEIGHT,
            Colors.BACKGROUND_DARK
        );
        scratchArea.x = 10;
        scratchArea.y = 100;
        this.addChild(scratchArea);
    }
}
