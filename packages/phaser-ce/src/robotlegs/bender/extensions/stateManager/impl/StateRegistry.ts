// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { EventDispatcher } from "@robotlegsjs/core";
import { StateManagerBinding } from "./StateManagerBinding";
import { StateManagerBindingEvent } from "./StateManagerBindingEvent";
import { StateRegistryEvent } from "./StateRegistryEvent";

/**
 * @private
 */
export class StateRegistry extends EventDispatcher {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _rootBindings: StateManagerBinding[] = [];
    private _bindings: StateManagerBinding[] = [];
    private _bindingByStateManager: Map<Phaser.StateManager, StateManagerBinding> = new Map<
        Phaser.StateManager,
        StateManagerBinding
    >();

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    /**
     * @private
     */
    public get rootBindings(): StateManagerBinding[] {
        return this._rootBindings;
    }

    /**
     * @private
     */
    public get bindings(): StateManagerBinding[] {
        return this._bindings;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addStateManager(stateManager: Phaser.StateManager): StateManagerBinding {
        let binding: StateManagerBinding = this._bindingByStateManager.get(stateManager);

        if (!binding) {
            binding = this._createBinding(stateManager);
            this._bindingByStateManager.set(stateManager, binding);
        }

        return binding;
    }

    /**
     * @private
     */
    public removeStateManager(stateManager: Phaser.StateManager): StateManagerBinding {
        let binding: StateManagerBinding = this._bindingByStateManager.get(stateManager);

        if (binding) {
            this._removeBinding(binding);
        }

        return binding;
    }

    /**
     * Finds the closest parent binding for a given display object
     *
     * @private
     */
    public findParentBinding(target: Phaser.StateManager): StateManagerBinding {
        return null;
    }

    /**
     * @private
     */
    public getBinding(stateManager: Phaser.StateManager): StateManagerBinding {
        return this._bindingByStateManager.get(stateManager);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _createBinding(stateManager: Phaser.StateManager): StateManagerBinding {
        let binding: StateManagerBinding = new StateManagerBinding(stateManager);
        this._bindings.push(binding);

        // Add a listener so that we can remove this binding when it has no handlers
        binding.addEventListener(StateManagerBindingEvent.BINDING_EMPTY, this._onBindingEmpty);

        // If the new binding doesn't have a parent it is a Root
        binding.parent = this.findParentBinding(stateManager);
        if (binding.parent == null) {
            this._addRootBinding(binding);
        }

        this.dispatchEvent(
            new StateRegistryEvent(StateRegistryEvent.STATE_MANAGER_ADD, binding.stateManager)
        );

        return binding;
    }

    private _removeBinding(binding: StateManagerBinding): void {
        // Remove the binding itself
        this._bindingByStateManager.delete(binding.stateManager);
        let index: number = this._bindings.indexOf(binding);
        this._bindings.splice(index, 1);

        // Drop the empty binding listener
        binding.removeEventListener(StateManagerBindingEvent.BINDING_EMPTY, this._onBindingEmpty);

        if (!binding.parent) {
            // This binding didn't have a parent, so it was a Root
            this._removeRootBinding(binding);
        }

        this.dispatchEvent(
            new StateRegistryEvent(StateRegistryEvent.STATE_MANAGER_REMOVE, binding.stateManager)
        );
    }

    private _addRootBinding(binding: StateManagerBinding): void {
        this._rootBindings.push(binding);
        this.dispatchEvent(
            new StateRegistryEvent(StateRegistryEvent.ROOT_STATE_MANAGER_ADD, binding.stateManager)
        );
    }

    private _removeRootBinding(binding: StateManagerBinding): void {
        let index: number = this._rootBindings.indexOf(binding);
        this._rootBindings.splice(index, 1);
        this.dispatchEvent(
            new StateRegistryEvent(
                StateRegistryEvent.ROOT_STATE_MANAGER_REMOVE,
                binding.stateManager
            )
        );
    }

    private _onBindingEmpty(event: StateManagerBindingEvent): void {
        this._removeBinding(<any>event.target);
    }
}
