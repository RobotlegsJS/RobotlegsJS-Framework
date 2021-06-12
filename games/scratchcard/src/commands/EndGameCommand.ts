import { ICommand, IEventDispatcher, inject, injectable } from "@robotlegsjs/core";

import { FlowEvent } from "./../events/FlowEvent";
import { GameEvent } from "./../events/GameEvent";
import { Model } from "./../models/Model";
import { Texts } from "./../utils/Texts";

@injectable()
export class EndGameCommand implements ICommand {
    @inject(IEventDispatcher) private eventDispatcher: IEventDispatcher;
    @inject(Model) private model: Model;

    public execute(): void {
        const isFail = this.model.matchedPrizes.length === 0;
        this.model.feedback = isFail ? Texts.FAIL : Texts.SUCCESS;

        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.END));
        this.eventDispatcher.dispatchEvent(new FlowEvent(FlowEvent.SHOW_FEEDBACK));
    }
}
