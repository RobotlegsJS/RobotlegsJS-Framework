import { ICommand, inject, injectable } from "@robotlegsjs/core";

import { GameModel } from "./../models/GameModel";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";

@injectable()
export class StartGameCommand implements ICommand {
    @inject(GameModel) private gameModel: GameModel;
    @inject(GameService) private gameService: GameService;
    @inject(FlowService) private flowService: FlowService;

    public execute(): void {
        this.gameModel.clear();

        this.gameService.clearBattleField();
        this.gameService.updateHUDData();
        this.gameService.createLevelCommand();
    }
}
