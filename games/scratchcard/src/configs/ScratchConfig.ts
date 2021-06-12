import {
    IConfig,
    IContext,
    IEventCommandMap,
    IEventDispatcher,
    inject,
    injectable
} from "@robotlegsjs/core";
import { IMediatorMap } from "@robotlegsjs/pixi";
import { IFlowManager } from "@robotlegsjs/pixi-palidor";

import { ScratchManager } from "../managers/ScratchManager";
import { FeedbackPopupMediator } from "../mediators/FeedbackPopupMediator";
import { HUDViewMediator } from "../mediators/HUDViewMediator";
import { IntroViewMediator } from "../mediators/IntroViewMediator";
import { ScratchView } from "../views/ScratchView";
import { EndGameCommand } from "./../commands/EndGameCommand";
import { StartGameCommand } from "./../commands/StartGameCommand";
import { FlowEvent } from "./../events/FlowEvent";
import { GameEvent } from "./../events/GameEvent";
import { TickManager } from "./../managers/TickManager";
import { MainViewMediator } from "./../mediators/MainViewMediator";
import { ScratchViewMediator } from "./../mediators/ScratchViewMediator";
import { Model } from "./../models/Model";
import { FeedbackPopup } from "./../views/FeedbackPopup";
import { HUDView } from "./../views/HUDView";
import { IntroView } from "./../views/IntroView";
import { MainView } from "./../views/MainView";

@injectable()
export class ScratchConfig implements IConfig {
    @inject(IContext)
    public context: IContext;

    @inject(IFlowManager)
    public flowManager: IFlowManager;

    @inject(IEventDispatcher)
    public dispatcher: IEventDispatcher;

    @inject(IMediatorMap)
    public mediatorMap: IMediatorMap;

    @inject(IEventCommandMap)
    private _commandMap: IEventCommandMap;

    public configure(): void {
        this._mapPalidor();
        this._mapMediators();
        this._mapCommands();
        this._mapSingletons();

        this.dispatcher.dispatchEvent(new FlowEvent(FlowEvent.SHOW_INTRO_VIEW));
    }

    private _mapPalidor(): void {
        this.flowManager.map(FlowEvent.SHOW_INTRO_VIEW).toView(IntroView);
        this.flowManager.map(FlowEvent.SHOW_MAIN_VIEW).toView(MainView);
        this.flowManager.map(FlowEvent.SHOW_FEEDBACK).toFloatingView(FeedbackPopup);
    }

    private _mapMediators(): void {
        this.mediatorMap.map(IntroView).toMediator(IntroViewMediator);
        this.mediatorMap.map(MainView).toMediator(MainViewMediator);
        this.mediatorMap.map(HUDView).toMediator(HUDViewMediator);
        this.mediatorMap.map(ScratchView).toMediator(ScratchViewMediator);
        this.mediatorMap.map(FeedbackPopup).toMediator(FeedbackPopupMediator);
    }

    private _mapCommands(): void {
        this._commandMap.map(GameEvent.START_GAME_COMMAND).toCommand(StartGameCommand);
        this._commandMap.map(GameEvent.END_GAME_COMMAND).toCommand(EndGameCommand);
    }

    private _mapSingletons(): void {
        this._mapSingleton(TickManager);
        this._mapSingleton(ScratchManager);
        this._mapSingleton(Model);
    }

    private _mapSingleton(clazz: any): void {
        this.context.injector.bind(clazz).to(clazz).inSingletonScope();
    }
}
