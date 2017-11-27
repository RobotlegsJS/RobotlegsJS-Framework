import { Container, Sprite } from "pixi.js";

import { AtlasKeys } from "./../../utils/AtlasKeys";
import { PixiFactory } from "./../../utils/PixiFactory";

export class LivesComponent extends Container {
    private _cannons: Sprite[];

    constructor() {
        super();

        this.createDisplays();
    }
    public updateLives(value: number): void {
        for (let i = 0; i < this._cannons.length; i++) {
            this._cannons[i].visible = i < value;
        }
    }
    private createDisplays(): void {
        this._cannons = new Array<Sprite>();

        for (let i = 0; i < 3; i++) {
            const cannon: Sprite = PixiFactory.getImage(AtlasKeys.CANNON_HUD);
            cannon.x = i * 33;
            cannon.y = -3;
            this.addChild(cannon);
            this._cannons.push(cannon);
        }
    }
}
