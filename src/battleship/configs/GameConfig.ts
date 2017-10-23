import { IConfig, injectable, inject, IEventCommandMap, IContext } from "@robotlegsjs/core";

@injectable()
export class GameConfig implements IConfig {
    @inject(IContext) public context: IContext;

    @inject(IEventCommandMap) public commandMap: IEventCommandMap;

    public configure(): void {}
}
