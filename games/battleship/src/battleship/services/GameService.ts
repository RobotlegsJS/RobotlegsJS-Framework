import { AttackEvent } from "./../game/events/AttackEvent";
import { GameEvent } from "./../events/GameEvent";
import { injectable, inject, IEventDispatcher, EventDispatcher } from "@robotlegsjs/core";

@injectable()
export class GameService {
    @inject(IEventDispatcher) public eventDispatcher: IEventDispatcher;

    // Commands
    public createLevelCommand(): void {
        this.dispatchEventWith(GameEvent.CREATE_LEVEL_COMMAND);
    }

    public retryCommand(): void {
        this.dispatchEventWith(GameEvent.CREATE_LEVEL_COMMAND);
    }

    public enemyAttackCommand(): void {
        this.dispatchEventWith(GameEvent.ENEMY_ATTACK_COMMAND);
    }

    public heroAttackCommand(col: number, row: number): void {
        let event: GameEvent = new GameEvent(GameEvent.HERO_ATTACK_COMMAND);
        event.extra = { col, row };
        this.eventDispatcher.dispatchEvent(event);
    }

    // phase
    public enemyPhase(): void {
        this.dispatchEventWith(GameEvent.ENEMY_PHASE);
    }

    public heroPhase(): void {
        this.dispatchEventWith(GameEvent.HERO_PHASE);
    }

    // Battlefild
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
