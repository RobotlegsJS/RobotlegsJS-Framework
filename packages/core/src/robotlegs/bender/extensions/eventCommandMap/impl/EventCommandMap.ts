// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable } from "inversify";
import { IEvent } from "../../../events/api/IEvent";
import { IEventDispatcher } from "../../../events/api/IEventDispatcher";
import { IContext } from "../../../framework/api/IContext";
import { IInjector } from "../../../framework/api/IInjector";
import { ILogger } from "../../../framework/api/ILogger";
import { ICommandMapper } from "../../commandCenter/dsl/ICommandMapper";
import { ICommandUnmapper } from "../../commandCenter/dsl/ICommandUnmapper";
import { CommandTriggerMap } from "../../commandCenter/impl/CommandTriggerMap";
import { IEventCommandMap } from "../../eventCommandMap/api/IEventCommandMap";
import { IClass } from "../../matching/IClass";
import { EventCommandTrigger } from "./EventCommandTrigger";

/**
 * @private
 */
@injectable()
export class EventCommandMap implements IEventCommandMap {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappingProcessors: any[] = [];

    private _injector: IInjector;

    private _dispatcher: IEventDispatcher;

    private _triggerMap: CommandTriggerMap;

    private _logger: ILogger;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    public constructor(
        @inject(IContext) context: IContext,
        @inject(IEventDispatcher) dispatcher: IEventDispatcher
    ) {
        this._injector = context.injector;
        this._logger = context.getLogger(this);
        this._dispatcher = dispatcher;
        this._triggerMap = new CommandTriggerMap(this._getKey, this._createTrigger.bind(this));
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public map(type: string, eventClass?: IClass<IEvent>): ICommandMapper {
        return this._getTrigger(type, eventClass).createMapper();
    }

    /**
     * @inheritDoc
     */
    public unmap(type: string, eventClass?: IClass<IEvent>): ICommandUnmapper {
        return this._getTrigger(type, eventClass).createMapper();
    }

    /**
     * @inheritDoc
     */
    public addMappingProcessor(handler: Function): IEventCommandMap {
        if (this._mappingProcessors.indexOf(handler) === -1) {
            this._mappingProcessors.push(handler);
        }
        return this;
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _getKey(type: string, eventClass: IClass<IEvent>): string {
        return type + eventClass;
    }

    private _getTrigger(type: string, eventClass: IClass<IEvent>): EventCommandTrigger {
        return <EventCommandTrigger>this._triggerMap.getTrigger(type, eventClass);
    }

    private _createTrigger(type: string, eventClass: IClass<IEvent>): EventCommandTrigger {
        return new EventCommandTrigger(
            this._injector,
            this._dispatcher,
            type,
            eventClass,
            this._mappingProcessors,
            this._logger
        );
    }
}
