import { IConfig, IContext, IEventDispatcher, inject, injectable } from "@robotlegsjs/core";
import { IFlowManager } from "@robotlegsjs/pixi-palidor";
import { YouWinPopup } from "../views/YouWinPopup";
import { FlowEvent } from "./../events/FlowEvent";
import { FlowService } from "./../services/FlowService";
import { AlertPopup } from "./../views/AlertPopup";
import { GameOverPopup } from "./../views/GameOverPopup";
import { GameView } from "./../views/GameView";
import { HomeView } from "./../views/HomeView";
import { IntroView } from "./../views/IntroView";
import { LevelSelectView } from "./../views/LevelSelectView";
import { OptionsView } from "./../views/OptionsView";
import { PausePopup } from "./../views/PausePopup";
import { StartingPopup } from "./../views/StartingPopup";

@injectable()
export class PalidorConfig implements IConfig {
    @inject(IContext)
    private _context: IContext;

    @inject(IFlowManager)
    private _flowManager: IFlowManager;

    @inject(IEventDispatcher)
    private _eventDispatcher: IEventDispatcher;

    public configure(): void {
        this._mapPalidor();
        this._eventDispatcher.dispatchEvent(new FlowEvent(FlowEvent.SHOW_INTRO_VIEW));
    }

    private _mapPalidor(): void {
        this._context.injector.bind(FlowService).to(FlowService).inSingletonScope();

        this._flowManager.map(FlowEvent.SHOW_GAME_VIEW).toView(GameView);
        this._flowManager.map(FlowEvent.SHOW_HOME_VIEW).toView(HomeView);
        this._flowManager.map(FlowEvent.SHOW_INTRO_VIEW).toView(IntroView);
        this._flowManager.map(FlowEvent.SHOW_LEVEL_SELECT_VIEW).toView(LevelSelectView);
        this._flowManager.map(FlowEvent.SHOW_OPTIONS_VIEW).toView(OptionsView);

        this._flowManager.map(FlowEvent.SHOW_ALERT_POPUP).toFloatingView(AlertPopup);
        this._flowManager.map(FlowEvent.SHOW_GAME_OVER_POPUP).toFloatingView(GameOverPopup);
        this._flowManager.map(FlowEvent.SHOW_PAUSE_POPUP).toFloatingView(PausePopup);
        this._flowManager.map(FlowEvent.SHOW_STARTING_POPUP).toFloatingView(StartingPopup);
        this._flowManager.map(FlowEvent.SHOW_YOU_WIN_POPUP).toFloatingView(YouWinPopup);
    }
}
