import { Colors } from "./../../utils/Colors";
import { AtlasKeys } from "../../utils/AtlasKeys";
import { PixiFactory } from "../../utils/PixiFactory";
import { Container, Sprite, Graphics } from "pixi.js";
export class ShipHPComponent extends Container {
    private shipDisplay: Sprite;
    private hpDisplays: Graphics[];
    constructor(id: number, size: number) {
        super();
        this.createBackgrounds(size);
        this.createShipDisplay(id);
        this.createHPDisplays(size);
    }
    public updateHP(hp): void {
        for (let i = 0; i < this.hpDisplays.length; i++) {
            if (i < hp) {
                continue;
            }
            this.removeChild(this.hpDisplays[i]);
        }
    }
    private createBackgrounds(size): void {
        let shipBackground = PixiFactory.getColorBoxRounded(44, 24, Colors.HP_BACKGROUND);
        this.addChild(shipBackground);
    }
    private createShipDisplay(id: number): void {
        this.shipDisplay = new Sprite(AtlasKeys.getShipTextureById(id));
        this.shipDisplay.position.set(22, 12);
        this.shipDisplay.anchor.set(0.5);
        this.shipDisplay.scale.set(0.5);
        this.addChild(this.shipDisplay);
    }
    private createHPDisplays(size: number) {
        this.hpDisplays = new Array<Graphics>();
        for (let i = 0; i < size; i++) {
            let hpDisplay: Graphics = PixiFactory.getColorBoxRounded(5, 20, Colors.HP);
            hpDisplay.y = 2;
            hpDisplay.x = 48 + i * 8;
            this.addChild(hpDisplay);
            this.hpDisplays.push(hpDisplay);
        }
    }
}
