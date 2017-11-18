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
import { TestSequenceWithGrumpyGuardsCommand } from "../support/TestSequenceWithGrumpyGuardsCommand";
import { TestSequenceWithHappyGuardsCommand } from "../support/TestSequenceWithHappyGuardsCommand";
import { TestSequenceWithHooksCommand } from "../support/TestSequenceWithHooksCommand";
import { TestSequenceWithInjectedHooksCommand } from "../support/TestSequenceWithInjectedHooksCommand";
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

    it("named_payloads_are_mapped", () => {
        eventCommandMap
            .map("trigger", Event)
            .toCommand(TestSequenceWithNamedPayloadsCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, [2, 20, 200]);
    });

    it("hooks_are_called", () => {
        eventCommandMap
            .map("trigger", Event)
            .toCommand(TestSequenceWithHooksCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, [
            "Hook",
            "Command 1",
            "Hook",
            "Hook",
            "Command 2",
            "Hook",
            "Hook",
            "Hook",
            "Command 3"
        ]);
    });

    it("command_is_injected_into_hooks", () => {
        eventCommandMap
            .map("trigger", Event)
            .toCommand(TestSequenceWithInjectedHooksCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, [
            "Hook of Command 1",
            "Command 1",
            "Hook of Command 2",
            "Command 2",
            "Hook of Command 3",
            "Command 3"
        ]);
    });

    it("commands_are_executed_when_the_guard_allows", () => {
        eventCommandMap
            .map("trigger", Event)
            .toCommand(TestSequenceWithHappyGuardsCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, ["Command 1", "Command 2", "Command 3"]);
    });

    it("commands_does_not_execute_when_any_guards_denies", () => {
        eventCommandMap
            .map("trigger", Event)
            .toCommand(TestSequenceWithGrumpyGuardsCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, []);
    });
});
