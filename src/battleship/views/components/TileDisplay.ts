import { AtlasKeys } from "./../../utils/AtlasKeys";
import { Colors } from "./../../utils/Colors";
import { MagicValues } from "./../../utils/MagicValues";
import { PixiFactory } from "./../../utils/PixiFactory";

import { Graphics, Container } from "pixi.js";

export class TileDisplay extends Container {
    public tileId: number;

    private _background: Graphics;
    private _container: Container;
    private _flagContainer: Container;

    constructor(tileId: number) {
        super();

        this.tileId = tileId;
        this.interactive = true;
        this.buttonMode = true;

        this.createBackground();
        this.setValue();
        this.show();
    }

    public show(): void {
        if (this._container.visible === false) {
            let color: number = Colors.TILE_BACKGROUND_OPEN;
            /* if (this.tileId.isMine() === true) {
                color = Colors.TILE_BACKGROUND_MINE_2;
            } */
            this.drawBackground(color);
        }
        this._container.visible = true;
    }

    public reveal(): void {
        this.show();
        /* if (this.tileId.isMine() === true) {
            this.drawBackground(Colors.TILE_BACKGROUND_MINE);
        } else {
            this.drawBackground(Colors.TILE_BACKGROUND_OPEN);
        } */
    }

    private createBackground(): void {
        this._background = new Graphics();
        this.addChild(this._background);
        this.drawBackground(Colors.TILE_BACKGROUND);

        this._container = new Container();
        this._container.visible = false;
        this.addChild(this._container);

        this._flagContainer = new Container();
        this._flagContainer.visible = false;
        this.addChild(this._flagContainer);
    }

    private setValue(): void {
        this.createText();
    }

    private createText(): void {
        let colors: number[] = [
            Colors.TILE_TEXT_1,
            Colors.TILE_TEXT_1,
            Colors.TILE_TEXT_2,
            Colors.TILE_TEXT_3,
            Colors.TILE_TEXT_4
        ];
        this._container.addChild(PixiFactory.getTileLabel(this.tileId.toString(), colors[this.tileId]));
    }

    private drawBackground(color: number): void {
        this._background.clear();
        this._background.beginFill(color);
        this._background.drawRoundedRect(0, 0, MagicValues.TILE_WIDTH - 1, MagicValues.TILE_HEIGHT - 1, 5);
        this._background.pivot.x = this._background.width * 0.5;
        this._background.pivot.y = this._background.height * 0.5;
    }
}
