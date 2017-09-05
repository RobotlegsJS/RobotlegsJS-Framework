import { AtlasKeys } from "./../utils/AtlasKeys";
import { FlowService } from "./../services/FlowService";
import { IntroView } from "../views/IntroView";

import { Mediator } from "@robotlegsjs/pixi";
import { inject, injectable } from "@robotlegsjs/core";

@injectable()
export class IntroViewMediator extends Mediator<IntroView> {

    @inject(FlowService)
    public flowService: FlowService;

    public initialize(): void {
        setTimeout(this.onTimerOut, 3000, this);

        let loader = PIXI.loader
            .add(AtlasKeys.SPPNG)
            .add(AtlasKeys.SPXML)
            .load(this.onLoad);
    }

    public onLoad = (loader: any, resources: any, obThis: any = this) => {
        AtlasKeys.update();
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private onTimerOut = (obThis: any) => {
        obThis.flowService.setHomeView();
    }
}
