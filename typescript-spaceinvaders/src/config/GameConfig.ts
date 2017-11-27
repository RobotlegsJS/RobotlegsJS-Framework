import { IConfig, IContext, IEventCommandMap, inject, injectable } from "@robotlegsjs/core";

import { CreateLevelCommand } from "./../commands/CreateLevelCommand";
import { DecreaseLivesCommand } from "./../commands/DecreaseLivesCommand";
import { GameOverCommand } from "./../commands/GameOverCommand";
import { IncreaseLevelCommand } from "./../commands/IncreaaseLevelCommand";
import { IncreasePointsCommand } from "./../commands/IncreasePointsCommand";
import { RetryGameCommand } from "./../commands/RetryGameCommand";
import { StartGameCommand } from "./../commands/StartGameCommand";
import { GameEvent } from "./../events/GameEvent";
import { LevelFactory } from "./../game/factories/LevelFactory";
import { GameManager } from "./../game/Managers/GameManager";
import { EntityPool } from "./../game/utils/EntityPool";
import { GameModel } from "./../models/GameModel";
import { LevelModel } from "./../models/LevelModel";
import { GameService } from "./../services/GameService";

@injectable()
export class GameConfig implements IConfig {
    @inject(IContext) private context: IContext;
    @inject(IEventCommandMap) private commandMap: IEventCommandMap;

    public configure(): void {
        EntityPool.init();
        LevelFactory.setupLevels();

        this.mapCommands();
        this.mapManager();
        this.mapModels();
    }
    private mapCommands(): void {
        this.commandMap.map(GameEvent.START_GAME_COMMAND).toCommand(StartGameCommand);
        this.commandMap.map(GameEvent.RETRY_GAME_COMMAND).toCommand(RetryGameCommand);
        this.commandMap.map(GameEvent.CREATE_LEVEL_COMMAND).toCommand(CreateLevelCommand);
        this.commandMap.map(GameEvent.INCREASE_LEVEL_COMMAND).toCommand(IncreaseLevelCommand);
        this.commandMap.map(GameEvent.INCREASE_POINTS).toCommand(IncreasePointsCommand);
        this.commandMap.map(GameEvent.DECREASE_LIVES).toCommand(DecreaseLivesCommand);
        this.commandMap.map(GameEvent.GAME_OVER).toCommand(GameOverCommand);
    }
    private mapManager(): void {
        this.context.injector
            .bind(GameService)
            .to(GameService)
            .inSingletonScope();
        this.context.injector
            .bind(GameManager)
            .to(GameManager)
            .inSingletonScope();
        // this.context.injector.bind( SharedObjectManager ).to(SharedObjectManager).inSingletonScope();*
    }
    private mapModels(): void {
        this.context.injector
            .bind(GameModel)
            .to(GameModel)
            .inSingletonScope();
        this.context.injector
            .bind(LevelModel)
            .to(LevelModel)
            .inSingletonScope();
    }
}
