// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { EventDispatcher } from "@robotlegsjs/core";

import { ContainerBinding } from "./ContainerBinding";
import { ContainerBindingEvent } from "./ContainerBindingEvent";
import { ContainerRegistryEvent } from "./ContainerRegistryEvent";

import DisplayObjectContainer from "openfl/display/DisplayObjectContainer";

// [Event(name="containerAdd", type="robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent")]
// [Event(name="containerRemove", type="robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent")]
// [Event(name="rootContainerAdd", type="robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent")]
// [Event(name="rootContainerRemove", type="robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent")]

/**
 * @private
 */
export class ContainerRegistry extends EventDispatcher {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _bindings: ContainerBinding[] = [];

    /**
     * @private
     */
    public get bindings(): ContainerBinding[] {
        return this._bindings;
    }

    private _rootBindings: ContainerBinding[] = [];

    /**
     * @private
     */
    public get rootBindings(): ContainerBinding[] {
        return this._rootBindings;
    }

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _bindingByContainer: Map<DisplayObjectContainer, ContainerBinding> = new Map<
        DisplayObjectContainer,
        ContainerBinding
    >();

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addContainer(container: DisplayObjectContainer): ContainerBinding {
        let binding = this._bindingByContainer.get(container);
        if (!binding) {
            binding = this._createBinding(container);
            this._bindingByContainer.set(container, binding);
        }
        return binding;
    }

    /**
     * @private
     */
    public removeContainer(container: DisplayObjectContainer): ContainerBinding {
        let binding: ContainerBinding = this._bindingByContainer.get(container);

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
    public findParentBinding(target: DisplayObjectContainer): ContainerBinding {
        let parent: DisplayObjectContainer = target.parent;
        while (parent) {
            let binding: ContainerBinding = this._bindingByContainer.get(parent);
            if (binding) {
                return binding;
            }
            parent = parent.parent;
        }
        return null;
    }

    /**
     * @private
     */
    public getBinding(container: DisplayObjectContainer): ContainerBinding {
        return this._bindingByContainer.get(container);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _createBinding(container: DisplayObjectContainer): ContainerBinding {
        let binding: ContainerBinding = new ContainerBinding(container);
        this._bindings.push(binding);

        // Add a listener so that we can remove this binding when it has no handlers
        binding.addEventListener(
            ContainerBindingEvent.BINDING_EMPTY,
            this._onBindingEmpty.bind(this)
        );

        // If the new binding doesn't have a parent it is a Root
        binding.parent = this.findParentBinding(container);
        if (binding.parent == null) {
            this._addRootBinding(binding);
        }

        // Reparent any bindings which are contained within the new binding AND
        // A. Don't have a parent, OR
        // B. Have a parent that is not contained within the new binding
        this._bindingByContainer.forEach((childBinding) => {
            if (container.contains(childBinding.container)) {
                if (!childBinding.parent) {
                    this._removeRootBinding(childBinding);
                    childBinding.parent = binding;
                } else if (!container.contains(childBinding.parent.container)) {
                    childBinding.parent = binding;
                }
            }
        });

        this.dispatchEvent(
            new ContainerRegistryEvent(ContainerRegistryEvent.CONTAINER_ADD, binding.container)
        );
        return binding;
    }

    private _removeBinding(binding: ContainerBinding): void {
        // Remove the binding itself
        this._bindingByContainer.delete(binding.container);
        let index: number = this._bindings.indexOf(binding);
        this._bindings.splice(index, 1);

        // Drop the empty binding listener
        binding.removeEventListener(ContainerBindingEvent.BINDING_EMPTY, this._onBindingEmpty);

        if (!binding.parent) {
            // This binding didn't have a parent, so it was a Root
            this._removeRootBinding(binding);
        }

        // Re-parent the bindings
        this._bindingByContainer.forEach((childBinding) => {
            if (childBinding.parent === binding) {
                childBinding.parent = binding.parent;
                if (!childBinding.parent) {
                    // This binding used to have a parent,
                    // but no longer does, so it is now a Root
                    this._addRootBinding(childBinding);
                }
            }
        });

        this.dispatchEvent(
            new ContainerRegistryEvent(ContainerRegistryEvent.CONTAINER_REMOVE, binding.container)
        );
    }

    private _addRootBinding(binding: ContainerBinding): void {
        this._rootBindings.push(binding);
        this.dispatchEvent(
            new ContainerRegistryEvent(ContainerRegistryEvent.ROOT_CONTAINER_ADD, binding.container)
        );
    }

    private _removeRootBinding(binding: ContainerBinding): void {
        let index: number = this._rootBindings.indexOf(binding);
        this._rootBindings.splice(index, 1);
        this.dispatchEvent(
            new ContainerRegistryEvent(
                ContainerRegistryEvent.ROOT_CONTAINER_REMOVE,
                binding.container
            )
        );
    }

    private _onBindingEmpty(event: ContainerBindingEvent): void {
        this._removeBinding(<any>event.target);
    }
}
