import { IConfig, IContext, IEventCommandMap, inject, injectable } from "@robotlegsjs/core";
import { GameEvent } from "./../events/GameEvent";
import { CreateLevelCommand } from "./../game/commands/CreateLevelCommand";
import { GameOverCommand } from "./../game/commands/GameOverCommand";
import { RetryGameCommand } from "./../game/commands/RetryGameCommand";
import { SwapPiecesCommand } from "./../game/commands/SwapPiecesCommand";
import { SwapPiecesConfirmCommand } from "./../game/commands/SwapPiecesConfirmCommand";
import { GameManager } from "./../game/managers/GameManager";
import { GameStatus } from "./../game/models/GameStatus";
import { LevelModel } from "./../game/models/LevelModel";
import { SwapModel } from "./../game/models/SwapModel";
import { LevelsRepository } from "./../game/utils/LevelRepository";
import { PixiSpritePool } from "./../game/utils/PieceDisplayPool";
import { GameService } from "./../services/GameService";

@injectable()
export class GameConfig implements IConfig {
    @inject(IContext)
    private _context: IContext;

    @inject(IEventCommandMap)
    private _commandMap: IEventCommandMap;

    public configure(): void {
        PixiSpritePool.init();

        this._mapCommands();
        this._mapServices();
        this._mapManager();
        this._mapModels();
    }

    private _mapCommands(): void {
        this._commandMap.map(GameEvent.CREATE_LEVEL_COMMAND).toCommand(CreateLevelCommand);
        this._commandMap.map(GameEvent.GAME_OVER_COMMAND).toCommand(GameOverCommand);
        this._commandMap.map(GameEvent.RETRY_GAME_COMMAND).toCommand(RetryGameCommand);

        this._commandMap
            .map(GameEvent.SWAP_PIECES_CONFIRM_COMMAND)
            .toCommand(SwapPiecesConfirmCommand);
        this._commandMap.map(GameEvent.SWAP_PIECES_COMMAND).toCommand(SwapPiecesCommand);
    }

    private _mapServices(): void {
        this._context.injector.bind(GameService).to(GameService).inSingletonScope();
    }

    private _mapManager(): void {
        this._context.injector.bind(GameManager).to(GameManager).inSingletonScope();
        this._context.injector.bind(LevelsRepository).to(LevelsRepository).inSingletonScope();
    }

    private _mapModels(): void {
        this._context.injector.bind(GameStatus).to(GameStatus).inSingletonScope();
        this._context.injector.bind(LevelModel).to(LevelModel).inSingletonScope();
        this._context.injector.bind(SwapModel).to(SwapModel).inSingletonScope();
    }
}
