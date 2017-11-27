import { EventDispatcher, IEventDispatcher, inject, injectable } from "@robotlegsjs/core";

import { GameEvent } from "./../events/GameEvent";

@injectable()
export class GameService {
    @inject(IEventDispatcher) public eventDispatcher: IEventDispatcher;

    // Commands
    public createLevelCommand(): void {
        this.dispatchEventWith(GameEvent.CREATE_LEVEL_COMMAND);
    }
    public decreaseLives(): void {
        this.dispatchEventWith(GameEvent.DECREASE_LIVES);
    }
    public increaseLevel(): void {
        this.dispatchEventWith(GameEvent.INCREASE_LEVEL_COMMAND);
    }
    public increasePoints(): void {
        this.dispatchEventWith(GameEvent.INCREASE_POINTS);
    }
    public retryCommand(): void {
        this.dispatchEventWith(GameEvent.RETRY_GAME_COMMAND);
    }
    public startCommand(): void {
        this.dispatchEventWith(GameEvent.START_GAME_COMMAND);
    }
    // Game
    public pause(): void {
        this.dispatchEventWith(GameEvent.PAUSE);
    }
    public resume(): void {
        this.dispatchEventWith(GameEvent.RESUME);
    }
    public gameOver(): void {
        this.dispatchEventWith(GameEvent.GAME_OVER);
    }
    // UPDATE
    public clearBattleField(): void {
        this.dispatchEventWith(GameEvent.CLEAR_BATTLE_FIELD);
    }
    public updateBattleField(): void {
        this.dispatchEventWith(GameEvent.UPDATE_BATTLE_FIELD);
    }
    public updateHUDData(): void {
        this.dispatchEventWith(GameEvent.UPDATE_HUD_DATA);
    }
    // EXTRAS
    public dispatchEventWith(type: string): void {
        (<EventDispatcher>this.eventDispatcher).dispatchEventWith(type);
    }
}
