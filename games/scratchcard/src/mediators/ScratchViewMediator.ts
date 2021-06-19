import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { TickManager } from "../managers/TickManager";
import { Model } from "../models/Model";
import { ScratchView } from "../views/ScratchView";
import { GameEvent } from "./../events/GameEvent";

@injectable()
export class ScratchViewMediator extends Mediator<ScratchView> {
    @inject(Model)
    private _model: Model;

    @inject(TickManager)
    private _tickManager: TickManager;

    public initialize(): void {
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.START, this._onStart, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.END, this._onEnd, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
        this._tickManager.getTick().remove(this._onUpdate);
    }

    private _onStart(e: any): void {
        this.view.setupPrizes(this._model.prizes, this._model.matchedPrizes);

        this._tickManager.getTick().add(this._onUpdate);
    }

    private _onEnd(e: any): void {
        this.view.clearAll();
        this._tickManager.getTick().remove(this._onUpdate);
    }

    private _onUpdate = (): void => {
        this.view.addScrach(this._model.posX, this._model.posY);
    };
}
