import { GameService } from "./../services/GameService";
import { GameView } from "./../views/GameView";

import { Mediator } from "robotlegs-pixi";
import { inject, injectable } from "robotlegs";

@injectable()
export class GameViewMediator extends Mediator<GameView> {

    @inject(GameService)
    public gameService: GameService;

    public initialize(): void {
        this.view.createComponents();
        this.gameService.startCommand();
    }

    public destroy(): void {
        this.view.destroy();
    }
}
