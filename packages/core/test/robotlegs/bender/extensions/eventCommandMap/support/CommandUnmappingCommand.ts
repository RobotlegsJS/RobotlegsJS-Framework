// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable, named } from "inversify";
import { Event } from "../../../../../../src/robotlegs/bender/events/impl/Event";
import { ICommand } from "../../../../../../src/robotlegs/bender/extensions/commandCenter/api/ICommand";
import { Command } from "../../../../../../src/robotlegs/bender/extensions/commandCenter/impl/Command";
import { IEventCommandMap } from "../../../../../../src/robotlegs/bender/extensions/eventCommandMap/api/IEventCommandMap";
import { IClass } from "../../../../../../src/robotlegs/bender/extensions/matching/IClass";

@injectable()
export class CommandUnmappingCommand implements ICommand {
    public static EVENT_TYPE: string = "cascadingEvent";

    @inject(ICommand)
    @named("nestedCommand")
    public command: IClass<Command>;

    @inject(Event)
    public event: Event;

    @inject(IEventCommandMap)
    public eventCommandMap: IEventCommandMap;

    public execute(): void {
        this.eventCommandMap.unmap(this.event.type, Event).fromCommand(this.command);
    }
}
