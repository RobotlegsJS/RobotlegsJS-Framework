import { ICommand, IEventDispatcher, inject, injectable } from "@robotlegsjs/core";

import { GameEvent } from "./../events/GameEvent";

@injectable()
export class EndGameCommand implements ICommand {
    @inject(IEventDispatcher) private eventDispatcher: IEventDispatcher;

    public execute(): void {
        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.CLEAR_ALL));
    }
}
