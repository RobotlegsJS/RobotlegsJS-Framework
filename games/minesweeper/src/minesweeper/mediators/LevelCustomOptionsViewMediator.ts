import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { FlowService } from "../services/FlowService";
import { CustomLevelModel } from "./../game/models/CustomLevelModel";
import { GameService } from "./../services/GameService";
import { Texts } from "./../utils/Texts";
import { LevelCustomOptionsView } from "./../views/LevelCustomOptionsView";

@injectable()
export class LevelCustomOptionsViewMediator extends Mediator<LevelCustomOptionsView> {
    @inject(FlowService) public flowService: FlowService;
    @inject(GameService) public gameService: GameService;
    @inject(CustomLevelModel) public customLevelModel: CustomLevelModel;

    public initialize(): void {
        this.view.animationIn();
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
        this.flowService.setLevelSelectView();
    }
}
