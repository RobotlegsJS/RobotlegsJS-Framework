import { GameService } from "./../services/GameService";
import { GameModel } from "./../models/GameModel";

import { ICommand, inject, injectable } from "@robotlegsjs/core";

@injectable()
export class DecreaseLivesCommand implements ICommand {

    @inject(GameModel)
    private model: GameModel;

    @inject(GameService)
    private gameService: GameService;

    public execute(): void {
        this.model.lives -= 1;
        this.gameService.updateHUDData();

        if (this.model.lives === 0) {
            this.gameService.gameOver();
        }
    }
}
