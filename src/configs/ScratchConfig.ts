import { IConfig, IContext, IEventDispatcher, inject, injectable } from '@robotlegsjs/core';
import { IMediatorMap } from '@robotlegsjs/pixi';
import { IFlowManager } from '@robotlegsjs/pixi-palidor';

import { IntroViewMediator } from '../mediators/IntroViewMediator';
import { FlowEvent } from './../events/FlowEvent';
import { IntroView } from './../views/IntroView';

@injectable()
export class ScratchConfig implements IConfig {
    @inject(IContext) public context: IContext;
    @inject(IFlowManager) public flowManager: IFlowManager;
    @inject(IEventDispatcher) public dispatcher: IEventDispatcher;
    @inject(IMediatorMap) public mediatorMap: IMediatorMap;

    public configure(): void {
        this.mapPalidor();
        this.mapMediators();

        this.dispatcher.dispatchEvent(new FlowEvent(FlowEvent.SHOW_INTRO_VIEW));
    }
    private mapPalidor(): void {
        this.flowManager.map(FlowEvent.SHOW_INTRO_VIEW).toView(IntroView);
    }
    private mapMediators(): void {
        this.mediatorMap.map(IntroView).toMediator(IntroViewMediator);
    }
}
