// ------------------------------------------------------------------------------
//  2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import {
    IContext,
    IInjector,
    ICommandMapping,
    IEventDispatcher,
    IEventCommandMap,
    Context,
    Event,
    EventDispatcher
} from "@robotlegsjs/core";

import { EventCommandMap } from "@robotlegsjs/core/lib/robotlegs/bender/extensions/eventCommandMap/impl/EventCommandMap";

import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";

import { TestSequenceCommand } from "../support/TestSequenceCommand";
import { TestSequenceWithNamedPayloadsCommand } from "../support/TestSequenceWithNamedPayloadsCommand";
import { TestSequenceWithStringPayloadCommand } from "../support/TestSequenceWithStringPayloadCommand";

describe("SequenceMacro", () => {
    let context: IContext;
    let injector: IInjector;
    let mappings: ICommandMapping[];
    let dispatcher: IEventDispatcher;
    let eventCommandMap: IEventCommandMap;
    let reported: any[];

    function reportingFunction(item: any): void {
        reported.push(item);
    }

    beforeEach(() => {
        context = new Context();
        injector = context.injector;
        injector
            .bind("Function")
            .toFunction(reportingFunction)
            .whenTargetNamed("reportingFunction");
        dispatcher = new EventDispatcher();
        eventCommandMap = new EventCommandMap(context, dispatcher);
        context.initialize();
        reported = [];
    });

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }

        context = null;
        injector = null;
        dispatcher = null;
        eventCommandMap = null;
        reported = null;
    });

    it("commands_are_executed_in_sequence", () => {
        eventCommandMap.map("trigger", Event).toCommand(TestSequenceCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, [1, 2, 3]);
    });

    it("payloads_are_mapped", () => {
        eventCommandMap
            .map("trigger", Event)
            .toCommand(TestSequenceWithStringPayloadCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, ["Hello", "World", "!"]);
    });

    it("payloads_with_name_are_mapped", () => {
        eventCommandMap
            .map("trigger", Event)
            .toCommand(TestSequenceWithNamedPayloadsCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, [2, 20, 200]);
    });
});
