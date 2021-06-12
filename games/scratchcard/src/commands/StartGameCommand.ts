import { ICommand, IEventDispatcher, inject, injectable } from "@robotlegsjs/core";

import { GameEvent } from "../events/GameEvent";
import { ScratchManager } from "../managers/ScratchManager";
import { Model } from "./../models/Model";

@injectable()
export class StartGameCommand implements ICommand {
    @inject(IEventDispatcher) private eventDispatcher: IEventDispatcher;
    @inject(ScratchManager) private scratchManager: ScratchManager;
    @inject(Model) private model: Model;

    public execute(): void {
        if (this.model.attempts === 0) {
            return;
        }
        this.model.decreaseAttemps();
        this.scratchManager.create();
        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.START));
    }
}
