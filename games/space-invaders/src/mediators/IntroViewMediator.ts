import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { Loader } from "pixi.js";

import { IntroView } from "../views/IntroView";
import { FlowService } from "./../services/FlowService";
import { AtlasKeys } from "./../utils/AtlasKeys";

@injectable()
export class IntroViewMediator extends Mediator<IntroView> {
    @inject(FlowService)
    private _flowService: FlowService;

    public initialize(): void {
        setTimeout(this._onTimerOut.bind(this), 3000);

        Loader.shared.add(AtlasKeys.SPPNG).add(AtlasKeys.SPXML).load(this.onLoad);
    }

    public onLoad(): void {
        AtlasKeys.update();
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onTimerOut(): void {
        this._flowService.setHomeView();
    }
}
