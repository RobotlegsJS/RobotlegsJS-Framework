// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

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
    private _containerListener: (event: createjs.Event) => void;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(containerRegistry: ContainerRegistry) {
        this._registry = containerRegistry;

        // We only care about roots
        this._registry.addEventListener(
            ContainerRegistryEvent.ROOT_CONTAINER_ADD,
            this.onRootContainerAdd,
            this
        );
        this._registry.addEventListener(
            ContainerRegistryEvent.ROOT_CONTAINER_REMOVE,
            this.onRootContainerRemove,
            this
        );

        // We might have arrived late on the scene
        this._registry.rootBindings.forEach((binding: ContainerBinding) => {
            this.addRootListener(binding.container);
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
            this.onRootContainerAdd,
            this
        );
        this._registry.removeEventListener(
            ContainerRegistryEvent.ROOT_CONTAINER_REMOVE,
            this.onRootContainerRemove,
            this
        );

        this._registry.rootBindings.forEach((binding: ContainerBinding) => {
            this.removeRootListener(binding.container);
        });
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onRootContainerAdd(event: ContainerRegistryEvent): void {
        this.addRootListener(event.container);
    }

    private onRootContainerRemove(event: ContainerRegistryEvent): void {
        this.removeRootListener(event.container);
    }

    private addRootListener(container: createjs.Container): void {
        this._containerListener = this.onViewAddedToStage.bind(this);
        container.addEventListener("added", this._containerListener);
    }

    private removeRootListener(container: createjs.Container): void {
        container.removeEventListener("added", this._containerListener);
    }

    private onViewAddedToStage(event: createjs.Event): void {
        let view: createjs.Container = event.data;
        let type: IClass<any> = <IClass<any>>view.constructor;

        // Walk upwards from the nearest binding
        let binding: ContainerBinding = this._registry.findParentBinding(view);
        while (binding) {
            binding.handleView(view, type);
            binding = binding.parent;
        }
    }
}
