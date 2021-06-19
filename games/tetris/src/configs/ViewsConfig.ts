import { IConfig, inject, injectable } from "@robotlegsjs/core";
import { IMediatorMap } from "@robotlegsjs/pixi";

import { GameOverPopupMediator } from "./../mediators/GameOverPopupMediator";
import { GameViewMediator } from "./../mediators/GameViewMediator";
import { GridComponentMediator } from "./../mediators/GridComponentMediator";
import { HomeViewMediator } from "./../mediators/HomeViewMediator";
import { HUDGameComponentMediator } from "./../mediators/HUDGameComponentMediator";
import { InfoPopupMediator } from "./../mediators/InfoPopupMediator";
import { IntroViewMediator } from "./../mediators/IntroViewMediator";
import { NextPieceComponentMediator } from "./../mediators/NextPieceComponentMediator";
import { OptionsViewMediator } from "./../mediators/OptionsViewMediator";
import { PausePopupMediator } from "./../mediators/PausePopupMediator";
import { ResetConfirmPopupMediator } from "./../mediators/ResetConfirmPopupMediator";
import { StartingPopupMediator } from "./../mediators/StartingPopupMediator";
import { GridComponent } from "./../views/components/GridComponent";
import { HUDGameComponent } from "./../views/components/HUDGameComponent";
import { NextPieceComponent } from "./../views/components/NextPieceComponent";
import { GameOverPopup } from "./../views/GameOverPopup";
import { GameView } from "./../views/GameView";
import { HomeView } from "./../views/HomeView";
import { InfoPopup } from "./../views/InfoPopup";
import { IntroView } from "./../views/IntroView";
import { OptionsView } from "./../views/OptionsView";
import { PausePopup } from "./../views/PausePopup";
import { ResetConfirmPopup } from "./../views/ResetConfirmPopup";
import { StartingPopup } from "./../views/StartingPopup";

@injectable()
export class ViewsConfig implements IConfig {
    @inject(IMediatorMap)
    private _mediatorMap: IMediatorMap;

    public configure(): void {
        this._mapMediators();
    }

    private _mapMediators(): void {
        this._mediatorMap.map(GameView).toMediator(GameViewMediator);
        this._mediatorMap.map(HomeView).toMediator(HomeViewMediator);
        this._mediatorMap.map(IntroView).toMediator(IntroViewMediator);
        this._mediatorMap.map(OptionsView).toMediator(OptionsViewMediator);

        this._mediatorMap.map(GridComponent).toMediator(GridComponentMediator);
        this._mediatorMap.map(HUDGameComponent).toMediator(HUDGameComponentMediator);
        this._mediatorMap.map(NextPieceComponent).toMediator(NextPieceComponentMediator);

        this._mediatorMap.map(GameOverPopup).toMediator(GameOverPopupMediator);
        this._mediatorMap.map(InfoPopup).toMediator(InfoPopupMediator);
        this._mediatorMap.map(PausePopup).toMediator(PausePopupMediator);
        this._mediatorMap.map(ResetConfirmPopup).toMediator(ResetConfirmPopupMediator);
        this._mediatorMap.map(StartingPopup).toMediator(StartingPopupMediator);
    }
}
