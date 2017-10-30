import { AtlasKeys } from "./../../utils/AtlasKeys";
import { IsoUtils } from "./../../utils/IsoUtils";
import { Ship } from "./../../game/models/Ship";
import { Sprite } from "pixi.js";
export class ShipDisplay extends Sprite {
    constructor(ship: Ship) {
        super(AtlasKeys.getShipTextureById(ship.id));

        this.anchor.set(0.5);
        this.setupPosition(ship);
    }
    public setupPosition(ship: Ship): void {
        let firstTile = ship.tiles[0];
        let lastTile = ship.tiles[ship.tiles.length - 1];

        // direction
        this.scale.x = firstTile.col === lastTile.col ? this.scale.x : -this.scale.x;

        // postion
        let p1 = IsoUtils.toIso(firstTile.col, firstTile.row);
        let p2 = IsoUtils.toIso(lastTile.col, lastTile.row);
        this.x = (p1.x + p2.x) / 2;
        this.y = (p1.y + p2.y) / 2;
    }
}
