import { Tile } from "../models/Tile";
import { TileGroup } from "../models/TileGroup";
import { TileGroupType } from "../models/TileGroupType";

export class TileGroupFactory {
    public static getTileGroup(typeId: number): TileGroup {
        const tiles: Tile[] = this.getTilesByTypeArray(TileGroupType.getTypeArray(typeId));
        return new TileGroup(typeId, tiles);
    }

    public static getRandomTileGroup(): TileGroup {
        const types: number[] = [
            TileGroupType.TYPE_I,
            TileGroupType.TYPE_Z,
            TileGroupType.TYPE_S,
            TileGroupType.TYPE_T,
            TileGroupType.TYPE_L,
            TileGroupType.TYPE_J,
            TileGroupType.TYPE_O
        ];
        const rndType: number = Math.floor(Math.random() * types.length);
        return this.getTileGroup(types[rndType]);
    }

    public static getTilesByTypeArray(typeArray: number[]): Tile[] {
        const tiles: Tile[] = [];
        let tile: Tile;

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < typeArray.length; i++) {
            tile = new Tile();
            tile.col = Math.floor(typeArray[i] % 2);
            tile.row = Math.floor(typeArray[i] / 2);
            tiles.push(tile);
        }

        return tiles;
    }
}
