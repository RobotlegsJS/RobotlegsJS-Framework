import { IConfig, IContext, IEventCommandMap, inject, injectable } from "@robotlegsjs/core";
import { CreateLevelCommand } from "../commands/CreateLevelCommand";
import { GameOverCommand } from "../commands/GameOverCommand";
import { GetNextPieceCommand } from "../commands/GetNextPieceCommand";
import { IncreasePointsCommand } from "../commands/IncreasePointsCommand";
import { GameEvent } from "../events/GameEvent";
import { GameManager } from "../managers/GameManager";
import { GameModel } from "../models/GameModel";
import { GameService } from "../services/GameService";
import { TilePool } from "../utils/TilePool";

@injectable()
export class GameConfig implements IConfig {
    @inject(IContext)
    private _context: IContext;

    @inject(IEventCommandMap)
    private _commandMap: IEventCommandMap;

    public configure(): void {
        TilePool.init();

        this._mapCommands();
        this._mapManager();
        this._mapModels();
    }

    private _mapCommands(): void {
        this._commandMap.map(GameEvent.CREATE_LEVEL).toCommand(CreateLevelCommand);
        this._commandMap.map(GameEvent.GAME_OVER).toCommand(GameOverCommand);
        this._commandMap.map(GameEvent.GET_NEXT_PIECE).toCommand(GetNextPieceCommand);
        this._commandMap.map(GameEvent.INCREASE_POINTS).toCommand(IncreasePointsCommand);
    }

    private _mapManager(): void {
        this._context.injector.bind(GameService).to(GameService).inSingletonScope();
        this._context.injector.bind(GameManager).to(GameManager).inSingletonScope();
        // this.context.injector.bind( SharedObjectManager ).to(SharedObjectManager).inSingletonScope();*
    }

    private _mapModels(): void {
        this._context.injector.bind(GameModel).to(GameModel).inSingletonScope();
    }
}
