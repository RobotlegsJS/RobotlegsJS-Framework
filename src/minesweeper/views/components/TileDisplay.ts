import { Cell } from "./../../game/models/Cell";
import { PixiFactory } from "./../../utils/PixiFactory";
import { MagicValues } from "./../../utils/MagicValues";
import { Colors } from "./../../utils/Colors";
import { Graphics, Container } from "pixi.js";

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

    public createBackground(): void {
        this._background = PixiFactory.getTileBackground();
        this.addChild(this._background);

        this._container = new Container();
        this._container.visible = false;
        this.addChild(this._container);

        this._flagContainer = new Container();
        this._flagContainer.visible = false;
        this.addChild(this._flagContainer);
        this.createFlag();
    }

    public show(): void {
        this._background.visible = false;
        this._container.visible = true;
    }

    public flag(value: boolean): void {
        this._flagContainer.visible = value;
    }

    private setValue(): void {
        if (this.cell.isMine() === true) {
            this.createMine();
        } else if (this.cell.value > 0) {
            this.createText();
        } else {
            this._container.addChild(PixiFactory.getTileBackground(Colors.TILE_BACKGROUND_OPEN));
        }
    }

    private createMine(): void {
        this._container.addChild(PixiFactory.getTileBackground(0xFF7777));
        let mine = new Graphics();
        mine.beginFill(0x000000);
        mine.drawCircle(0, 0, MagicValues.TILE_WIDTH * .5);
        mine.pivot.x = mine.width * .5;
        mine.pivot.y = mine.height * .5;
        mine.x = this.width * .5;
        mine.y = this.height * .5;
        this._container.addChild(mine);
    }

    private createFlag(): void {
        this._container.addChild(PixiFactory.getTileBackground(0xFF7777));
        let flag = new Graphics();
        flag.beginFill(0x000000);
        flag.drawRect(0, 0, MagicValues.TILE_WIDTH * .3, MagicValues.TILE_HEIGHT * .8);
        flag.pivot.x = flag.width * .5;
        flag.pivot.y = flag.height * .5;

        this._flagContainer.addChild(flag);
    }

    private createText(): void {
        let colors: Array<number> = [
            Colors.TILE_TEXT_1,
            Colors.TILE_TEXT_1,
            Colors.TILE_TEXT_2,
            Colors.TILE_TEXT_3,
            Colors.TILE_TEXT_4,
        ];
        this._container.addChild(PixiFactory.getTileBackground(Colors.TILE_BACKGROUND_OPEN));
        this._container.addChild(PixiFactory.getTileText(this.cell.value.toString(), colors[this.cell.value]));
    }
}
