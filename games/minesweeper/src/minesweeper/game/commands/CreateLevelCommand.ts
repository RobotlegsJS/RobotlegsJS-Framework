import { ICommand, inject, injectable } from "@robotlegsjs/core";

import { GameEvent } from "./../../events/GameEvent";
import { FlowService } from "./../../services/FlowService";
import { GameService } from "./../../services/GameService";
import { GameManager } from "./../managers/GameManager";
import { LevelModel } from "./../models/LevelModel";

@injectable()
export class CreateLevelCommand implements ICommand {
    @inject(LevelModel) public levelModel: LevelModel;
    @inject(GameManager) public gameManager: GameManager;
    @inject(GameService) public gameService: GameService;
    @inject(FlowService) public flowService: FlowService;
    @inject(GameEvent) public gameEvent: GameEvent;

    public execute(): void {
        this.levelModel.levelId = this.gameEvent.extra.levelId;
        this.levelModel.reset();

        this.gameManager.generateGrid(this.levelModel.levelId);

        this.gameService.start();

        this.flowService.setGameView();
        this.flowService.showStartingPopup();
    }
}
