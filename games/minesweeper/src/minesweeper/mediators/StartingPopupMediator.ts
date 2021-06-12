import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { StartingPopup } from "./../views/StartingPopup";

@injectable()
export class StartingPopupMediator extends Mediator<StartingPopup> {
    @inject(GameService) public gameService: GameService;
    @inject(FlowService) public flowService: FlowService;

    private _count: number;

    public initialize(): void {
        this._count = 4;

        this.tick();
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private tick() {
        this._count -= 1;
        if (this._count > 0) {
            this.view.changeNumber(this._count);
            setTimeout(this.tick.bind(this), 300);
        } else {
            this.tick_onComplete();
        }
    }
    private tick_onComplete(): void {
        this.gameService.resume();
        this.flowService.closePopup();
    }
}
