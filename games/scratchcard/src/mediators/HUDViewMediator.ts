import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { GameEvent } from "../events/GameEvent";
import { ScratchManager } from "../managers/ScratchManager";
import { TickManager } from "../managers/TickManager";
import { Model } from "../models/Model";
import { HUDView } from "../views/HUDView";

@injectable()
export class HUDViewMediator extends Mediator<HUDView> {
    @inject(Model)
    private _model: Model;

    @inject(TickManager)
    private _tickManager: TickManager;

    @inject(ScratchManager)
    private _scratchManager: ScratchManager;

    public initialize(): void {
        this.view.updateRemaining(this._model.attempts);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.START, this._onStart, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.END, this._onEnd, this);
        this.eventMap.on(this.view.playButton, "click", this._onPlayButton, this);
        this.eventMap.on(this.view.endButton, "click", this._onEndButton, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onStart(e: any): void {
        this.view.updateRemaining(this._model.attempts);
        this.view.scratchArea.buttonMode = true;
        this.view.scratchArea.interactive = true;
        this.eventMap.on(this.view.scratchArea, "mousedown", this._onMouseDown, this);
        this.eventMap.on(this.view.scratchArea, "mouseup", this._onMouseUp, this);
        this.eventMap.on(this.view.scratchArea, "mousemove", this._onMouseMove, this);
    }

    private _onEnd(e: any): void {
        this.view.updateRemaining(this._model.attempts);
        this.view.scratchArea.buttonMode = false;
        this.view.scratchArea.interactive = false;
        this.view.playButton.visible = true;
        this.view.endButton.visible = false;
        this.eventMap.off(this.view.scratchArea, "mousedown", this._onMouseDown, this);
        this.eventMap.off(this.view.scratchArea, "mouseup", this._onMouseUp, this);
        this.eventMap.off(this.view.scratchArea, "mousemove", this._onMouseMove, this);
        this._tickManager.stop();
    }

    private _onPlayButton(e: any): void {
        this.view.playButton.visible = false;
        this.view.endButton.visible = true;
        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.START_GAME_COMMAND));
    }

    private _onEndButton(e: any): void {
        this.view.playButton.visible = true;
        this.view.endButton.visible = false;
        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.END_GAME_COMMAND));
    }

    private _onMouseMove(e: any): void {
        const { x, y } = e.data.global;
        this._scratchManager.scratchPosition(x, y);
    }

    private _onMouseDown(e: any): void {
        this._tickManager.start();
    }

    private _onMouseUp(e: any): void {
        this._tickManager.stop();
    }
}
