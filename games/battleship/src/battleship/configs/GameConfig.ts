import { HeroAttackCommand } from "../game/commands/HeroAttackCommand";
import { EnemyAttackCommand } from "./../game/commands/EnemyAttackCommand";
import { GameService } from "../services/GameService";
import { GameEvent } from "./../events/GameEvent";
import { CreateLevelCommand } from "../game/commands/CreateLevelCommand";
import { GameManager } from "../game/managers/GameManager";
import { LevelModel } from "./../game/models/LevelModel";
import { IConfig, injectable, inject, IEventCommandMap, IContext } from "@robotlegsjs/core";

@injectable()
export class GameConfig implements IConfig {
    @inject(IContext) public context: IContext;

    @inject(IEventCommandMap) public commandMap: IEventCommandMap;

    public configure(): void {
        this.mapModels();
        this.mapManagers();
        this.mapCommands();
        this.mapServices();
    }

    private mapManagers(): void {
        this.context.injector
            .bind(GameManager)
            .to(GameManager)
            .inSingletonScope();
    }

    private mapModels(): void {
        this.context.injector
            .bind(LevelModel)
            .to(LevelModel)
            .inSingletonScope();
    }
    private mapServices(): void {
        this.context.injector
            .bind(GameService)
            .to(GameService)
            .inSingletonScope();
    }

    private mapCommands(): void {
        this.commandMap.map(GameEvent.CREATE_LEVEL_COMMAND).toCommand(CreateLevelCommand);
        this.commandMap.map(GameEvent.ENEMY_ATTACK_COMMAND).toCommand(EnemyAttackCommand);
        this.commandMap.map(GameEvent.HERO_ATTACK_COMMAND).toCommand(HeroAttackCommand);
    }
}
