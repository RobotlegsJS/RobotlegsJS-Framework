import { ICommand, IEventDispatcher, inject, injectable } from "@robotlegsjs/core";

import { FlowEvent } from "./../events/FlowEvent";
import { GameEvent } from "./../events/GameEvent";
import { Model } from "./../models/Model";
import { Texts } from "./../utils/Texts";

@injectable()
export class EndGameCommand implements ICommand {
    @inject(IEventDispatcher)
    private _eventDispatcher: IEventDispatcher;

    @inject(Model)
    private _model: Model;

    public execute(): void {
        const isFail = this._model.matchedPrizes.length === 0;
        this._model.feedback = isFail ? Texts.FAIL : Texts.SUCCESS;

        this._eventDispatcher.dispatchEvent(new GameEvent(GameEvent.END));
        this._eventDispatcher.dispatchEvent(new FlowEvent(FlowEvent.SHOW_FEEDBACK));
    }
}
