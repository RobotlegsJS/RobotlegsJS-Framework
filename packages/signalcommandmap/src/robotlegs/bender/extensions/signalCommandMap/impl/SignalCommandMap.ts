// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    injectable,
    inject,
    IClass,
    IInjector,
    IContext,
    ICommandTrigger,
    ICommandMapper,
    ICommandUnmapper,
    CommandTriggerMap
} from "@robotlegsjs/core";

import { ISignal } from "@robotlegsjs/signals";

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
    constructor(@inject(IContext) context: IContext) {
        this._injector = context.injector;
        this._triggerMap = new CommandTriggerMap(this.getKey, this.createTrigger.bind(this));
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public map(signalClass: IClass<ISignal>): ICommandMapper {
        return this.getTrigger(signalClass).createMapper();
    }

    /**
     * @inheritDoc
     */
    public unmap(signalClass: IClass<ISignal>): ICommandUnmapper {
        return this.getTrigger(signalClass).createMapper();
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

    private createTrigger(signalClass: IClass<ISignal>): ICommandTrigger {
        return new SignalCommandTrigger(this._injector, signalClass, this._mappingProcessors);
    }

    private getTrigger(signalClass: IClass<ISignal>): SignalCommandTrigger {
        return <SignalCommandTrigger>this._triggerMap.getTrigger(signalClass);
    }

    private getKey(signalClass: IClass<ISignal>): IClass<ISignal> {
        return signalClass;
    }
}
