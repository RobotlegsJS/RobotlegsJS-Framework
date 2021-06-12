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
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.START, this.onStart, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.END, this.onEnd, this);
        this.eventMap.mapListener(this.view.playButton, "click", this.onPlayButton, this);
        this.eventMap.mapListener(this.view.endButton, "click", this.onEndButton, this);
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private onStart(e: any): void {
        this.view.updateRemaining(this.model.attempts);
        this.view.scratchArea.buttonMode = true;
        this.view.scratchArea.interactive = true;
        this.eventMap.mapListener(this.view.scratchArea, "mousedown", this.onMouseDown, this);
        this.eventMap.mapListener(this.view.scratchArea, "mouseup", this.onMouseUp, this);
        this.eventMap.mapListener(this.view.scratchArea, "mousemove", this.onMouseMove, this);
    }
    private onEnd(e: any): void {
        this.view.updateRemaining(this.model.attempts);
        this.view.scratchArea.buttonMode = false;
        this.view.scratchArea.interactive = false;
        this.view.playButton.visible = true;
        this.view.endButton.visible = false;
        this.eventMap.unmapListener(this.view.scratchArea, "mousedown", this.onMouseDown, this);
        this.eventMap.unmapListener(this.view.scratchArea, "mouseup", this.onMouseUp, this);
        this.eventMap.unmapListener(this.view.scratchArea, "mousemove", this.onMouseMove, this);
        this.tickManager.stop();
    }
    private onPlayButton(e: any): void {
        this.view.playButton.visible = false;
        this.view.endButton.visible = true;
        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.START_GAME_COMMAND));
    }
    private onEndButton(e: any): void {
        this.view.playButton.visible = true;
        this.view.endButton.visible = false;
        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.END_GAME_COMMAND));
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
