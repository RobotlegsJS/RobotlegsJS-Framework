// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ICommandTrigger } from "../api/ICommandTrigger";

/**
 * @private
 */
export class CommandTriggerMap {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _triggers: Map<any, any> = new Map<any, any>();

    private _keyFactory: Function;

    private _triggerFactory: Function;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates a command trigger map
     *
     * @param keyFactory Factory function to creates keys
     * @param triggerFactory Factory function to create triggers
     */
    public constructor(keyFactory: Function, triggerFactory: Function) {
        this._keyFactory = keyFactory;
        this._triggerFactory = triggerFactory;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public getTrigger(...params: any[]): ICommandTrigger {
        let key: any = this._getKey(params);
        let trigger = this._triggers.get(key);
        if (!trigger) {
            trigger = this._createTrigger(params);
            this._triggers.set(key, trigger);
        }
        return trigger;
    }

    /**
     * @private
     */
    public removeTrigger(...params: any[]): ICommandTrigger {
        return this._destroyTrigger(this._getKey(params));
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _getKey(mapperArgs: any[]): any {
        return this._keyFactory.apply(null, mapperArgs);
    }

    private _createTrigger(mapperArgs: any[]): ICommandTrigger {
        return this._triggerFactory.apply(null, mapperArgs);
    }

    private _destroyTrigger(key: any): ICommandTrigger {
        let trigger: ICommandTrigger = this._triggers.get(key);
        if (trigger) {
            trigger.deactivate();
            this._triggers.delete(key);
        }
        return trigger;
    }
}
