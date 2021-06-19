// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";
import { Container, DisplayObject } from "pixi.js";
import { ConfigureViewEvent } from "./ConfigureViewEvent";
import { ContainerBinding } from "./ContainerBinding";
import { ContainerRegistry } from "./ContainerRegistry";
import { ContainerRegistryEvent } from "./ContainerRegistryEvent";

/**
 * @private
 */
export class ManualStageObserver {
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

        // We care about all containers (not just roots)
        this._registry.addEventListener(
            ContainerRegistryEvent.CONTAINER_ADD,
            this._onContainerAdd,
            this
        );
        this._registry.addEventListener(
            ContainerRegistryEvent.CONTAINER_REMOVE,
            this._onContainerRemove,
            this
        );

        // We might have arrived late on the scene
        this._registry.bindings.forEach((binding: ContainerBinding) => {
            this._addContainerListener(binding.container);
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
            ContainerRegistryEvent.CONTAINER_ADD,
            this._onContainerAdd,
            this
        );
        this._registry.removeEventListener(
            ContainerRegistryEvent.CONTAINER_REMOVE,
            this._onContainerRemove,
            this
        );

        this._registry.rootBindings.forEach((binding: ContainerBinding) => {
            this._removeContainerListener(binding.container);
        });
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _onContainerAdd(event: ContainerRegistryEvent): void {
        this._addContainerListener(event.container);
    }

    private _onContainerRemove(event: ContainerRegistryEvent): void {
        this._removeContainerListener(event.container);
    }

    private _addContainerListener(container: Container): void {
        // We're interested in ALL container bindings
        // but just for normal, bubbling events
        container.addEventListener(ConfigureViewEvent.CONFIGURE_VIEW, this._onConfigureView, this);
    }

    private _removeContainerListener(container: Container): void {
        container.removeEventListener(
            ConfigureViewEvent.CONFIGURE_VIEW,
            this._onConfigureView,
            this
        );
    }

    private _onConfigureView(event: ConfigureViewEvent): void {
        // Stop that event!
        event.stopPropagation();

        let container: Container = <Container>event.currentTarget;
        let view: DisplayObject = <DisplayObject>event.target;
        let type: IClass<any> = <IClass<any>>view.constructor;
        this._registry.getBinding(container).handleView(view, type);
    }
}
