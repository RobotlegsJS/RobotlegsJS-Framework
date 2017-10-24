import { PlayerComponentMediator } from "./../mediators/PlayerComponentMediator";
import { PlayerComponent } from "../views/components/PlayerComponent";
import { GameViewMediator } from "../mediators/GameViewMediator";
import { GameView } from "./../views/GameView";
import { HomeViewMediator } from "./../mediators/HomeViewMediator";
import { HomeView } from "../views/HomeView";
import { IntroViewMediator } from "./../mediators/IntroViewMediator";
import { IntroView } from "./../views/IntroView";
import { IConfig, injectable, inject, IEventCommandMap, IContext } from "@robotlegsjs/core";
import { IMediatorMap } from "@robotlegsjs/pixi";

@injectable()
export class ViewsConfig implements IConfig {
    @inject(IMediatorMap) public mediatorMap: IMediatorMap;
    public configure(): void {
        this.mapMediators();
    }

    public mapMediators(): void {
        this.mediatorMap.map(IntroView).toMediator(IntroViewMediator);
        this.mediatorMap.map(HomeView).toMediator(HomeViewMediator);
        this.mediatorMap.map(GameView).toMediator(GameViewMediator);

        this.mediatorMap.map(PlayerComponent).toMediator(PlayerComponentMediator);
    }
}
