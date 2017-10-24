import { MagicValues } from "../../utils/MagicValues";
import { Player } from "../../game/models/Player";
import { Container } from "pixi.js";
export class BattleFieldComponent extends Container {
    public hero: Container;
    public enemy: Container;
    constructor() {
        super();
        this.hero = new Container();
        this.addChild(this.hero);
        this.enemy = new Container();
        this.enemy.y = MagicValues.HALF_HEIGHT;
        this.addChild(this.enemy);
    }
}
