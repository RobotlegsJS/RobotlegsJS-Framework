import { CustomButton } from "./components/CustomButton";
import { AtlasKeys } from "./../utils/AtlasKeys";
import { MagicValues } from "./../utils/MagicValues";
import { ViewPortSize } from "./../utils/ViewPortSize";
import { PixiFactory } from "./../utils/PixiFactory";
import { Container, Sprite } from "pixi.js";

export class HomeView extends Container {

    constructor() {
        super();

        this.createBackground();
        this.createImages();
        this.createText();
    }

    private createBackground(): void {
        this.addChild(PixiFactory.getColorBackground());
    }

    private createImages(): void {
        let logo: Sprite = PixiFactory.getImage(AtlasKeys.LOGO_MINESWEEPER);
        logo.x = ViewPortSize.HALF_WIDTH;
        logo.y = ViewPortSize.MAX_HEIGHT * .3;
        logo.anchor.set(.5);
        this.addChild(logo);

        let logoSetzer: Sprite = PixiFactory.getImage(AtlasKeys.LOGO_SETZER);
        logoSetzer.x = MagicValues.BORDER_OFFSET;
        logoSetzer.y = ViewPortSize.MAX_HEIGHT - 30;
        this.addChild(logoSetzer);
    }

    private createText(): void {
        let text = PixiFactory.getText("click to start", 22);
        text.pivot.x = text.width * .5;
        text.x = ViewPortSize.HALF_WIDTH;
        text.y = ViewPortSize.MAX_HEIGHT * .8;
        this.addChild(text);
    }
}
