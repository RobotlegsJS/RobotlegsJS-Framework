import { Texts } from "./../utils/Texts";
import { CustomLevelModel } from "./../game/models/CustomLevelModel";
import { GameService } from "./../services/GameService";
import { FlowService } from "../services/FlowService";
import { LevelCustomOptionsPopup } from "./../views/LevelCustomOptionsPopup";
import { LevelSelectView } from "../views/LevelSelectView";

import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class LevelCustomOptionsPopupMediator extends Mediator<LevelCustomOptionsPopup> {

    @inject(FlowService)
    public flowService: FlowService;

    @inject(GameService)
    public gameService: GameService;

    @inject(CustomLevelModel)
    public customLevelModel: CustomLevelModel;

    public initialize(): void {
        this.eventMap.mapListener(this.view.backButton, "click", this.onBackClick, this);
        this.eventMap.mapListener(this.view.playButton, "click", this.onPlayClick, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private onPlayClick(e: any): void {
        this.customLevelModel.maxCols = this.view.maxColsNS.value;
        this.customLevelModel.maxRows = this.view.maxRowsNS.value;
        this.customLevelModel.numMines = this.view.maxMinesNS.value;
        this.flowService.closePopup();
        this.gameService.createLevel(Texts.CUSTOM);
    }

    private onBackClick(e: any): void {
        this.flowService.closePopup();
    }
}
