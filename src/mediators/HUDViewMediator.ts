import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { Model } from "../models/Model";
import { GameEvent } from "./../events/GameEvent";
import { ScratchManager } from "./../managers/ScratchManager";
import { TickManager } from "./../managers/TickManager";
import { HUDView } from "./../views/HUDView";

@injectable()
export class HUDViewMediator extends Mediator<HUDView> {
    @inject(Model) private model: Model;
    @inject(TickManager) private tickManager: TickManager;
    @inject(ScratchManager) private scratchManager: ScratchManager;

    public initialize(): void {
        this.view.updateRemaining(this.model.attempts);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.UPDATE, this.onUpdate, this);
        this.eventMap.mapListener(this.view.button, "click", this.onClick, this);
        this.eventMap.mapListener(this.view.scratchArea, "mousedown", this.onMouseDown, this);
        this.eventMap.mapListener(this.view.scratchArea, "mouseup", this.onMouseUp, this);
        this.eventMap.mapListener(this.view.scratchArea, "mousemove", this.onMouseMove, this);
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private onUpdate(e: any): void {
        this.view.updateRemaining(this.model.attempts);
    }
    private onClick(e: any): void {
        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.START_GAME_COMMAND));
    }
    private onMouseMove(e: any): void {
        const { x, y } = e.data.global;
        this.scratchManager.scratchPosition(x, y);
    }
    private onMouseDown(e: any): void {
        this.tickManager.start();
    }
    private onMouseUp(e: any): void {
        this.tickManager.stop();
    }
}
