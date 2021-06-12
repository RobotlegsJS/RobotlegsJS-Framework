import { PausePopupMediator } from "./../mediators/PausePopupMediator";
import { PausePopup } from "../views/PausePopup";
import { YouWinPopup } from "../views/YouWinPopup";
import { YouWinPopupMediator } from "./../mediators/YouWinPopupMediator";
import { GameOverPopupMediator } from "../mediators/GameOverPopupMediator";
import { GameOverPopup } from "./../views/GameOverPopup";
import { EnemyTileDisplay } from "./../views/components/EnemyTileDisplay";
import { EnemyComponentMediator } from "./../mediators/EnemyComponentMediator";
import { EnemyComponent } from "../views/components/EnemyComponent";
import { EnemyTileDisplayMediator } from "./../mediators/EnemyTileDisplayMediator";
import { HeroComponentMediator } from "./../mediators/HeroComponentMediator";
import { HeroComponent } from "../views/components/HeroComponent";
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

        this.mediatorMap.map(HeroComponent).toMediator(HeroComponentMediator);
        this.mediatorMap.map(EnemyComponent).toMediator(EnemyComponentMediator);

        this.mediatorMap.map(EnemyTileDisplay).toMediator(EnemyTileDisplayMediator);

        this.mediatorMap.map(GameOverPopup).toMediator(GameOverPopupMediator);
        this.mediatorMap.map(YouWinPopup).toMediator(YouWinPopupMediator);
        this.mediatorMap.map(PausePopup).toMediator(PausePopupMediator);
    }
}
