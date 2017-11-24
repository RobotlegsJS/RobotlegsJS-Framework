import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { TickManager } from "../managers/TickManager";
import { Model } from "../models/Model";
import { Prizes } from "../utils/Prizes";
import { ScratchView } from "../views/ScratchView";
import { GameEvent } from "./../events/GameEvent";

@injectable()
export class ScratchViewMediator extends Mediator<ScratchView> {
    @inject(Model) private model: Model;
    @inject(TickManager) private tickManager: TickManager;

    public initialize(): void {
        this.view.setupPrizes(Prizes.getNine());

        this.tickManager.getTick().add(this.onUpdate);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.CLEAR_ALL, this.onClearAll, this);
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
        this.tickManager.getTick().remove(this.onUpdate);
    }
    private onClearAll(): void {
        this.view.clearAll();
    }
    private onUpdate = () => {
        this.view.addScrach(this.model.posX, this.model.posY);
    };
}
