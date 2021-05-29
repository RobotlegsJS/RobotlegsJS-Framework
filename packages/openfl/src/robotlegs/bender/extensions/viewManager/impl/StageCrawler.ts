// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

import { ContainerBinding } from "./ContainerBinding";

import DisplayObject from "openfl/display/DisplayObject";
import DisplayObjectContainer from "openfl/display/DisplayObjectContainer";

/**
 * @private
 */
export class StageCrawler {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _binding: ContainerBinding;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(containerBinding: ContainerBinding) {
        this._binding = containerBinding;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public scan(container: DisplayObjectContainer): void {
        this.scanContainer(container);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private scanContainer(container: DisplayObjectContainer): void {
        this.processView(container);

        for (let i: number = 0; i < container.numChildren; i++) {
            let child: DisplayObject = container.getChildAt(i);

            if (child instanceof DisplayObjectContainer) {
                this.scanContainer(child);
            } else {
                this.processView(child);
            }
        }
    }

    private processView(view: DisplayObject): void {
        this._binding.handleView(view, <IClass<any>>view.constructor);
    }
}
