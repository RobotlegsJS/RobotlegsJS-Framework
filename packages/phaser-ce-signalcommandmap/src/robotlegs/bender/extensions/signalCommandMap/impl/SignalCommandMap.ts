// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    injectable,
    inject,
    IInjector,
    IContext,
    ICommandTrigger,
    ICommandMapper,
    ICommandUnmapper,
    CommandTriggerMap
} from "@robotlegsjs/core";

import { ISignalCommandMap } from "../api/ISignalCommandMap";
import { SignalCommandTrigger } from "./SignalCommandTrigger";

/**
 * @private
 */
@injectable()
export class SignalCommandMap implements ISignalCommandMap {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappingProcessors: Function[] = [];

    private _injector: IInjector;

    private _triggerMap: CommandTriggerMap;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    public constructor(@inject(IContext) context: IContext) {
        this._injector = context.injector;
        this._triggerMap = new CommandTriggerMap(this._getKey, this._createTrigger.bind(this));
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public map(signalClass: Object): ICommandMapper {
        return this._getTrigger(signalClass).createMapper();
    }

    /**
     * @inheritDoc
     */
    public unmap(signalClass: Object): ICommandUnmapper {
        return this._getTrigger(signalClass).createMapper();
    }

    public addMappingProcessor(handler: Function): ISignalCommandMap {
        if (this._mappingProcessors.indexOf(handler) === -1) {
            this._mappingProcessors.push(handler);
        }
        return this;
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _createTrigger(signalClass: Object): ICommandTrigger {
        return new SignalCommandTrigger(this._injector, signalClass, this._mappingProcessors);
    }

    private _getTrigger(signalClass: Object): SignalCommandTrigger {
        return <SignalCommandTrigger>this._triggerMap.getTrigger(signalClass);
    }

    private _getKey(signalClass: Object): Object {
        return signalClass;
    }
}
