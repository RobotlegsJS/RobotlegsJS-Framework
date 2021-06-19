import { injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { GameView } from "./../views/GameView";

@injectable()
export class GameViewMediator extends Mediator<GameView> {
    public initialize(): void {
        this.view.createComponents();
    }

    public destroy(): void {
        this.view.destroy();
    }
}
