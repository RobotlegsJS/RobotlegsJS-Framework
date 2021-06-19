// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    CommandExecutor,
    CommandMapper,
    CommandMappingList,
    CommandPayload,
    IClass,
    ICommandExecutor,
    ICommandTrigger,
    IInjector,
    ILogger
} from "@robotlegsjs/core";
import { ISignal } from "@robotlegsjs/signals";

/**
 * @private
 */
export class SignalCommandTrigger implements ICommandTrigger {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _signalClass: IClass<ISignal>;

    private _signal: ISignal;

    private _injector: IInjector;

    private _mappings: CommandMappingList;

    private _executor: ICommandExecutor;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    public constructor(
        injector: IInjector,
        signalClass: IClass<ISignal>,
        processors?: Function[],
        logger?: ILogger
    ) {
        this._injector = injector;
        this._signalClass = signalClass;
        this._mappings = new CommandMappingList(this, processors ? processors : [], logger);
        this._executor = new CommandExecutor(
            injector,
            this._mappings.removeMapping.bind(this._mappings)
        );
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public createMapper(): CommandMapper {
        return new CommandMapper(this._mappings);
    }

    /**
     * @inheritDoc
     */
    public activate(): void {
        if (!this._injector.isBound(this._signalClass)) {
            this._injector.bind(this._signalClass).to(this._signalClass).inSingletonScope();
        }
        this._signal = this._injector.get<ISignal>(this._signalClass);
        this._signal.add(this._routePayloadToCommands);
    }

    /**
     * @inheritDoc
     */
    public deactivate(): void {
        if (this._signal) {
            this._signal.remove(this._routePayloadToCommands);
        }
    }

    public toString(): string {
        return this._signalClass.toString();
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _routePayloadToCommands = (...valueObjects: any[]): void => {
        let valueClasses: any[] = this._signal.valueClasses;

        let payload: CommandPayload = new CommandPayload(valueObjects, valueClasses);

        this._executor.executeCommands(this._mappings.getList(), payload);
    };
}
