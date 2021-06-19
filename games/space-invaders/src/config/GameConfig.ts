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
    @inject(IContext)
    private _context: IContext;

    @inject(IEventCommandMap)
    private _commandMap: IEventCommandMap;

    public configure(): void {
        EntityPool.init();
        LevelFactory.setupLevels();

        this._mapCommands();
        this._mapManager();
        this._mapModels();
    }

    private _mapCommands(): void {
        this._commandMap.map(GameEvent.START_GAME_COMMAND).toCommand(StartGameCommand);
        this._commandMap.map(GameEvent.RETRY_GAME_COMMAND).toCommand(RetryGameCommand);
        this._commandMap.map(GameEvent.CREATE_LEVEL_COMMAND).toCommand(CreateLevelCommand);
        this._commandMap.map(GameEvent.INCREASE_LEVEL_COMMAND).toCommand(IncreaseLevelCommand);
        this._commandMap.map(GameEvent.INCREASE_POINTS).toCommand(IncreasePointsCommand);
        this._commandMap.map(GameEvent.DECREASE_LIVES).toCommand(DecreaseLivesCommand);
        this._commandMap.map(GameEvent.GAME_OVER).toCommand(GameOverCommand);
    }

    private _mapManager(): void {
        this._context.injector.bind(GameService).to(GameService).inSingletonScope();
        this._context.injector.bind(GameManager).to(GameManager).inSingletonScope();
        // this.context.injector.bind( SharedObjectManager ).to(SharedObjectManager).inSingletonScope();*
    }

    private _mapModels(): void {
        this._context.injector.bind(GameModel).to(GameModel).inSingletonScope();
        this._context.injector.bind(LevelModel).to(LevelModel).inSingletonScope();
    }
}
