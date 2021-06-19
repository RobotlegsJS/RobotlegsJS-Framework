import { IConfig, inject, injectable } from "@robotlegsjs/core";
import { IMediatorMap } from "@robotlegsjs/pixi";
import { YouWinPopupMediator } from ".././mediators/YouWinPopupMediator";
import { GameOverPopupMediator } from "../mediators/GameOverPopupMediator";
import { GameViewMediator } from "../mediators/GameViewMediator";
import { GridFieldComponentMediator } from "../mediators/GridFieldComponentMediator";
import { HomeViewMediator } from "../mediators/HomeViewMediator";
import { HUDGameComponentMediator } from "../mediators/HUDGameComponentMediator";
import { IntroViewMediator } from "../mediators/IntroViewMediator";
import { LevelCustomOptionsViewMediator } from "../mediators/LevelCustomOptionsViewMediator";
import { LevelSelectViewMediator } from "../mediators/LevelSelectViewMediator";
import { PausePopupMediator } from "../mediators/PausePopupMediator";
import { StartingPopupMediator } from "../mediators/StartingPopupMediator";
import { TileDisplayMediator } from "../mediators/TileDisplayMediator";
import { GridFieldComponent } from "../views/components/GridFieldComponent";
import { HUDGameComponent } from "../views/components/HUDGameComponent";
import { TileDisplay } from "../views/components/TileDisplay";
import { GameOverPopup } from "../views/GameOverPopup";
import { GameView } from "../views/GameView";
import { HomeView } from "../views/HomeView";
import { IntroView } from "../views/IntroView";
import { LevelCustomOptionsView } from "../views/LevelCustomOptionsView";
import { LevelSelectView } from "../views/LevelSelectView";
import { PausePopup } from "../views/PausePopup";
import { StartingPopup } from "../views/StartingPopup";
import { YouWinPopup } from "../views/YouWinPopup";

@injectable()
export class ViewsConfig implements IConfig {
    @inject(IMediatorMap)
    public mediatorMap: IMediatorMap;

    public configure(): void {
        this._mapMediators();
    }

    private _mapMediators(): void {
        this.mediatorMap.map(TileDisplay).toMediator(TileDisplayMediator);

        this.mediatorMap.map(IntroView).toMediator(IntroViewMediator);
        this.mediatorMap.map(GameView).toMediator(GameViewMediator);
        this.mediatorMap.map(HomeView).toMediator(HomeViewMediator);
        this.mediatorMap.map(LevelSelectView).toMediator(LevelSelectViewMediator);
        this.mediatorMap.map(LevelCustomOptionsView).toMediator(LevelCustomOptionsViewMediator);

        this.mediatorMap.map(GridFieldComponent).toMediator(GridFieldComponentMediator);
        this.mediatorMap.map(HUDGameComponent).toMediator(HUDGameComponentMediator);

        this.mediatorMap.map(GameOverPopup).toMediator(GameOverPopupMediator);
        this.mediatorMap.map(PausePopup).toMediator(PausePopupMediator);
        this.mediatorMap.map(StartingPopup).toMediator(StartingPopupMediator);
        this.mediatorMap.map(YouWinPopup).toMediator(YouWinPopupMediator);
    }
}
