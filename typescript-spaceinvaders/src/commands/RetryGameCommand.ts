import { GameModel } from "./../models/GameModel";
import { GameService } from "./../services/GameService";

import { ICommand, injectable, inject } from "@robotlegsjs/core";

@injectable()
export class RetryGameCommand implements ICommand {

    @inject(GameModel)
    private gameModel: GameModel;

    @inject(GameService)
    private gameService: GameService;

    public execute(): void {
        this.gameService.clearBattleField();

        this.gameModel.clear();

        this.gameService.createLevelCommand();

    }
}
