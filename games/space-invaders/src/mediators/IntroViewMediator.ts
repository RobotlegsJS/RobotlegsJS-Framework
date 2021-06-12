import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { IntroView } from "../views/IntroView";
import { FlowService } from "./../services/FlowService";
import { AtlasKeys } from "./../utils/AtlasKeys";

@injectable()
export class IntroViewMediator extends Mediator<IntroView> {
    @inject(FlowService) private flowService: FlowService;

    public initialize(): void {
        setTimeout(this.onTimerOut.bind(this), 3000);

        const loader = PIXI.loader
            .add(AtlasKeys.SPPNG)
            .add(AtlasKeys.SPXML)
            .load(this.onLoad);
    }
    public onLoad() {
        AtlasKeys.update();
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private onTimerOut() {
        this.flowService.setHomeView();
    }
}
