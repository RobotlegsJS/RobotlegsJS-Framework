import { Player } from "../../game/models/Player";
import { ShipsGridDisplay } from "./ShipsGridDisplay";
import { GridDisplay } from "./GridDisplay";
import { Texts } from "../../utils/Texts";
import { Colors } from "../../utils/Colors";
import { PixiFactory } from "../../utils/PixiFactory";

import { Container } from "pixi.js";

export class EnemyComponent extends Container {
    private _ships: ShipsGridDisplay;
    private _grid: GridDisplay;

    public get grid(): GridDisplay {
        return this._grid;
    }

    public get ships(): ShipsGridDisplay {
        return this._ships;
    }

    public constructor() {
        super();
        this._setupComponents();
        this._setupText();
    }

    public destroy(): void {
        this._ships.clear();
        this.removeChildren();
    }

    private _setupComponents(): void {
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

    private _setupText(): void {
        let title = PixiFactory.getText(Texts.ENEMY, Colors.HUD);
        title.x = 10;
        title.y = 10;
        this.addChild(title);
    }
}
