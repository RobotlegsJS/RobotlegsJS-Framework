// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable } from "inversify";
import { IEventDispatcher } from "../../../../../../src/robotlegs/bender/events/api/IEventDispatcher";
import { Event } from "../../../../../../src/robotlegs/bender/events/impl/Event";
import { ICommand } from "../../../../../../src/robotlegs/bender/extensions/commandCenter/api/ICommand";
import { IEventCommandMap } from "../../../../../../src/robotlegs/bender/extensions/eventCommandMap/api/IEventCommandMap";
import { NullCommand } from "../../commandCenter/support/NullCommand";

@injectable()
export class CascadingCommand implements ICommand {
    public static EVENT_TYPE: string = "cascadingEvent";

    @inject(IEventDispatcher)
    public dispatcher: IEventDispatcher;

    @inject(IEventCommandMap)
    public eventCommandMap: IEventCommandMap;

    public execute(): void {
        this.eventCommandMap.map(CascadingCommand.EVENT_TYPE).toCommand(NullCommand).once();

        this.dispatcher.dispatchEvent(new Event(CascadingCommand.EVENT_TYPE));
    }
}
