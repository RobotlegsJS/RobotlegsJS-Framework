import { HPsComponent } from "./HPsComponent";
import { ShipsGridDisplay } from "./ShipsGridDisplay";
import { BattleField } from "./../../game/models/BattleField";
import { GridDisplay } from "./GridDisplay";
import { Texts } from "./../../utils/Texts";
import { IsoUtils } from "../../utils/IsoUtils";
import { Ship } from "./../../game/models/Ship";
import { Colors } from "../../utils/Colors";
import { MagicValues } from "./../../utils/MagicValues";
import { PixiFactory } from "./../../utils/PixiFactory";
import { Container, Graphics, Sprite } from "pixi.js";
export class HeroComponent extends Container {
    private _ships: ShipsGridDisplay;
    private _hps: HPsComponent;
    private _grid: GridDisplay;
    public get grid(): GridDisplay {
        return this._grid;
    }
    public get ships(): ShipsGridDisplay {
        return this._ships;
    }
    public get hps(): HPsComponent {
        return this._hps;
    }
    constructor() {
        super();
        this.setupComponents();
        this.setupText();
    }
    public destroy(): void {
        this._ships.clear();
        this._hps.clear();
        this.removeChildren();
    }
    private setupComponents(): void {
        this._grid = new GridDisplay();
        this._grid.x = 250;
        this._grid.y = 130;
        this.addChildAt(this._grid, 0);

        this._ships = new ShipsGridDisplay();
        this._ships.x = 250;
        this._ships.y = 130;
        this.addChild(this._ships);

        this._hps = new HPsComponent();
        this._hps.x = 20;
        this._hps.y = 115;
        this.addChild(this._hps);
    }
    private setupText(): void {
        let title = PixiFactory.getText(Texts.HERO, Colors.HUD);
        title.x = 10;
        title.y = 10;
        this.addChild(title);
    }
}
