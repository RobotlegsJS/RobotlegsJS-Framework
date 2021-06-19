import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { Sprite } from "pixi.js";
import { GameEvent } from "./../events/GameEvent";
import { Entity } from "./../game/entities/Entity";
import { GameManager } from "./../game/Managers/GameManager";
import { EntityPool } from "./../game/utils/EntityPool";
import { LevelModel } from "./../models/LevelModel";
import { BattleFieldComponent } from "./../views/components/BattleFieldComponent";

@injectable()
export class BattleFieldComponentMediator extends Mediator<BattleFieldComponent> {
    @inject(LevelModel)
    private _levelModel: LevelModel;

    @inject(GameManager)
    private _gameManager: GameManager;

    private _displays: Map<Entity, Sprite>;
    private _paused: boolean;

    public initialize(): void {
        this._displays = new Map<Entity, Sprite>();
        this._paused = false;
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.CLEAR_BATTLE_FIELD,
            this._onClearBattleField,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.UPDATE_BATTLE_FIELD,
            this._onUpdateBattleField,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.RESUME,
            this.game_onResumeGame,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.PAUSE,
            this.game_onPauseGame,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.GAME_OVER,
            this.game_onGameOver,
            this
        );
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private game_onGameOver(e: any): void {
        document.removeEventListener("keydown", this._onKeyDownOnMovement.bind(this));
        document.removeEventListener("keyup", this._onKeyUpOnMovement.bind(this));
        this._paused = true;
    }

    private game_onPauseGame(e: any): void {
        document.removeEventListener("keydown", this._onKeyDownOnMovement.bind(this));
        document.removeEventListener("keyup", this._onKeyUpOnMovement.bind(this));
        this._paused = true;
    }

    private game_onResumeGame(e: any): void {
        this._gameManager.resume();
        document.addEventListener("keydown", this._onKeyDownOnMovement.bind(this));
        document.addEventListener("keyup", this._onKeyUpOnMovement.bind(this));
        this._paused = false;

        window.requestAnimationFrame(this._onEnterFrame.bind(this));
    }

    private _onKeyDownOnMovement(e: KeyboardEvent): void {
        if (e.keyCode === 37 || e.keyCode === 65) {
            this._gameManager.cannonMovement(-3);
        } else if (e.keyCode === 39 || e.keyCode === 68) {
            this._gameManager.cannonMovement(3);
        } else if (e.keyCode === 32 || e.keyCode === 83) {
            this._gameManager.startShooting();
        }
    }

    private _onKeyUpOnMovement(e: KeyboardEvent): void {
        if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 39 || e.keyCode === 68) {
            this._gameManager.cannonMovement(0);
        } else if (e.keyCode === 32 || e.keyCode === 83) {
            this._gameManager.stopShooting();
        }
    }

    private _onEnterFrame(e: any): void {
        if (this._paused === true) {
            return;
        }
        this._gameManager.update();
        if (this._levelModel.toAdd.length > 0 || this._levelModel.toRemove.length > 0) {
            this._updateDisplays();
        }
        window.requestAnimationFrame(this._onEnterFrame.bind(this));
    }

    private _onUpdateBattleField(e: any): void {
        this._updateDisplays();
    }

    private _onClearBattleField(e: any): void {
        this._displays.forEach((display: Sprite, entity: Entity, obThis: any = this) => {
            this.view.removeChild(entity.display);
            this._displays.delete(entity);
            entity = null;
        });
    }

    private _updateDisplays(): void {
        let entity: Entity;
        while (this._levelModel.toAdd.length > 0) {
            entity = this._levelModel.toAdd.shift();
            if (this._displays.get(entity)) {
                continue;
            }
            this._addDisplayToStage(entity);
        }
        while (this._levelModel.toRemove.length > 0) {
            entity = this._levelModel.toRemove.shift();
            this._levelModel.removeEntity(entity);
            this._removeDisplayFromStage(entity.display, entity);
        }
    }

    private _addDisplayToStage(entity: Entity): void {
        this.view.addChild(entity.display);
        this._displays.set(entity, entity.display);
    }

    private _removeDisplayFromStage(display: Sprite, entity: Entity): void {
        EntityPool.back(entity);
        this.view.removeChild(entity.display);
        this._displays.delete(entity);
        entity = null;
    }
}
