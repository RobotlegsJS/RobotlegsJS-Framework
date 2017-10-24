import { PalidorEvent } from "@robotlegsjs/pixi-palidor";
import { FlowEvent } from "./../events/FlowEvent";

import { injectable, inject, IEventDispatcher, EventDispatcher } from "@robotlegsjs/core";

@injectable()
export class FlowService {

    @inject(IEventDispatcher)
    public eventDispatcher: IEventDispatcher;

    // Views
    public setHomeView(): void {
        this.dispatchEventWith(FlowEvent.SHOW_HOME_VIEW);
    }

    public setGameView(): void {
        this.dispatchEventWith(FlowEvent.SHOW_GAME_VIEW);
    }

    public dispatchEventWith(type: string): void {
        (<EventDispatcher>this.eventDispatcher).dispatchEventWith(type);
    }
}
