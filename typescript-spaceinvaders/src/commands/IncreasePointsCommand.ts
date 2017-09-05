import { GameModel } from "./../models/GameModel";
import { GameService } from "./../services/GameService";

import { ICommand, inject, injectable } from "@robotlegsjs/core";

@injectable()
export class IncreasePointsCommand implements ICommand {

    @inject(GameModel)
    public model: GameModel;

    @inject(GameService)
    public gameService: GameService;

    public execute(): void {
        this.model.score += 100;

        this.gameService.updateHUDData();
    }
}
