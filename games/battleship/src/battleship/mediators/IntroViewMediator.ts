import { FlowService } from "./../services/FlowService";
import { AtlasKeys } from "./../utils/AtlasKeys";
import { IntroView } from "../views/IntroView";

import { Mediator } from "@robotlegsjs/pixi";
import { inject, injectable } from "@robotlegsjs/core";

@injectable()
export class IntroViewMediator extends Mediator<IntroView> {
    @inject(FlowService) public flowService: FlowService;

    public initialize(): void {
        setTimeout(this.onTimerOut.bind(this), 3000, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private onTimerOut() {
        this.flowService.setHomeView();
    }
}
