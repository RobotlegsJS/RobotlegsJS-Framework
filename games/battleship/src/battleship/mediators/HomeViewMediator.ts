import { GameService } from "./../services/GameService";
import { HomeView } from "./../views/HomeView";

import { injectable, inject, EventDispatcher } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class HomeViewMediator extends Mediator<HomeView> {
    @inject(GameService) private gameService: GameService;

    public initialize(): void {
        this.view.interactive = true;
        this.view.buttonMode = true;
        this.view.animationIn();
        this.eventMap.mapListener(this.view, "click", this.playButton_onClick, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private playButton_onClick(e: any): void {
        this.view.animationOut(this.animationComplete.bind(this));
    }

    private animationComplete() {
        this.gameService.createLevelCommand();
    }
}
