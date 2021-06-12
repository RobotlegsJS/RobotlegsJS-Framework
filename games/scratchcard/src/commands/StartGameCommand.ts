import { ICommand, IEventDispatcher, inject, injectable } from "@robotlegsjs/core";

import { GameEvent } from "../events/GameEvent";
import { ScratchManager } from "../managers/ScratchManager";
import { Model } from "./../models/Model";

@injectable()
export class StartGameCommand implements ICommand {
    @inject(IEventDispatcher)
    private _eventDispatcher: IEventDispatcher;

    @inject(ScratchManager)
    private _scratchManager: ScratchManager;

    @inject(Model)
    private _model: Model;

    public execute(): void {
        if (this._model.attempts === 0) {
            return;
        }
        this._model.decreaseAttemps();
        this._scratchManager.create();
        this._eventDispatcher.dispatchEvent(new GameEvent(GameEvent.START));
    }
}
