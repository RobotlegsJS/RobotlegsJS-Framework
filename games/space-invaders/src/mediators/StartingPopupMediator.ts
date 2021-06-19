import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { StartingPopup } from "./../views/StartingPopup";

@injectable()
export class StartingPopupMediator extends Mediator<StartingPopup> {
    @inject(GameService)
    private _gameService: GameService;

    @inject(FlowService)
    private _flowService: FlowService;

    private _count: number;

    public initialize(): void {
        this._count = 4;

        this.tick(this);
    }

    public tick(obThis: StartingPopupMediator): void {
        obThis._count -= 1;
        if (obThis._count > 0) {
            obThis.view.changeNumber(obThis._count);
            setTimeout(obThis.tick, 300, obThis);
        } else {
            obThis._onCompleteTick();
        }
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onCompleteTick(): void {
        this._gameService.resume();
        this._flowService.closePopup();
    }
}
