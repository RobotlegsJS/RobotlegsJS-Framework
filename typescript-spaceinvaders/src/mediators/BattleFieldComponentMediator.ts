import { Entity } from "./../game/entities/Entity";
import { GameManager } from "./../game/Managers/GameManager";
import { EntityPool } from "./../game/utils/EntityPool";
import { GameEvent } from "./../events/GameEvent";
import { LevelModel } from "./../models/LevelModel";
import { BattleFieldComponent } from "./../views/components/BattleFieldComponent";

import { Sprite } from "pixi.js";
import { Mediator } from "robotlegs-pixi";
import { injectable, inject } from "robotlegs";

@injectable()
export class BattleFieldComponentMediator extends Mediator<BattleFieldComponent> {

    @inject(LevelModel)
    public levelModel: LevelModel;

    @inject(GameManager)
    public gameManager: GameManager;

    private _displays: Map<Entity, Sprite>;

    private _paused: boolean;

    public initialize(): void {
        this._displays = new Map<Entity, Sprite>();
        this._paused = false;
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.CLEAR_BATTLE_FIELD, this.game_onClearBattleField, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.UPDATE_BATTLE_FIELD, this.game_onUpdateBattleField, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.RESUME, this.game_onResumeGame, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.PAUSE, this.game_onPauseGame, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.GAME_OVER, this.game_onGameOver, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private game_onGameOver(e: any): void {
        document.removeEventListener("keydown", this.onKeyDownOnMovement);
        document.removeEventListener("keyup", this.onKeyUpOnMovement);
        this._paused = true;
    }

    private game_onPauseGame(e: any): void {
        document.removeEventListener("keydown", this.onKeyDownOnMovement);
        document.removeEventListener("keyup", this.onKeyUpOnMovement);
        this._paused = true;
    }

    private game_onResumeGame(e: any): void {
        this.gameManager.resume();
        document.addEventListener("keydown", this.onKeyDownOnMovement);
        document.addEventListener("keyup", this.onKeyUpOnMovement);
        this._paused = false;

        window.requestAnimationFrame(this.onEnterFrame);
    }

    private onKeyDownOnMovement = (e: KeyboardEvent, ob: any = this) => {
        if (e.keyCode === 37 || e.keyCode === 65) {
            this.gameManager.cannonMovement(-3);
        } else if (e.keyCode === 39 || e.keyCode === 68) {
            this.gameManager.cannonMovement(3);
        } else if (e.keyCode === 32 || e.keyCode === 83) {
            this.gameManager.startShooting();
        }
    }

    private onKeyUpOnMovement = (e: KeyboardEvent, ob: any = this) => {
        if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 39 || e.keyCode === 68) {
            this.gameManager.cannonMovement(0);
        } else if (e.keyCode === 32 || e.keyCode === 83) {
            this.gameManager.stopShooting();
        }
    }

    private onEnterFrame = (e: any, obThis: any = this) => {
        if (obThis._paused === true) {
            return;
        }
        obThis.gameManager.update();
        if (obThis.levelModel.toAdd.length > 0 || obThis.levelModel.toRemove.length > 0) {
            obThis.updateDisplays();
        }
        window.requestAnimationFrame(obThis.onEnterFrame);
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
