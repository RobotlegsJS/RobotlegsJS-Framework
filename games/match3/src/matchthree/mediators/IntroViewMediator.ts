import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { FlowService } from "../services/FlowService";
import { IntroView } from "../views/IntroView";

@injectable()
export class IntroViewMediator extends Mediator<IntroView> {
    @inject(FlowService)
    private _flowService: FlowService;

    public initialize(): void {
        setTimeout(this._onTimerOut.bind(this), 3000);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onTimerOut(): void {
        this._flowService.setHomeView();
    }
}
