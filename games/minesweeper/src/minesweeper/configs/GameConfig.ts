import { IConfig, IContext, IEventCommandMap, inject, injectable } from "@robotlegsjs/core";
import { GameEvent } from "./../events/GameEvent";
import { CreateLevelCommand } from "./../game/commands/CreateLevelCommand";
import { ExportLevelDataCommand } from "./../game/commands/ExportLevelDataCommand";
import { GameOverCommand } from "./../game/commands/GameOverCommand";
import { RetryGameCommand } from "./../game/commands/RetryGameCommand";
import { GameManager } from "./../game/managers/GameManager";
import { HighScoreManager } from "./../game/managers/HighScoreManager";
import { CustomLevelModel } from "./../game/models/CustomLevelModel";
import { GameStatus } from "./../game/models/GameStatus";
import { LevelModel } from "./../game/models/LevelModel";
import { GameService } from "./../services/GameService";

@injectable()
export class GameConfig implements IConfig {
    @inject(IContext)
    public context: IContext;

    @inject(IEventCommandMap)
    public commandMap: IEventCommandMap;

    public configure(): void {
        this._mapCommands();
        this._mapServices();
        this._mapManager();
        this._mapModels();
    }

    private _mapCommands(): void {
        this.commandMap.map(GameEvent.CREATE_LEVEL_COMMAND).toCommand(CreateLevelCommand);
        this.commandMap.map(GameEvent.GAME_OVER_COMMAND).toCommand(GameOverCommand);
        this.commandMap.map(GameEvent.RETRY_GAME_COMMAND).toCommand(RetryGameCommand);
        this.commandMap.map(GameEvent.EXPORT_LEVEL_DATA_COMMAND).toCommand(ExportLevelDataCommand);
    }

    private _mapServices(): void {
        this.context.injector.bind(GameService).to(GameService).inSingletonScope();
    }

    private _mapManager(): void {
        this.context.injector.bind(GameManager).to(GameManager).inSingletonScope();
        this.context.injector.bind(HighScoreManager).to(HighScoreManager).inSingletonScope();
    }

    private _mapModels(): void {
        this.context.injector.bind(GameStatus).to(GameStatus).inSingletonScope();
        this.context.injector.bind(LevelModel).to(LevelModel).inSingletonScope();
        this.context.injector.bind(CustomLevelModel).to(CustomLevelModel).inSingletonScope();
    }
}
