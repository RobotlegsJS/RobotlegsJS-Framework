import { IConfig, IContext, IEventDispatcher, inject, injectable } from "@robotlegsjs/core";
import { IMediatorMap } from "@robotlegsjs/pixi";
import { IFlowManager } from "@robotlegsjs/pixi-palidor";

import { ScratchManager } from "../managers/ScratchManager";
import { HUDViewMediator } from "../mediators/HUDViewMediator";
import { IntroViewMediator } from "../mediators/IntroViewMediator";
import { ScratchView } from "../views/ScratchView";
import { FlowEvent } from "./../events/FlowEvent";
import { TickManager } from "./../managers/TickManager";
import { MainViewMediator } from "./../mediators/MainViewMediator";
import { ScratchViewMediator } from "./../mediators/ScratchViewMediator";
import { Model } from "./../models/Model";
import { HUDView } from "./../views/HUDView";
import { IntroView } from "./../views/IntroView";
import { MainView } from "./../views/MainView";

@injectable()
export class ScratchConfig implements IConfig {
    @inject(IContext) public context: IContext;
    @inject(IFlowManager) public flowManager: IFlowManager;
    @inject(IEventDispatcher) public dispatcher: IEventDispatcher;
    @inject(IMediatorMap) public mediatorMap: IMediatorMap;

    public configure(): void {
        this.mapPalidor();
        this.mapMediators();
        this.mapSingletons();

        this.dispatcher.dispatchEvent(new FlowEvent(FlowEvent.SHOW_INTRO_VIEW));
    }
    private mapPalidor(): void {
        this.flowManager.map(FlowEvent.SHOW_INTRO_VIEW).toView(IntroView);
        this.flowManager.map(FlowEvent.SHOW_MAIN_VIEW).toView(MainView);
    }
    private mapMediators(): void {
        this.mediatorMap.map(IntroView).toMediator(IntroViewMediator);
        this.mediatorMap.map(MainView).toMediator(MainViewMediator);
        this.mediatorMap.map(HUDView).toMediator(HUDViewMediator);
        this.mediatorMap.map(ScratchView).toMediator(ScratchViewMediator);
    }
    private mapSingletons(): void {
        this.mapSingleton(TickManager);
        this.mapSingleton(ScratchManager);
        this.mapSingleton(Model);
    }
    private mapSingleton(clazz: any): void {
        this.context.injector
            .bind(clazz)
            .to(clazz)
            .inSingletonScope();
    }
}
