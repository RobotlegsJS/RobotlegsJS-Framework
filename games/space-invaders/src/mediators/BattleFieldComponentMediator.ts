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
    @inject(LevelModel) private levelModel: LevelModel;
    @inject(GameManager) private gameManager: GameManager;

    private _displays: Map<Entity, Sprite>;
    private _paused: boolean;

    public initialize(): void {
        this._displays = new Map<Entity, Sprite>();
        this._paused = false;
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.CLEAR_BATTLE_FIELD,
            this.game_onClearBattleField,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.UPDATE_BATTLE_FIELD,
            this.game_onUpdateBattleField,
            this
        );
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.RESUME, this.game_onResumeGame, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.PAUSE, this.game_onPauseGame, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.GAME_OVER, this.game_onGameOver, this);
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private game_onGameOver(e: any): void {
        document.removeEventListener("keydown", this.onKeyDownOnMovement.bind(this));
        document.removeEventListener("keyup", this.onKeyUpOnMovement.bind(this));
        this._paused = true;
    }
    private game_onPauseGame(e: any): void {
        document.removeEventListener("keydown", this.onKeyDownOnMovement.bind(this));
        document.removeEventListener("keyup", this.onKeyUpOnMovement.bind(this));
        this._paused = true;
    }
    private game_onResumeGame(e: any): void {
        this.gameManager.resume();
        document.addEventListener("keydown", this.onKeyDownOnMovement.bind(this));
        document.addEventListener("keyup", this.onKeyUpOnMovement.bind(this));
        this._paused = false;

        window.requestAnimationFrame(this.onEnterFrame.bind(this));
    }
    private onKeyDownOnMovement(e: KeyboardEvent) {
        if (e.keyCode === 37 || e.keyCode === 65) {
            this.gameManager.cannonMovement(-3);
        } else if (e.keyCode === 39 || e.keyCode === 68) {
            this.gameManager.cannonMovement(3);
        } else if (e.keyCode === 32 || e.keyCode === 83) {
            this.gameManager.startShooting();
        }
    }
    private onKeyUpOnMovement(e: KeyboardEvent) {
        if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 39 || e.keyCode === 68) {
            this.gameManager.cannonMovement(0);
        } else if (e.keyCode === 32 || e.keyCode === 83) {
            this.gameManager.stopShooting();
        }
    }
    private onEnterFrame(e: any) {
        if (this._paused === true) {
            return;
        }
        this.gameManager.update();
        if (this.levelModel.toAdd.length > 0 || this.levelModel.toRemove.length > 0) {
            this.updateDisplays();
        }
        window.requestAnimationFrame(this.onEnterFrame.bind(this));
    }
    private game_onUpdateBattleField(e: any): void {
        this.updateDisplays();
    }
    private game_onClearBattleField(e: any): void {
        this._displays.forEach((display: Sprite, entity: Entity, obThis: any = this) => {
            this.view.removeChild(entity.display);
            this._displays.delete(entity);
            entity = null;
        });
    }
    private updateDisplays(): void {
        let entity: Entity;
        while (this.levelModel.toAdd.length > 0) {
            entity = this.levelModel.toAdd.shift();
            if (this._displays.get(entity)) {
                continue;
            }
            this.addDisplayToStage(entity);
        }
        while (this.levelModel.toRemove.length > 0) {
            entity = this.levelModel.toRemove.shift();
            this.levelModel.removeEntity(entity);
            this.removeDisplayFromStage(entity.display, entity);
        }
    }
    private addDisplayToStage(entity: Entity): void {
        this.view.addChild(entity.display);
        this._displays.set(entity, entity.display);
    }
    private removeDisplayFromStage(display: Sprite, entity: Entity): void {
        EntityPool.back(entity);
        this.view.removeChild(entity.display);
        this._displays.delete(entity);
        entity = null;
    }
}
