import { CustomButton } from "./components/CustomButton";
import { AtlasKeys } from "./../utils/AtlasKeys";
import { MagicValues } from "./../utils/MagicValues";
import { ViewPortSize } from "./../utils/ViewPortSize";
import { PixiFactory } from "./../utils/PixiFactory";

import { TweenLite } from "gsap";
import { Container, Sprite } from "pixi.js";

export class HomeView extends Container {

    private _msgText: any;
    private _logoImg: any;

    constructor() {
        super();

        this.createBackground();
        this.createImages();
        this.createText();
    }

    public animationIn(): void {
        let tweenLogo = new TweenLite(this._logoImg, .4, { alpha: 1 });
        let tweenMsg = new TweenLite(this._msgText, .4, { alpha: 1, delay: .2 });
    }

    public animationOut(complete: Function): void {
        let tweenText = new TweenLite(this._msgText, .2, { alpha: 0 });
        let tweenMsg = new TweenLite(this._logoImg, .2, { alpha: 0, delay: .1, onComplete: complete });
    }

    private createBackground(): void {
        this.addChild(PixiFactory.getColorBackground());
    }

    private createImages(): void {
        this._logoImg = PixiFactory.getImage(AtlasKeys.LOGO_MINESWEEPER);
        this._logoImg.x = ViewPortSize.HALF_WIDTH;
        this._logoImg.y = ViewPortSize.MAX_HEIGHT * .3;
        this._logoImg.anchor.set(.5);
        this._logoImg.alpha = 0;
        this.addChild(this._logoImg);

        let logoSetzerImg: Sprite = PixiFactory.getImage(AtlasKeys.LOGO_SETZER);
        logoSetzerImg.x = 16;
        logoSetzerImg.y = ViewPortSize.MAX_HEIGHT - 30;
        this.addChild(logoSetzerImg);
    }

    private createText(): void {
        this._msgText = PixiFactory.getText("click to start");
        this._msgText.pivot.x = this._msgText.width * .5;
        this._msgText.x = ViewPortSize.HALF_WIDTH;
        this._msgText.y = ViewPortSize.MAX_HEIGHT * .8;
        this._msgText.alpha = 0;
        this.addChild(this._msgText);
    }
}
