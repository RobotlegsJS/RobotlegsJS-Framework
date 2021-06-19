// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    Context,
    Event,
    EventCommandMap,
    EventDispatcher,
    IContext,
    IEventCommandMap,
    IEventDispatcher,
    IInjector
} from "@robotlegsjs/core";
import { assert } from "chai";
import "../../../../../entry";
import { TestAddAndRemoveSequenceCommand } from "../support/TestAddAndRemoveSequenceCommand";
import { TestAtomicSequenceWithAsyncAndCompleteCallbackCommand } from "../support/TestAtomicSequenceWithAsyncAndCompleteCallbackCommand";
import { TestAtomicSequenceWithAsyncCommand } from "../support/TestAtomicSequenceWithAsyncCommand";
import { TestNotAtomicSequenceWithAsyncCommand } from "../support/TestNotAtomicSequenceWithAsyncCommand";
import { TestSequenceAnChangeAtomicLaterCommand } from "../support/TestSequenceAnChangeAtomicLaterCommand";
import { TestSequenceCommand } from "../support/TestSequenceCommand";
import { TestSequenceWithAsyncAndCompleteCallbackCommand } from "../support/TestSequenceWithAsyncAndCompleteCallbackCommand";
import { TestSequenceWithAsyncCommand } from "../support/TestSequenceWithAsyncCommand";
import { TestSequenceWithCompleteCallbackCommand } from "../support/TestSequenceWithCompleteCallbackCommand";
import { TestSequenceWithGrumpyGuardsCommand } from "../support/TestSequenceWithGrumpyGuardsCommand";
import { TestSequenceWithHappyGuardsCommand } from "../support/TestSequenceWithHappyGuardsCommand";
import { TestSequenceWithHooksCommand } from "../support/TestSequenceWithHooksCommand";
import { TestSequenceWithInjectedHooksCommand } from "../support/TestSequenceWithInjectedHooksCommand";
import { TestSequenceWithNamedPayloadsCommand } from "../support/TestSequenceWithNamedPayloadsCommand";
import { TestSequenceWithPayloadCommand } from "../support/TestSequenceWithPayloadCommand";
import { TestSequenceWithPayloadInjectedIntoGuardsCommand } from "../support/TestSequenceWithPayloadInjectedIntoGuardsCommand";
import { TestSequenceWithPayloadInjectedIntoHooksCommand } from "../support/TestSequenceWithPayloadInjectedIntoHooksCommand";
import { TestSequenceWithStringPayloadCommand } from "../support/TestSequenceWithStringPayloadCommand";

