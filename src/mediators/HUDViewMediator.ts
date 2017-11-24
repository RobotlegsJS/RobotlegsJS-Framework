import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { Model } from "../models/Model";
import { HUDView } from "./../views/HUDView";

@injectable()
export class HUDViewMediator extends Mediator<HUDView> {
    @inject(Model) private model: Model;
    public initialize(): void {
        this.view.updateRemaining(this.model.attempts);
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
}
