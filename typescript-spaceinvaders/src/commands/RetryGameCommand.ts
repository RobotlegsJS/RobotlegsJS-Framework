import { GameModel } from "./../models/GameModel";
import { GameService } from "./../services/GameService";

import { ICommand, injectable, inject } from "robotlegs";

@injectable()
export class RetryGameCommand implements ICommand {

    @inject(GameModel)
    public gameModel: GameModel;

    @inject(GameService)
    public gameService: GameService;

    public execute(): void {
        this.gameService.clearBattleField();

        this.gameModel.clear();

        this.gameService.createLevelCommand();

    }
}
