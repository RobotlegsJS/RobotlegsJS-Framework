import { GameModel } from "./../models/GameModel";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";

import { inject, injectable, ICommand } from "@robotlegsjs/core";

@injectable()
export class StartGameCommand implements ICommand {

    @inject(GameModel)
    public gameModel: GameModel;

    @inject(GameService)
    public gameService: GameService;

    @inject(FlowService)
    public flowService: FlowService;

    // @inject(SharedObjectManager)
    // public sharedObjectManager:SharedObjectManager;

    public execute(): void {
        // sharedObjectManager.getExternalData();

        this.gameModel.clear();

        this.gameService.clearBattleField();
        this.gameService.updateHUDData();
        this.gameService.createLevelCommand();
    }
}
