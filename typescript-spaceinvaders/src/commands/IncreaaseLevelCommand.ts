import { GameModel } from "./../models/GameModel";
import { GameService } from "./../services/GameService";

import { ICommand, injectable, inject } from "@robotlegsjs/core";

@injectable()
export class IncreaseLevelCommand implements ICommand {

    @inject(GameModel)
    private model: GameModel;

    @inject(GameService)
    private gameService: GameService;

    public execute(): void {
        this.model.level += 1;

        this.gameService.clearBattleField();
        this.gameService.updateHUDData();
        this.gameService.createLevelCommand();
    }
}
