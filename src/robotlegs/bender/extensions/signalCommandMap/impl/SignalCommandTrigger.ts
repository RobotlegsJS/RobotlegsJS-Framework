// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    IInjector,
    ILogger,
    ICommandExecutor,
    ICommandTrigger,
    CommandExecutor,
    CommandMapper,
    CommandMappingList,
    CommandPayload
} from "@robotlegsjs/core";

/**
 * @private
 */
export class SignalCommandTrigger implements ICommandTrigger {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _signalClass: any;

    private _signal: Phaser.Signal;

    private _injector: IInjector;

    private _mappings: CommandMappingList;

    private _executor: ICommandExecutor;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(injector: IInjector, signalClass: any, processors?: Function[], logger?: ILogger) {
        this._injector = injector;
        this._signalClass = signalClass;
        this._mappings = new CommandMappingList(this, processors, logger);
        this._executor = new CommandExecutor(injector, this._mappings.removeMapping);
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
            this._injector
                .bind(this._signalClass)
                .to(this._signalClass)
                .inSingletonScope();
        }
        this._signal = this._injector.get<Phaser.Signal>(this._signalClass);
        this._signal.add(this.routePayloadToCommands, this);
    }

    /**
     * @inheritDoc
     */
    public deactivate(): void {
        if (this._signal) {
            this._signal.remove(this.routePayloadToCommands, this);
        }
    }

    public toString(): string {
        return this._signalClass.toString();
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private routePayloadToCommands = (...valueObjects): void => {
        let valueClasses: any[] = valueObjects.map(obj => obj.constructor);
        let payload: CommandPayload = new CommandPayload(valueObjects, valueClasses);
        this._executor.executeCommands(this._mappings.getList(), payload);
    };
}
