import { Player } from "../../game/models/Player";
import { ShipsGridDisplay } from "./ShipsGridDisplay";
import { GridDisplay } from "./GridDisplay";
import { Texts } from "./../../utils/Texts";
import { ShipDisplay } from "./ShipDisplay";
import { IsoUtils } from "./../../utils/IsoUtils";
import { Ship } from "../../game/models/Ship";
import { Colors } from "../../utils/Colors";
import { MagicValues } from "./../../utils/MagicValues";
import { PixiFactory } from "./../../utils/PixiFactory";
import { Container, Graphics, Sprite } from "pixi.js";
export class EnemyComponent extends Container {
    private _ships: ShipsGridDisplay;
    private _grid: GridDisplay;
    public get grid(): GridDisplay {
        return this._grid;
    }
    public get ships(): ShipsGridDisplay {
        return this._ships;
    }
    constructor() {
        super();
        this.setupComponents();
        this.setupText();
    }
    public destroy(): void {
        this._ships.clear();
        this.removeChildren();
    }
    private setupComponents(): void {
        this._grid = new GridDisplay(Player.ENEMY);
        this._grid.x = 200;
        this._grid.y = 50;
        this._grid.scale.set(1.4);
        this.addChildAt(this._grid, 0);

        this._ships = new ShipsGridDisplay();
        this._ships.x = 200;
        this._ships.y = 50;
        this._ships.scale.set(1.4);
        this.addChild(this._ships);
    }
    private setupText(): void {
        let title = PixiFactory.getText(Texts.ENEMY, Colors.HUD);
        title.x = 10;
        title.y = 10;
        this.addChild(title);
    }
}