describe("SequenceMacro", () => {
    let context: IContext;
    let injector: IInjector;
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

    it("removed_commands_are_not_executed", () => {
        eventCommandMap.map("trigger", Event).toCommand(TestAddAndRemoveSequenceCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, [1]);
    });

    it("commands_are_executed_in_sequence_and_complete_callback_is_called", (done: Function) => {
        eventCommandMap.map("trigger", Event).toCommand(TestSequenceWithCompleteCallbackCommand);
        dispatcher.dispatchEvent(new Event("trigger"));

        setTimeout(() => {
            assert.deepEqual(reported, [
                "Command 1",
                "Command 2",
                "Command 3",
                "All commands have been executed!"
            ]);

            done();
        }, 250);
    });

    it("change_atomic_property_after_execution_of_sub_commands_have_no_effect", () => {
        eventCommandMap.map("trigger", Event).toCommand(TestSequenceAnChangeAtomicLaterCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, [
            1,
            2,
            3,
            "Atomic property changed after execution of sequence."
        ]);
    });

    it("payloads_are_mapped", () => {
        eventCommandMap.map("trigger", Event).toCommand(TestSequenceWithStringPayloadCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, ["Hello", "World", "!"]);
    });

    it("named_payloads_are_mapped", () => {
        eventCommandMap.map("trigger", Event).toCommand(TestSequenceWithNamedPayloadsCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, [2, 20, 200]);
    });

    it("hooks_are_called", () => {
        eventCommandMap.map("trigger", Event).toCommand(TestSequenceWithHooksCommand);
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
        eventCommandMap.map("trigger", Event).toCommand(TestSequenceWithInjectedHooksCommand);
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
        eventCommandMap.map("trigger", Event).toCommand(TestSequenceWithHappyGuardsCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, ["Command 1", "Command 2", "Command 3"]);
    });

    it("commands_does_not_execute_when_any_guards_denies", () => {
        eventCommandMap.map("trigger", Event).toCommand(TestSequenceWithGrumpyGuardsCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, []);
    });

    it("payloads_are_injected_into_guards", () => {
        eventCommandMap
            .map("trigger", Event)
            .toCommand(TestSequenceWithPayloadInjectedIntoGuardsCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        assert.deepEqual(reported, [
            "Guard of Command 1",
            "Command 1",
            "Guard of Command 2",
            "Command 2",
            "Guard of Command 3",
            "Command 3"
        ]);
    });

    it("payloads_are_injected_into_hooks", () => {
        eventCommandMap
            .map("trigger", Event)
            .toCommand(TestSequenceWithPayloadInjectedIntoHooksCommand);
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

    it("async_commands_are_executed_in_order", (done: Function) => {
        eventCommandMap.map("trigger", Event).toCommand(TestSequenceWithAsyncCommand);
        dispatcher.dispatchEvent(new Event("trigger"));

        setTimeout(() => {
            assert.deepEqual(reported, [
                "Start execution of Command 1 and await 50 milliseconds",
                "Complete execution of Command 1",
                "Start execution of Command 2 and await 50 milliseconds",
                "Complete execution of Command 2",
                "Start execution of Command 3 and await 50 milliseconds",
                "Complete execution of Command 3",
                "Start execution of Command 4 and await 50 milliseconds",
                "Complete execution of Command 4"
            ]);

            done();
        }, 250);
    });

    it("async_commands_are_executed_in_order_and_complete_callback_is_called", (done: Function) => {
        eventCommandMap
            .map("trigger", Event)
            .toCommand(TestSequenceWithAsyncAndCompleteCallbackCommand);
        dispatcher.dispatchEvent(new Event("trigger"));

        setTimeout(() => {
            assert.deepEqual(reported, [
                "Start execution of Command 1 and await 50 milliseconds",
                "Complete execution of Command 1",
                "Start execution of Command 2 and await 50 milliseconds",
                "Complete execution of Command 2",
                "Start execution of Command 3 and await 50 milliseconds",
                "Complete execution of Command 3",
                "All commands have been executed!"
            ]);

            done();
        }, 250);
    });

    it("subsequent_async_commands_are_still_executed_when_a_command_fails", (done: Function) => {
        eventCommandMap.map("trigger", Event).toCommand(TestAtomicSequenceWithAsyncCommand);
        dispatcher.dispatchEvent(new Event("trigger"));

        setTimeout(() => {
            assert.deepEqual(reported, [
                "Start execution of Command 1 and await 50 milliseconds",
                "Complete execution of Command 1",
                "Start execution of Command 2 and await 50 milliseconds",
                "Execution of Command 2 failed!",
                "Start execution of Command 3 and await 50 milliseconds",
                "Execution of Command 3 failed!",
                "Start execution of Command 4 and await 50 milliseconds",
                "Execution of Command 4 failed!"
            ]);

            done();
        }, 250);
    });

    it("subsequent_async_commands_are_still_executed_when_a_command_fails_and_complete_callback_is_called", (done: Function) => {
        eventCommandMap
            .map("trigger", Event)
            .toCommand(TestAtomicSequenceWithAsyncAndCompleteCallbackCommand);
        dispatcher.dispatchEvent(new Event("trigger"));

        setTimeout(() => {
            assert.deepEqual(reported, [
                "Start execution of Command 1 and await 50 milliseconds",
                "Complete execution of Command 1",
                "Start execution of Command 2 and await 50 milliseconds",
                "Execution of Command 2 failed!",
                "Start execution of Command 3 and await 50 milliseconds",
                "Execution of Command 3 failed!",
                "All commands have been executed but some of them failed."
            ]);

            done();
        }, 250);
    });

    it("subsequent_async_commands_are_not_executed_when_a_command_fails", (done: Function) => {
        eventCommandMap.map("trigger", Event).toCommand(TestNotAtomicSequenceWithAsyncCommand);
        dispatcher.dispatchEvent(new Event("trigger"));

        setTimeout(() => {
            assert.deepEqual(reported, [
                "Start execution of Command 1 and await 50 milliseconds",
                "Complete execution of Command 1",
                "Start execution of Command 2 and await 50 milliseconds",
                "Execution of Command 2 failed!"
            ]);

            done();
        }, 250);
    });

    it("event_is_mapped_in_the_context_of_sub_commands", () => {
        const event: Event = new Event("trigger");
        event.data = "Command:";
        eventCommandMap.map("trigger", Event).toCommand(TestSequenceWithPayloadCommand);
        dispatcher.dispatchEvent(event);
        assert.deepEqual(reported, ["Command:1", "Command:2", "Command:3"]);
    });
});
