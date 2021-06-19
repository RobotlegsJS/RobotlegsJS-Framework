import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { LevelModel } from "./../game/models/LevelModel";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { YouWinPopup } from "./../views/YouWinPopup";

@injectable()
export class YouWinPopupMediator extends Mediator<YouWinPopup> {
    @inject(LevelModel)
    private _levelModel: LevelModel;

    @inject(FlowService)
    private _flowService: FlowService;

    @inject(GameService)
    private _gameService: GameService;

    public initialize(): void {
        this.view.createStars(this._levelModel.numStars);
        this.view.updateValues(
            String(this._levelModel.score),
            String(this._levelModel.levelInfo.hiScore)
        );

        this.eventMap.mapListener(
            this.view.retryButton,
            "click",
            this._onTriggeredHandlerRetryButton,
            this
        );
        this.eventMap.mapListener(
            this.view.levelSelectButton,
            "click",
            this._onTriggeredHandlerLevelSelectButton,
            this
        );
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onTriggeredHandlerRetryButton(e: any): void {
        this._flowService.closePopup();
        this._gameService.retryCommand();
    }

    private _onTriggeredHandlerLevelSelectButton(e: any): void {
        this._flowService.closePopup();
        this._flowService.setLevelSelectView();
    }
}
