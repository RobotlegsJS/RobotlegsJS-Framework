import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { TickManager } from "../managers/TickManager";
import { Model } from "../models/Model";
import { ScratchView } from "../views/ScratchView";
import { GameEvent } from "./../events/GameEvent";

@injectable()
export class ScratchViewMediator extends Mediator<ScratchView> {
    @inject(Model) private model: Model;
    @inject(TickManager) private tickManager: TickManager;

    public initialize(): void {
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.START, this.onStart, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.END, this.onEnd, this);
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
        this.tickManager.getTick().remove(this.onUpdate);
    }
    private onStart(e: any): void {
        this.view.setupPrizes(this.model.prizes, this.model.matchedPrizes);

        this.tickManager.getTick().add(this.onUpdate);
    }
    private onEnd(e: any): void {
        this.view.clearAll();
        this.tickManager.getTick().remove(this.onUpdate);
    }
    private onUpdate = () => {
        this.view.addScrach(this.model.posX, this.model.posY);
    };
}
