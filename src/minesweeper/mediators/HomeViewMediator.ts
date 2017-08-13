import { FlowService } from "./../services/FlowService";
import { HomeView } from "./../views/HomeView";

import { injectable, inject, EventDispatcher } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class HomeViewMediator extends Mediator<HomeView> {

    @inject(FlowService)
    public flowService: FlowService;

    public initialize(): void {
        this.view.interactive = true;
        this.view.buttonMode = true;
        this.eventMap.mapListener(this.view, "click", this.playButton_onClick, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private playButton_onClick(e: any): void {
        this.flowService.setLevelSelectView();
    }
}
