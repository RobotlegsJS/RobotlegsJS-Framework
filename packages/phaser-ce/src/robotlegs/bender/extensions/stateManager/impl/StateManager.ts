// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { EventDispatcher, injectable } from "@robotlegsjs/core";
import { IStateHandler } from "../api/IStateHandler";
import { IStateManager } from "../api/IStateManager";
import { StateManagerBinding } from "./StateManagerBinding";
import { StateManagerEvent } from "./StateManagerEvent";
import { StateRegistry } from "./StateRegistry";

/**
 * @private
 */
@injectable()
export class StateManager extends EventDispatcher implements IStateManager {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _stateManagers: Phaser.StateManager[] = [];

    /**
     * @inheritDoc
     */
    public get stateManagers(): Phaser.StateManager[] {
        return this._stateManagers;
    }

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _handlers: IStateHandler[] = [];

    private _registry: StateRegistry;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    public constructor(stateRegistry: StateRegistry) {
        super();
        this._registry = stateRegistry;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public addStateManager(stateManager: Phaser.StateManager): void {
        if (!this._validStateManager(stateManager)) {
            return;
        }

        this._stateManagers.push(stateManager);

        this._handlers.forEach((handler: IStateHandler) => {
            this._registry.addStateManager(stateManager).addHandler(handler);
        });

        this.dispatchEvent(
            new StateManagerEvent(StateManagerEvent.STATE_MANAGER_ADD, stateManager)
        );
    }

    /**
     * @inheritDoc
     */
    public removeStateManager(stateManager: Phaser.StateManager): void {
        let index: number = this._stateManagers.indexOf(stateManager);

        if (index === -1) {
            return;
        }

        this._stateManagers.splice(index, 1);

        let binding: StateManagerBinding = this._registry.getBinding(stateManager);

        this._handlers.forEach((handler: IStateHandler) => {
            binding.removeHandler(handler);
        });

        this.dispatchEvent(
            new StateManagerEvent(StateManagerEvent.STATE_MANAGER_REMOVE, stateManager)
        );
    }

    /**
     * @inheritDoc
     */
    public addStateHandler(handler: IStateHandler): void {
        if (this._handlers.indexOf(handler) !== -1) {
            return;
        }

        this._handlers.push(handler);

        this._stateManagers.forEach((stateManager: Phaser.StateManager) => {
            this._registry.addStateManager(stateManager).addHandler(handler);
        });

        this.dispatchEvent(new StateManagerEvent(StateManagerEvent.HANDLER_ADD, null, handler));
    }

    /**
     * @inheritDoc
     */
    public removeStateHandler(handler: IStateHandler): void {
        let index: number = this._handlers.indexOf(handler);

        if (index === -1) {
            return;
        }

        this._handlers.splice(index, 1);

        this._stateManagers.forEach((stateManager: Phaser.StateManager) => {
            this._registry.getBinding(stateManager).removeHandler(handler);
        });

        this.dispatchEvent(new StateManagerEvent(StateManagerEvent.HANDLER_REMOVE, null, handler));
    }

    /**
     * @inheritDoc
     */
    public removeAllHandlers(): void {
        this._stateManagers.forEach((stateManager: Phaser.StateManager) => {
            let binding: StateManagerBinding = this._registry.getBinding(stateManager);

            this._handlers.forEach((handler: IStateHandler) => {
                binding.removeHandler(handler);
            });
        });
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _validStateManager(stateManager: Phaser.StateManager): boolean {
        let valid: boolean = true;

        this._stateManagers.forEach((registeredStateManager: Phaser.StateManager) => {
            if (stateManager === registeredStateManager) {
                valid = false;
            }
        });

        return valid;
    }
}
