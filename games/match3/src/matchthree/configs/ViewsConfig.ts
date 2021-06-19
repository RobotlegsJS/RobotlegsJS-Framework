import { IConfig, inject, injectable } from "@robotlegsjs/core";
import { IMediatorMap } from "@robotlegsjs/pixi";

import { YouWinPopupMediator } from ".././mediators/YouWinPopupMediator";
import { AlertPopupMediator } from "./../mediators/AlertPopupMediator";
import { GameOverPopupMediator } from "./../mediators/GameOverPopupMediator";
import { GameViewMediator } from "./../mediators/GameViewMediator";
import { GridFieldComponentMediator } from "./../mediators/GridFieldComponentMediator";
import { HomeViewMediator } from "./../mediators/HomeViewMediator";
import { HUDGameComponentMediator } from "./../mediators/HUDGameComponentMediator";
import { IntroViewMediator } from "./../mediators/IntroViewMediator";
import { LevelSelectViewMediator } from "./../mediators/LevelSelectViewMediator";
import { OptionsViewMediator } from "./../mediators/OptionsViewMediator";
import { PausePopupMediator } from "./../mediators/PausePopupMediator";
import { StartingPopupMediator } from "./../mediators/StartingPopupMediator";
import { AlertPopup } from "./../views/AlertPopup";
import { GridFieldComponent } from "./../views/components/GridFieldComponent";
import { HUDGameComponent } from "./../views/components/HUDGameComponent";
import { GameOverPopup } from "./../views/GameOverPopup";
import { GameView } from "./../views/GameView";
import { HomeView } from "./../views/HomeView";
import { IntroView } from "./../views/IntroView";
import { LevelSelectView } from "./../views/LevelSelectView";
import { OptionsView } from "./../views/OptionsView";
import { PausePopup } from "./../views/PausePopup";
import { StartingPopup } from "./../views/StartingPopup";
import { YouWinPopup } from "./../views/YouWinPopup";

@injectable()
export class ViewsConfig implements IConfig {
    @inject(IMediatorMap)
    private _mediatorMap: IMediatorMap;

    public configure(): void {
        this._mapMediators();
    }

    private _mapMediators(): void {
        this._mediatorMap.map(IntroView).toMediator(IntroViewMediator);
        this._mediatorMap.map(GameView).toMediator(GameViewMediator);
        this._mediatorMap.map(HomeView).toMediator(HomeViewMediator);
        this._mediatorMap.map(OptionsView).toMediator(OptionsViewMediator);
        this._mediatorMap.map(LevelSelectView).toMediator(LevelSelectViewMediator);

        this._mediatorMap.map(GridFieldComponent).toMediator(GridFieldComponentMediator);
        this._mediatorMap.map(HUDGameComponent).toMediator(HUDGameComponentMediator);

        this._mediatorMap.map(AlertPopup).toMediator(AlertPopupMediator);
        this._mediatorMap.map(GameOverPopup).toMediator(GameOverPopupMediator);
        this._mediatorMap.map(PausePopup).toMediator(PausePopupMediator);
        this._mediatorMap.map(StartingPopup).toMediator(StartingPopupMediator);
        this._mediatorMap.map(YouWinPopup).toMediator(YouWinPopupMediator);
    }
}
