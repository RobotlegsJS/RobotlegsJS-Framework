// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ICommand, IInjector, inject, injectable, named } from "@robotlegsjs/core";
import { ISignalCommandMap } from "../../../../../../src/robotlegs/bender/extensions/signalCommandMap/api/ISignalCommandMap";
import { NullCommand } from "./NullCommand";
import { SupportSignal } from "./SupportSignal";

@injectable()
export class CascadingCommand implements ICommand {
    @inject("Function")
    @named("executeCallback")
    public callback: Function;

    @inject(IInjector)
    public injector: IInjector;

    @inject(ISignalCommandMap)
    public signalCommandMap: ISignalCommandMap;

    public execute(): void {
        this.callback();

        this.signalCommandMap.map(SupportSignal).toCommand(NullCommand).once();

        let signal: SupportSignal = this.injector.get(SupportSignal);
        signal.dispatch();
    }
}
