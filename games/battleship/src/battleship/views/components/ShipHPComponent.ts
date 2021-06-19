import { Colors } from "../../utils/Colors";
import { AtlasKeys } from "../../utils/AtlasKeys";
import { PixiFactory } from "../../utils/PixiFactory";

import { Container, Sprite, Graphics } from "pixi.js";

export class ShipHPComponent extends Container {
    private _shipDisplay: Sprite;
    private _hpDisplays: Graphics[];

    public constructor(id: number, size: number) {
        super();
        this._createBackgrounds(size);
        this._createShipDisplay(id);
        this._createHPDisplays(size);
    }

    public updateHP(hp: number): void {
        for (let i = 0; i < this._hpDisplays.length; i++) {
            if (i < hp) {
                continue;
            }
            this.removeChild(this._hpDisplays[i]);
        }
    }

    private _createBackgrounds(size: number): void {
        let shipBackground = PixiFactory.getColorBoxRounded(44, 24, Colors.HP_BACKGROUND);
        this.addChild(shipBackground);
    }

    private _createShipDisplay(id: number): void {
        this._shipDisplay = new Sprite(AtlasKeys.getShipTextureById(id));
        this._shipDisplay.position.set(22, 12);
        this._shipDisplay.anchor.set(0.5);
        this._shipDisplay.scale.set(0.5);
        this.addChild(this._shipDisplay);
    }

    private _createHPDisplays(size: number): void {
        this._hpDisplays = new Array<Graphics>();
        for (let i = 0; i < size; i++) {
            let hpDisplay: Graphics = PixiFactory.getColorBoxRounded(5, 20, Colors.HP);
            hpDisplay.y = 2;
            hpDisplay.x = 48 + i * 8;
            this.addChild(hpDisplay);
            this._hpDisplays.push(hpDisplay);
        }
    }
}
