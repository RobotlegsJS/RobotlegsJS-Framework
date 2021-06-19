import { IConfig, IContext, IEventCommandMap, inject, injectable } from "@robotlegsjs/core";
import { GameEvent } from "../events/GameEvent";
import { CreateLevelCommand } from "../game/commands/CreateLevelCommand";
import { EnemyAttackCommand } from "../game/commands/EnemyAttackCommand";
import { HeroAttackCommand } from "../game/commands/HeroAttackCommand";
import { GameManager } from "../game/managers/GameManager";
import { LevelModel } from "../game/models/LevelModel";
import { GameService } from "../services/GameService";

@injectable()
export class GameConfig implements IConfig {
    @inject(IContext)
    public context: IContext;

    @inject(IEventCommandMap)
    public commandMap: IEventCommandMap;

    public configure(): void {
        this._mapModels();
        this._mapManagers();
        this._mapCommands();
        this._mapServices();
    }

    private _mapManagers(): void {
        this.context.injector.bind(GameManager).to(GameManager).inSingletonScope();
    }

    private _mapModels(): void {
        this.context.injector.bind(LevelModel).to(LevelModel).inSingletonScope();
    }
    private _mapServices(): void {
        this.context.injector.bind(GameService).to(GameService).inSingletonScope();
    }

    private _mapCommands(): void {
        this.commandMap.map(GameEvent.CREATE_LEVEL_COMMAND).toCommand(CreateLevelCommand);
        this.commandMap.map(GameEvent.ENEMY_ATTACK_COMMAND).toCommand(EnemyAttackCommand);
        this.commandMap.map(GameEvent.HERO_ATTACK_COMMAND).toCommand(HeroAttackCommand);
    }
}
