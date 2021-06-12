import { ScratchView } from "./ScratchView";
import { MagicValues } from "../utils/MagicValues";
import { HUDView } from "./HUDView";
import { Container } from "pixi.js";

import { PixiFactory } from "../utils/PixiFactory";
import { Colors } from "./../utils/Colors";

export class MainView extends Container {
    private hud: HUDView;
    private scratchView: ScratchView;

    constructor() {
        super();
        this.createBackground();
    }
    public createComponents(): void {
        this.scratchView = new ScratchView();
        this.scratchView.x = 10;
        this.scratchView.y = 100;
        this.addChild(this.scratchView);

        this.hud = new HUDView();
        this.addChild(this.hud);
    }
    private createBackground(): void {
        this.addChild(PixiFactory.getColorBackground(Colors.BACKGROUND_LIGHT));

        const { SCRATCH_BOX_HEIGHT, SCRATCH_BOX_WIDTH } = MagicValues;
        const scratchArea = PixiFactory.getColorBox(SCRATCH_BOX_WIDTH, SCRATCH_BOX_HEIGHT, Colors.BACKGROUND_DARK);
        scratchArea.x = 10;
        scratchArea.y = 100;
        this.addChild(scratchArea);
    }
}
