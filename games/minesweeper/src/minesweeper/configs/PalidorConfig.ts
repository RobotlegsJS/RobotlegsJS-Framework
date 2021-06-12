import { IConfig, IContext, IEventDispatcher, inject, injectable } from "@robotlegsjs/core";
import { IFlowManager } from "@robotlegsjs/pixi-palidor";

import { YouWinPopup } from "../views/YouWinPopup";
import { FlowEvent } from "./../events/FlowEvent";
import { FlowService } from "./../services/FlowService";
import { GameOverPopup } from "./../views/GameOverPopup";
import { GameView } from "./../views/GameView";
import { HomeView } from "./../views/HomeView";
import { IntroView } from "./../views/IntroView";
import { LevelCustomOptionsView } from "./../views/LevelCustomOptionsView";
import { LevelSelectView } from "./../views/LevelSelectView";
import { PausePopup } from "./../views/PausePopup";
import { StartingPopup } from "./../views/StartingPopup";

@injectable()
export class PalidorConfig implements IConfig {
    @inject(IContext) public context: IContext;
    @inject(IFlowManager) public flowManager: IFlowManager;
    @inject(IEventDispatcher) public dispatcher: IEventDispatcher;

    public configure(): void {
        this.mapPalidor();

        this.dispatcher.dispatchEvent(new FlowEvent(FlowEvent.SHOW_INTRO_VIEW));
    }
    private mapPalidor(): void {
        this.context.injector
            .bind(FlowService)
            .to(FlowService)
            .inSingletonScope();

        this.flowManager.map(FlowEvent.SHOW_GAME_VIEW).toView(GameView);
        this.flowManager.map(FlowEvent.SHOW_HOME_VIEW).toView(HomeView);
        this.flowManager.map(FlowEvent.SHOW_INTRO_VIEW).toView(IntroView);
        this.flowManager.map(FlowEvent.SHOW_LEVEL_SELECT_VIEW).toView(LevelSelectView);
        this.flowManager.map(FlowEvent.SHOW_LEVEL_CUSTOM_OPTIONS_VIEW).toView(LevelCustomOptionsView);

        this.flowManager.map(FlowEvent.SHOW_GAME_OVER_POPUP).toFloatingView(GameOverPopup);
        this.flowManager.map(FlowEvent.SHOW_PAUSE_POPUP).toFloatingView(PausePopup);
        this.flowManager.map(FlowEvent.SHOW_STARTING_POPUP).toFloatingView(StartingPopup);
        this.flowManager.map(FlowEvent.SHOW_YOU_WIN_POPUP).toFloatingView(YouWinPopup);
    }
}
