import { injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { FlowEvent } from "../events/FlowEvent";
import { IntroView } from "../views/IntroView";

@injectable()
export class IntroViewMediator extends Mediator<IntroView> {
    public initialize(): void {
        setTimeout(this._onTimerOut.bind(this), 3000, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onTimerOut(): void {
        this.eventDispatcher.dispatchEvent(new FlowEvent(FlowEvent.SHOW_MAIN_VIEW));
    }
}
