import { TweenLite } from "gsap";
import { Container, Sprite } from "pixi.js";

import { AtlasKeys } from "./../utils/AtlasKeys";
import { PixiFactory } from "./../utils/PixiFactory";
import { ViewPortSize } from "./../utils/ViewPortSize";

export class HomeView extends Container {
    private _msgText: any;
    private _logoImg: any;

    public constructor() {
        super();

        this._createBackground();
        this._createImages();
        this._createText();
    }

    public animationIn(): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenLogo = new TweenLite(this._logoImg, 0.4, { alpha: 1 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenMsg = new TweenLite(this._msgText, 0.4, { alpha: 1, delay: 0.2 });
    }

    public animationOut(complete: any): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenText = new TweenLite(this._msgText, 0.2, { alpha: 0 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenMsg = new TweenLite(this._logoImg, 0.2, {
            alpha: 0,
            delay: 0.1,
            onComplete: complete
        });
    }

    private _createBackground(): void {
        this.addChild(PixiFactory.getColorBackground());
    }

    private _createImages(): void {
        this._logoImg = PixiFactory.getImage(AtlasKeys.LOGO_MINESWEEPER);
        this._logoImg.x = ViewPortSize.HALF_WIDTH;
        this._logoImg.y = ViewPortSize.MAX_HEIGHT * 0.3;
        this._logoImg.anchor.set(0.5);
        this._logoImg.alpha = 0;
        this.addChild(this._logoImg);

        const logoSetzerImg: Sprite = PixiFactory.getImage(AtlasKeys.LOGO_SETZER);
        logoSetzerImg.x = 16;
        logoSetzerImg.y = ViewPortSize.MAX_HEIGHT - 30;
        this.addChild(logoSetzerImg);
    }

    private _createText(): void {
        this._msgText = PixiFactory.getText("click to start");
        this._msgText.pivot.x = this._msgText.width * 0.5;
        this._msgText.x = ViewPortSize.HALF_WIDTH;
        this._msgText.y = ViewPortSize.MAX_HEIGHT * 0.8;
        this._msgText.alpha = 0;
        this.addChild(this._msgText);
    }
}
