import { ICommand, inject, injectable } from "@robotlegsjs/core";

import { GameModel } from "./../models/GameModel";
import { GameService } from "./../services/GameService";

@injectable()
export class IncreasePointsCommand implements ICommand {
    @inject(GameModel) private model: GameModel;
    @inject(GameService) private gameService: GameService;

    public execute(): void {
        this.model.score += 100;

        this.gameService.updateHUDData();
    }
}
