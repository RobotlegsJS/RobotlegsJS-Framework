import { Ship } from "./../../game/models/Ship";
import { ShipHPComponent } from "./ShipHPComponent";
import { Container } from "pixi.js";
export class HPsComponent extends Container {
    private _displays: Map<Ship, ShipHPComponent>;
    constructor() {
        super();
        this._displays = new Map<Ship, ShipHPComponent>();
    }
    public clear(): void {
        this._displays.clear();
        this.removeChildren();
    }
    public updateHPs(ships: Ship[]): void {
        for (let ship of ships) {
            this._displays.get(ship).updateHP(ship.hp);
        }
    }
    public addShipHP(ship: Ship): void {
        let display = new ShipHPComponent(ship.id, ship.size);
        display.y = this._displays.size * 30;
        this.addChild(display);
        this._displays.set(ship, display);
    }
    public addShipHPs(ships: Ship[]): void {
        for (let ship of ships) {
            this.addShipHP(ship);
        }
    }
}
