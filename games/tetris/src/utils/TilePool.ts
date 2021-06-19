import { TileDisplay } from "./../views/components/TileDisplay";
import { AtlasKeys } from "./AtlasKeys";

export class TilePool {
    private static _dictionary: Map<number, TileDisplay[]>;

    public static init(): void {
        this._dictionary = new Map<number, TileDisplay[]>();
    }
    public static getTileDisplay(typeId: number): TileDisplay {
        if (this._dictionary.get(typeId) === undefined) {
            this._dictionary.set(typeId, []);
        }
        const list: TileDisplay[] = this._dictionary.get(typeId);
        let tileDisplay: TileDisplay;

        tileDisplay =
            list.length === 0
                ? new TileDisplay(AtlasKeys.getTileTexture(typeId), typeId)
                : (tileDisplay = list.shift());

        tileDisplay.visible = true;

        return tileDisplay;
    }
    public static back(tile: TileDisplay): void {
        const list: TileDisplay[] = this._dictionary.get(tile.typeId);
        tile.visible = false;

        if (list.indexOf(tile) === -1) {
            list.push(tile);
        }
    }
}
