// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEventDispatcher } from "@robotlegsjs/core";
import { IViewHandler } from "./IViewHandler";

import DisplayObjectContainer from "openfl/display/DisplayObjectContainer";

/*[Event(name="containerAdd", type="robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent")]*/
/*[Event(name="containerRemove", type="robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent")]*/
/*[Event(name="handlerAdd", type="robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent")]*/
/*[Event(name="handlerRemove", type="robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent")]*/

/**
 * The View Manager allows you to add multiple "view root" containers to a context
 */
export let IViewManager = Symbol("IViewManager");
export interface IViewManager extends IEventDispatcher {
    /**
     * A list of currently registered containers
     */
    containers: DisplayObjectContainer[];

    /**
     * Adds a container as a "view root" into the context
     * @param container
     */
    addContainer(container: DisplayObjectContainer): void;

    /**
     * Removes a container from this context
     * @param container
     */
    removeContainer(container: DisplayObjectContainer): void;

    /**
     * Registers a view handler
     * @param handler
     */
    addViewHandler(handler: IViewHandler): void;

    /**
     * Removes a view handler
     * @param handler
     */
    removeViewHandler(handler: IViewHandler): void;

    /**
     * Removes all view handlers from this context
     */
    removeAllHandlers(): void;
}
