import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { Loader } from "pixi.js";
import { FlowService } from "../services/FlowService";
import { AtlasKeys } from "../utils/AtlasKeys";
import { IntroView } from "../views/IntroView";

@injectable()
export class IntroViewMediator extends Mediator<IntroView> {
    @inject(FlowService)
    private _flowService: FlowService;

    public initialize(): void {
        setTimeout(this._onTimerOut.bind(this), 3000, this);

        Loader.shared.add(AtlasKeys.ATLAS_PNG).add(AtlasKeys.ATLAS_XML).load(this._onLoad);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onLoad(): void {
        AtlasKeys.update();
    }

    private _onTimerOut(): void {
        this._flowService.setHomeView();
    }
}
