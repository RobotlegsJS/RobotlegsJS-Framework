import { GameModel } from "./../models/GameModel";
import { GameService } from "./../services/GameService";

import { ICommand, injectable, inject } from "robotlegs";

@injectable()
export class IncreaseLevelCommand implements ICommand {

    @inject(GameModel)
    public model: GameModel;

    @inject(GameService)
    public gameService: GameService;

    public execute(): void {
        this.model.level += 1;

        this.gameService.clearBattleField();
        this.gameService.updateHUDData();
        this.gameService.createLevelCommand();
    }
}
