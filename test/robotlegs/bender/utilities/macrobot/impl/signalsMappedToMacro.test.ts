// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Signal } from "@robotlegsjs/signals";

import { IContext, IInjector, Context, CommandMapper } from "@robotlegsjs/core";

import { SignalCommandTrigger } from "@robotlegsjs/signalcommandmap";

import { DelaySignal } from "../support/DelaySignal";
import { NoParametersSignal } from "../support/NoParametersSignal";
import { ParametersSignal } from "../support/ParametersSignal";
import { TestNestedSequenceBySignalCommand } from "../support/TestNestedSequenceBySignalCommand";
import { TestParallelByNoPayloadSignalCommand } from "../support/TestParallelByNoPayloadSignalCommand";
import { TestParallelBySignalCommand } from "../support/TestParallelBySignalCommand";
import { TestSequenceByCustomPayloadSignalCommand } from "../support/TestSequenceByCustomPayloadSignalCommand";
import { TestSequenceByNoPayloadSignalCommand } from "../support/TestSequenceByNoPayloadSignalCommand";
import { TestSequenceBySignalCommand } from "../support/TestSequenceBySignalCommand";

describe("SignalsMappedToMacro", () => {
    let context: IContext;
    let injector: IInjector;
    let signal: Signal;
    let signalCommandTrigger: SignalCommandTrigger;
    let mapper: CommandMapper;
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

        signalCommandTrigger = new SignalCommandTrigger(injector, Signal);
        context.initialize();
        reported = [];
    });

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }

        signal.removeAll();

        context = null;
        injector = null;
        reported = null;
        signal = null;
        signalCommandTrigger = null;
        mapper = null;
        reported = null;
    });

    it("payload_dispatched_by_signal_is_mapped_into_sequence_sub_commands", () => {
        const expected: any[] = [true, 999, "I'm a string!", Symbol("symbol"), { x: 5, y: 5 }, new Date(), [1, 2, 3, 4, 5, 6, 7, 8, 9]];

        signal = new ParametersSignal();
        injector.bind(Signal).toConstantValue(signal);
        mapper = signalCommandTrigger.createMapper();
        mapper.toCommand(TestSequenceBySignalCommand);
        signal.dispatch.apply(signal, expected);

        assert.deepEqual(reported, expected.concat(expected));
    });

    it("payload_dispatched_by_signal_is_mapped_into_nested_sequence_sub_commands", () => {
        const expected: any[] = [true, 999, "I'm a string!", Symbol("symbol"), { x: 5, y: 5 }, new Date(), [1, 2, 3, 4, 5, 6, 7, 8, 9]];

        signal = new ParametersSignal();
        injector.bind(Signal).toConstantValue(signal);
        mapper = signalCommandTrigger.createMapper();
        mapper.toCommand(TestNestedSequenceBySignalCommand);
        signal.dispatch.apply(signal, expected);

        assert.deepEqual(reported, expected.concat(expected));
    });

    it("no_payload_dispatched_by_signal_is_mapped_into_sequence_sub_commands", () => {
        signal = new NoParametersSignal();
        injector.bind(Signal).toConstantValue(signal);
        mapper = signalCommandTrigger.createMapper();
        mapper.toCommand(TestSequenceByNoPayloadSignalCommand);
        signal.dispatch.apply(signal);

        assert.deepEqual(reported, []);
    });

    it("subcommand_payload_is_mapped_into_nested_subcommands", () => {
        signal = new NoParametersSignal();
        injector.bind(Signal).toConstantValue(signal);
        mapper = signalCommandTrigger.createMapper();
        mapper.toCommand(TestSequenceByCustomPayloadSignalCommand);
        signal.dispatch.apply(signal);

        assert.deepEqual(reported, ["command1", "command2"]);
    });

    it("payload_dispatched_by_signal_is_mapped_into_parallel_sub_commands", (done: Function) => {
        signal = new DelaySignal();
        injector.bind(Signal).toConstantValue(signal);
        mapper = signalCommandTrigger.createMapper();
        mapper.toCommand(TestParallelBySignalCommand);
        signal.dispatch(Symbol("to be ignored"), 50);

        setTimeout(() => {
            assert.deepEqual(reported, [
                "Start execution of Command 1 and await 50 milliseconds",
                "Start execution of Command 2 and await 50 milliseconds",
                "Start execution of Command 3 and await 50 milliseconds",
                "Start execution of Command 4 and await 50 milliseconds",
                "Complete execution of Command 1",
                "Complete execution of Command 2",
                "Complete execution of Command 3",
                "Complete execution of Command 4"
            ]);

            done();
        }, 250);
    });

    it("no_payload_dispatched_by_signal_is_mapped_into_parallel_sub_commands", (done: Function) => {
        signal = new NoParametersSignal();
        injector.bind(Signal).toConstantValue(signal);
        mapper = signalCommandTrigger.createMapper();
        mapper.toCommand(TestParallelByNoPayloadSignalCommand);
        signal.dispatch();

        setTimeout(() => {
            assert.deepEqual(reported, []);
            done();
        }, 250);
    });
});
