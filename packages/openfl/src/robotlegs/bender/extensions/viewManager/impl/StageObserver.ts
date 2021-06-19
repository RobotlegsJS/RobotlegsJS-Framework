// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";
import DisplayObjectContainer from "openfl/display/DisplayObjectContainer";
import Event from "openfl/events/Event";
import { ContainerBinding } from "./ContainerBinding";
import { ContainerRegistry } from "./ContainerRegistry";
import { ContainerRegistryEvent } from "./ContainerRegistryEvent";

/**
 * @private
 */
export class StageObserver {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _registry: ContainerRegistry;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    public constructor(containerRegistry: ContainerRegistry) {
        this._registry = containerRegistry;

        // We only care about roots
        this._registry.addEventListener(
            ContainerRegistryEvent.ROOT_CONTAINER_ADD,
            this._onRootContainerAdd,
            this
        );
        this._registry.addEventListener(
            ContainerRegistryEvent.ROOT_CONTAINER_REMOVE,
            this._onRootContainerRemove,
            this
        );

        // We might have arrived late on the scene
        this._registry.rootBindings.forEach((binding: ContainerBinding) => {
            this._addRootListener(binding.container);
        });
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public destroy(): void {
        this._registry.removeEventListener(
            ContainerRegistryEvent.ROOT_CONTAINER_ADD,
            this._onRootContainerAdd,
            this
        );
        this._registry.removeEventListener(
            ContainerRegistryEvent.ROOT_CONTAINER_REMOVE,
            this._onRootContainerRemove,
            this
        );

        this._registry.rootBindings.forEach((binding: ContainerBinding) => {
            this._removeRootListener(binding.container);
        });
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _onRootContainerAdd(event: ContainerRegistryEvent): void {
        this._addRootListener(event.container);
    }

    private _onRootContainerRemove(event: ContainerRegistryEvent): void {
        this._removeRootListener(event.container);
    }

    private _addRootListener(container: DisplayObjectContainer): void {
        container.addEventListener(Event.ADDED_TO_STAGE, this._onViewAddedToStage, true);
    }

    private _removeRootListener(container: DisplayObjectContainer): void {
        container.removeEventListener(Event.ADDED_TO_STAGE, this._onViewAddedToStage, true);
    }

    private _onViewAddedToStage = (event: Event): void => {
        let view: DisplayObjectContainer = event.target;
        let type: IClass<any> = <IClass<any>>view.constructor;

        // Walk upwards from the nearest binding
        let binding: ContainerBinding = this._registry.findParentBinding(view);
        while (binding) {
            binding.handleView(view, type);
            binding = binding.parent;
        }
    };
}
