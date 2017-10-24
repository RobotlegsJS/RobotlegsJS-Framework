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
}
