import { GameEvent } from "./../events/GameEvent";
import { injectable, inject, IEventDispatcher, EventDispatcher } from "@robotlegsjs/core";

@injectable()
export class GameService {
    @inject(IEventDispatcher) public eventDispatcher: IEventDispatcher;

    // Commands
    public createLevelCommand(): void {
        this.dispatchEventWith(GameEvent.CREATE_LEVEL_COMMAND);
    }

    // UPDATE_GRID
    public clearBattleField(): void {
        this.dispatchEventWith(GameEvent.CLEAR_BATTLEFIELD);
    }
    public drawBattleField(): void {
        this.dispatchEventWith(GameEvent.DRAW_BATTLEFIELD);
    }

    public updateBattleField(): void {
        this.dispatchEventWith(GameEvent.UPDATE_BATTLEFIELD);
    }

    public dispatchEventWith(type: string): void {
        (<EventDispatcher>this.eventDispatcher).dispatchEventWith(type);
    }
}
