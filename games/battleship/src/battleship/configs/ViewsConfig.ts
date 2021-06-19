import { IConfig, inject, injectable } from "@robotlegsjs/core";
import { IMediatorMap } from "@robotlegsjs/pixi";
import { EnemyComponentMediator } from "../mediators/EnemyComponentMediator";
import { EnemyTileDisplayMediator } from "../mediators/EnemyTileDisplayMediator";
import { GameOverPopupMediator } from "../mediators/GameOverPopupMediator";
import { GameViewMediator } from "../mediators/GameViewMediator";
import { HeroComponentMediator } from "../mediators/HeroComponentMediator";
import { HomeViewMediator } from "../mediators/HomeViewMediator";
import { IntroViewMediator } from "../mediators/IntroViewMediator";
import { PausePopupMediator } from "../mediators/PausePopupMediator";
import { YouWinPopupMediator } from "../mediators/YouWinPopupMediator";
import { EnemyComponent } from "../views/components/EnemyComponent";
import { EnemyTileDisplay } from "../views/components/EnemyTileDisplay";
import { HeroComponent } from "../views/components/HeroComponent";
import { GameOverPopup } from "../views/GameOverPopup";
import { GameView } from "../views/GameView";
import { HomeView } from "../views/HomeView";
import { IntroView } from "../views/IntroView";
import { PausePopup } from "../views/PausePopup";
import { YouWinPopup } from "../views/YouWinPopup";

@injectable()
export class ViewsConfig implements IConfig {
    @inject(IMediatorMap)
    public mediatorMap: IMediatorMap;

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
