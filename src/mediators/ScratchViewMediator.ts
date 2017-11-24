import { Prizes } from "../utils/Prizes";
import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { TickManager } from "../managers/TickManager";
import { Model } from "../models/Model";
import { ScratchView } from "../views/ScratchView";

@injectable()
export class ScratchViewMediator extends Mediator<ScratchView> {
    @inject(Model) private model: Model;
    @inject(TickManager) private tickManager: TickManager;

    public initialize(): void {
        this.view.setupPrizes(Prizes.getNine());

        this.tickManager.getTick().add(this.onUpdate);
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
        this.tickManager.getTick().remove(this.onUpdate);
    }
    private onUpdate = () => {
        this.view.addScrach(this.model.posX, this.model.posY);
    };
}
