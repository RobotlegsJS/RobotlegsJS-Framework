import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { GameService } from "./../services/GameService";
import { GameView } from "./../views/GameView";

@injectable()
export class GameViewMediator extends Mediator<GameView> {
    @inject(GameService)
    private _gameService: GameService;

    public initialize(): void {
        this.view.createComponents();
        this._gameService.startCommand();
    }

    public destroy(): void {
        this.view.destroy();
    }
}
