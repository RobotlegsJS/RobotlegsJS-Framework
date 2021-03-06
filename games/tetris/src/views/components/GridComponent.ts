import { Container } from "pixi.js";
import { TilePool } from "../../utils/TilePool";
import { TileDisplay } from "./TileDisplay";

export class GridComponent extends Container {
    public clear(): void {
        while (this.children.length > 0) {
            if (this.getChildAt(0) instanceof TileDisplay) {
                TilePool.back(<TileDisplay>this.getChildAt(0));
            }
            this.removeChildAt(0);
        }
    }
}
