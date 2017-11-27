import { Container, Graphics } from "pixi.js";

import { Cell } from "./../../game/models/Cell";
import { AtlasKeys } from "./../../utils/AtlasKeys";
import { Colors } from "./../../utils/Colors";
import { MagicValues } from "./../../utils/MagicValues";
import { PixiFactory } from "./../../utils/PixiFactory";

export class TileDisplay extends Container {
    public cell: Cell;

    private _background: Graphics;
    private _container: Container;
    private _flagContainer: Container;

    constructor(cell: Cell) {
        super();

        this.cell = cell;
        this.interactive = true;
        this.buttonMode = true;

        this.createBackground();
        this.setValue();
    }
    public show(): void {
        if (this._container.visible === false) {
            let color: number = Colors.TILE_BACKGROUND_OPEN;
            if (this.cell.isMine() === true) {
                color = Colors.TILE_BACKGROUND_MINE_2;
            }
            this.drawBackground(color);
        }
        this._container.visible = true;
    }
    public reveal(): void {
        this.show();
        if (this.cell.isMine() === true) {
            this.drawBackground(Colors.TILE_BACKGROUND_MINE);
        } else {
            this.drawBackground(Colors.TILE_BACKGROUND_OPEN);
        }
    }
    public flag(): void {
        this._flagContainer.visible = true;
        this.createFlag();
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
        if (this.cell.isMine() === true) {
            this.createMine();
        } else if (this.cell.value > 0) {
            this.createText();
        }
    }
    private createMine(): void {
        const mine = PixiFactory.getImage(AtlasKeys.ICON_MINE);
        mine.pivot.x = mine.width * 0.5;
        mine.pivot.y = mine.height * 0.5;
        this._container.addChild(mine);
    }
    private createFlag(): void {
        const flag = PixiFactory.getImage(AtlasKeys.ICON_FLAG);
        flag.pivot.x = flag.width * 0.5;
        flag.pivot.y = flag.height * 0.5;
        this._flagContainer.addChild(flag);
    }
    private createText(): void {
        const colors: number[] = [
            Colors.TILE_TEXT_1,
            Colors.TILE_TEXT_1,
            Colors.TILE_TEXT_2,
            Colors.TILE_TEXT_3,
            Colors.TILE_TEXT_4
        ];
        this._container.addChild(PixiFactory.getTileLabel(this.cell.value.toString(), colors[this.cell.value]));
    }
    private drawBackground(color: number): void {
        this._background.clear();
        this._background.beginFill(color);
        this._background.drawRoundedRect(0, 0, MagicValues.TILE_WIDTH - 1, MagicValues.TILE_HEIGHT - 1, 5);
        this._background.pivot.x = this._background.width * 0.5;
        this._background.pivot.y = this._background.height * 0.5;
    }
}
