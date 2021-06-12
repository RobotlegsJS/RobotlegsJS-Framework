import { Ship } from "./../../game/models/Ship";
import { ShipDisplay } from "./ShipDisplay";
import { Container } from "pixi.js";
export class ShipsGridDisplay extends Container {
    private _displays: Map<Ship, ShipDisplay>;
    constructor() {
        super();
        this._displays = new Map<Ship, ShipDisplay>();
    }
    public clear(): void {
        this._displays.clear();
        this.removeChildren();
    }
    public updateHPs(ships: Ship[]): void {
        for (let ship of ships) {
            if (ship.hp === 0) {
                this._displays.get(ship).alpha = 0.5;
            }
        }
    }
    public hideAll(ships: Ship[]): void {
        for (let ship of ships) {
            this._displays.get(ship).alpha = 0;
        }
    }
    public addShip(ship: Ship): void {
        let display = new ShipDisplay(ship);
        this.addChild(display);
        this._displays.set(ship, display);
    }
    public addShips(ships: Ship[]): void {
        for (let ship of ships) {
            this.addShip(ship);
        }
    }
}
