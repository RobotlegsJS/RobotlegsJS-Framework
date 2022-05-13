import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { GameService } from "../services/GameService";
import { HomeView } from "../views/HomeView";

@injectable()
export class HomeViewMediator extends Mediator<HomeView> {
    @inject(GameService)
    private _gameService: GameService;

    public initialize(): void {
        this.view.interactive = true;
        this.view.buttonMode = true;
        this.view.animationIn();
        this.eventMap.on(this.view, "click", this.playButton_onClick, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private playButton_onClick(e: any): void {
        this.view.animationOut(this._animationComplete.bind(this));
    }

    private _animationComplete(): void {
        this._gameService.createLevelCommand();
    }
}
