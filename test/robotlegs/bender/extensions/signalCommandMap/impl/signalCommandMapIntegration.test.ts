// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { IContext, IInjector, Context } from "@robotlegsjs/core";

import { SignalCommandMapExtension } from "../../../../../../src/robotlegs/bender/extensions/signalCommandMap/SignalCommandMapExtension";
import { ISignalCommandMap } from "../../../../../../src/robotlegs/bender/extensions/signalCommandMap/api/ISignalCommandMap";
import { SignalCommandMap } from "../../../../../../src/robotlegs/bender/extensions/signalCommandMap/impl/SignalCommandMap";

import { CascadingCommand } from "../support/CascadingCommand";
import { ExecuteMethodWithParametersCommand } from "../support/ExecuteMethodWithParametersCommand";
import { GrumpyGuard } from "../support/GrumpyGuard";
import { HappyGuard } from "../support/HappyGuard";
import { NullCommand } from "../support/NullCommand";
import { Payload } from "../support/Payload";
import { PayloadInjectedCallbackCommand } from "../support/PayloadInjectedCallbackCommand";
import { PayloadInjectedGuard } from "../support/PayloadInjectedGuard";
import { PayloadInjectedHook } from "../support/PayloadInjectedHook";
import { ReportingCommand } from "../support/ReportingCommand";
import { ReportingCommand2 } from "../support/ReportingCommand2";
import { ReportingCommand3 } from "../support/ReportingCommand3";
import { ReportingGuard } from "../support/ReportingGuard";
import { ReportingGuard2 } from "../support/ReportingGuard2";
import { ReportingHook } from "../support/ReportingHook";
import { StrictPayloadCarryingSignal } from "../support/StrictPayloadCarryingSignal";
import { SupportSignal } from "../support/SupportSignal";
import { SupportSignal2 } from "../support/SupportSignal2";

describe("SignalCommandMap", () => {
    let extension: SignalCommandMapExtension;
    let context: IContext;
    let injector: IInjector;
    let signalCommandMap: SignalCommandMap;
    let reportedExecutions: any[];

    function reportingFunction(item: any, itemClass: any): void {
        reportedExecutions.push(itemClass);
    }

    function commandExecutionCount(totalEvents: number = 1, oneshot: boolean = false, ...valueObjects: any[]): number {
        let executeCount: number = 0;

        injector
            .bind("Function")
            .toFunction((item: any, itemClass: any) => {
                executeCount++;
            })
            .whenTargetNamed("executeCallback");

        signalCommandMap
            .map(SupportSignal)
            .toCommand(ReportingCommand)
            .once(oneshot);

        let signal: SupportSignal = injector.get<SupportSignal>(SupportSignal);

        while (totalEvents--) {
            signal.dispatch.apply(signal, valueObjects);
        }

        return executeCount;
    }

    function oneshotCommandExecutionCount(totalEvents: number = 1): number {
        return commandExecutionCount(totalEvents, true);
    }

    function hookCallCount(...hooks: any[]): number {
        let callCount: number = 0;

        injector
            .bind("Function")
            .toFunction((item: any, itemClass: any) => {
                // do nothing
            })
            .whenTargetNamed("executeCallback");

        injector
            .bind("Function")
            .toFunction((item: any, itemClass: any) => {
                callCount++;
            })
            .whenTargetNamed("hookCallback");

        signalCommandMap
            .map(SupportSignal)
            .toCommand(ReportingCommand)
            .withHooks(hooks);
        let signal: SupportSignal = injector.get(SupportSignal);
        signal.dispatch();
        return callCount;
    }

    function commandExecutionCountWithGuards(...guards: any[]): number {
        let executionCount: number = 0;

        injector
            .bind("Function")
            .toFunction((item: any, itemClass: any) => {
                executionCount++;
            })
            .whenTargetNamed("executeCallback");

        signalCommandMap
            .map(SupportSignal)
            .toCommand(ReportingCommand)
            .withGuards(guards);

        let signal: SupportSignal = injector.get(SupportSignal);

        signal.dispatch();

        return executionCount;
    }

    beforeEach(() => {
        extension = new SignalCommandMapExtension();
        context = new Context();
        injector = context.injector;
        signalCommandMap = new SignalCommandMap(context);
        reportedExecutions = [];
        injector
            .bind("Function")
            .toFunction(reportingFunction)
            .whenTargetNamed("reportingFunction");
    });

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }
        extension = null;
        context = null;
        injector = null;
        signalCommandMap = null;
    });

    it("extension_is_added", () => {
        assert.isNotNull(extension);
    });

    it("test_command_executes_successfully", () => {
        assert.equal(commandExecutionCount(1), 1);
    });

    it("test_command_executes_repeatedly", () => {
        assert.equal(commandExecutionCount(5), 5);
    });

    it("test_fireOnce_command_executes_once", () => {
        assert.equal(oneshotCommandExecutionCount(5), 1);
    });

    it("test_payload_is_injected_into_command", () => {
        let injected: any = null;

        injector
            .bind("Function")
            .toFunction((command: PayloadInjectedCallbackCommand) => {
                injected = command.payload;
            })
            .whenTargetNamed("executeCallback");
        signalCommandMap.map(StrictPayloadCarryingSignal).toCommand(PayloadInjectedCallbackCommand);
        let payload: Payload = new Payload();
        let signal: StrictPayloadCarryingSignal = injector.get(StrictPayloadCarryingSignal);

        signal.dispatch(payload);

        assert.equal(injected, payload);
    });

    it("test_only_commands_mapped_to_dispatching_signal_are_executed", () => {
        injector
            .bind("Function")
            .toFunction(reportingFunction)
            .whenTargetNamed("executeCallback");

        signalCommandMap.map(SupportSignal).toCommand(ReportingCommand);

        signalCommandMap.map(SupportSignal2).toCommand(ReportingCommand2);

        const expected: any[] = [ReportingCommand2];
        let signal: SupportSignal2 = injector.get(SupportSignal2);

        signal.dispatch();

        assert.deepEqual(reportedExecutions, expected);
    });

    it("test_command_does_not_execute_after_signal_unmapped", () => {
        let executeCount: number = 0;

        injector
            .bind("Function")
            .toFunction((item: any, itemClass: any) => {
                executeCount++;
            })
            .whenTargetNamed("executeCallback");

        signalCommandMap.map(SupportSignal).toCommand(ReportingCommand);
        signalCommandMap.unmap(SupportSignal).fromCommand(ReportingCommand);

        let signal: SupportSignal = injector.get(SupportSignal);

        signal.dispatch();

        assert.equal(executeCount, 0);
    });

    it("test_oneshot_mappings_should_not_bork_stacked_mappings", () => {
        injector
            .bind("Function")
            .toFunction(reportingFunction)
            .whenTargetNamed("executeCallback");

        signalCommandMap.map(SupportSignal).toCommand(ReportingCommand);
        signalCommandMap.map(SupportSignal).toCommand(ReportingCommand2);

        let signal: SupportSignal = injector.get(SupportSignal);

        signal.dispatch();

        assert.deepEqual(reportedExecutions, [ReportingCommand, ReportingCommand2]);
    });

    it("test_one_shot_command_should_not_cause_infinite_loop_when_dispatching_to_self", () => {
        let executeCount: number = 0;

        injector
            .bind(SupportSignal)
            .toSelf()
            .inSingletonScope();

        let signal: SupportSignal = injector.get(SupportSignal);

        injector
            .bind("Function")
            .toFunction((item: any, itemClass: any) => {
                executeCount++;
                signal.dispatch();
            })
            .whenTargetNamed("executeCallback");

        signalCommandMap
            .map(SupportSignal)
            .toCommand(ReportingCommand)
            .once();

        signal.dispatch();

        assert.equal(executeCount, 1);
    });

    it("test_cascaded_dispatches_should_not_bork_mappings", () => {
        injector
            .bind("Function")
            .toFunction((item: any, itemClass: any) => {
                reportingFunction(item, itemClass);

                injector.unbind("Function");
                injector
                    .bind("Function")
                    .toFunction(reportingFunction)
                    .whenTargetNamed("executeCallback");

                let signal2: SupportSignal2 = injector.get(SupportSignal2);
                signal2.dispatch();
            })
            .whenTargetNamed("executeCallback");

        signalCommandMap.map(SupportSignal).toCommand(ReportingCommand);
        signalCommandMap.map(SupportSignal).toCommand(ReportingCommand3);
        signalCommandMap.map(SupportSignal2).toCommand(ReportingCommand2);

        let signal1: SupportSignal = injector.get(SupportSignal);

        signal1.dispatch();

        assert.deepEqual(reportedExecutions, [ReportingCommand, ReportingCommand2, ReportingCommand3]);
    });

    it("test_commands_are_executed_in_order", () => {
        injector
            .bind("Function")
            .toFunction(reportingFunction)
            .whenTargetNamed("executeCallback");

        signalCommandMap.map(SupportSignal).toCommand(ReportingCommand);
        signalCommandMap.map(SupportSignal).toCommand(ReportingCommand2);
        signalCommandMap.map(SupportSignal).toCommand(ReportingCommand3);

        let signal: SupportSignal = injector.get(SupportSignal);

        signal.dispatch();

        assert.deepEqual(reportedExecutions, [ReportingCommand, ReportingCommand2, ReportingCommand3]);
    });

    it("test_hooks_are_called", () => {
        assert.equal(hookCallCount(ReportingHook, ReportingHook), 2);
    });

    it("test_command_is_injected_into_hook", () => {
        let executedCommand: ReportingCommand = null;
        let injectedCommand: ReportingCommand = null;

        injector
            .bind("Function")
            .toFunction((command: ReportingCommand, commandClass: any) => {
                executedCommand = command;
            })
            .whenTargetNamed("executeCallback");

        injector
            .bind("Function")
            .toFunction((hook: ReportingHook, hookClass: any) => {
                injectedCommand = hook.command;
            })
            .whenTargetNamed("hookCallback");

        signalCommandMap
            .map(SupportSignal)
            .toCommand(ReportingCommand)
            .withHooks(ReportingHook);

        let signal: SupportSignal = injector.get(SupportSignal);

        signal.dispatch();

        assert.isNotNull(injectedCommand);
        assert.isNotNull(executedCommand);
        assert.equal(injectedCommand, executedCommand);
    });

    it("test_command_executes_when_the_guard_allows", () => {
        assert.equal(commandExecutionCountWithGuards(HappyGuard), 1);
    });

    it("test_command_executes_when_all_guards_allow", () => {
        assert.equal(commandExecutionCountWithGuards(HappyGuard, HappyGuard), 1);
    });

    it("test_command_does_not_execute_when_the_guard_denies", () => {
        assert.equal(commandExecutionCountWithGuards(GrumpyGuard), 0);
    });

    it("test_command_does_not_execute_when_any_guards_denies", () => {
        assert.equal(commandExecutionCountWithGuards(HappyGuard, GrumpyGuard), 0);
    });

    it("test_command_does_not_execute_when_all_guards_deny", () => {
        assert.equal(commandExecutionCountWithGuards(GrumpyGuard, GrumpyGuard), 0);
    });

    it("test_payload_is_injected_into_guard", () => {
        let injected: any = null;

        injector
            .bind("Function")
            .toFunction((guard: PayloadInjectedGuard, guardClass: any) => {
                injected = guard.payload;
            })
            .whenTargetNamed("approveCallback");

        signalCommandMap
            .map(StrictPayloadCarryingSignal)
            .toCommand(NullCommand)
            .withGuards(PayloadInjectedGuard);

        let payload: Payload = new Payload();
        let signal: StrictPayloadCarryingSignal = injector.get(StrictPayloadCarryingSignal);

        signal.dispatch(payload);

        assert.isNotNull(injected);
        assert.equal(injected, payload);
    });

    it("test_payload_is_injected_into_hook", () => {
        let injected: any = null;

        injector
            .bind("Function")
            .toFunction((hook: PayloadInjectedHook, hookClass: any) => {
                injected = hook.payload;
            })
            .whenTargetNamed("hookCallback");

        signalCommandMap
            .map(StrictPayloadCarryingSignal)
            .toCommand(NullCommand)
            .withHooks(PayloadInjectedHook);

        let payload: Payload = new Payload();
        let signal: StrictPayloadCarryingSignal = injector.get(StrictPayloadCarryingSignal);

        signal.dispatch(payload);

        assert.isNotNull(injected);
        assert.equal(injected, payload);
    });

    it("test_strict_payload_is_passed_to_execute_method", () => {
        let injected: any = null;

        injector
            .bind("Function")
            .toFunction((command: ExecuteMethodWithParametersCommand) => {
                injected = command.payload;
            })
            .whenTargetNamed("executeCallback");

        signalCommandMap.map(StrictPayloadCarryingSignal).toCommand(ExecuteMethodWithParametersCommand);

        let payload: Payload = new Payload();
        let signal: StrictPayloadCarryingSignal = injector.get(StrictPayloadCarryingSignal);

        signal.dispatch(payload);

        assert.isNotNull(injected);
        assert.equal(injected, payload);
    });

    it("test_loose_payload_isnt_passed_to_execute_method", () => {
        let injected: any = null;

        injector
            .bind("Function")
            .toFunction((command: ExecuteMethodWithParametersCommand) => {
                injected = command.payload;
            })
            .whenTargetNamed("executeCallback");

        signalCommandMap.map(SupportSignal).toCommand(ExecuteMethodWithParametersCommand);

        let payload: Payload = new Payload();
        let signal: SupportSignal = injector.get(SupportSignal);

        signal.dispatch(payload);

        assert.isNull(injected);
    });

    it("test_cascading_signals_do_not_throw_unmap_errors", () => {
        let executeCount: number = 0;

        injector
            .bind("Function")
            .toFunction(() => {
                executeCount++;
            })
            .whenTargetNamed("executeCallback");

        injector.bind(ISignalCommandMap).toConstantValue(signalCommandMap);

        signalCommandMap
            .map(SupportSignal)
            .toCommand(CascadingCommand)
            .once();
        let signal: SupportSignal = injector.get(SupportSignal);

        signal.dispatch();

        assert.equal(executeCount, 1);
    });

    it("test_execution_sequence_is_guard_command_guard_command_for_multiple_mappings_to_same_signal", () => {
        injector
            .bind("Function")
            .toFunction(reportingFunction)
            .whenTargetNamed("executeCallback");

        injector
            .bind("Function")
            .toFunction(reportingFunction)
            .whenTargetNamed("approveCallback");

        signalCommandMap
            .map(SupportSignal)
            .toCommand(ReportingCommand)
            .withGuards(ReportingGuard);
        signalCommandMap
            .map(SupportSignal)
            .toCommand(ReportingCommand2)
            .withGuards(ReportingGuard2);

        let signal: SupportSignal = injector.get(SupportSignal);

        signal.dispatch();

        assert.deepEqual(reportedExecutions, [ReportingGuard, ReportingCommand, ReportingGuard2, ReportingCommand2]);
    });

    it("test_previously_constructed_command_does_not_slip_through_the_loop", () => {
        injector
            .bind("Function")
            .toFunction(reportingFunction)
            .whenTargetNamed("executeCallback");

        signalCommandMap
            .map(SupportSignal)
            .toCommand(ReportingCommand)
            .withGuards(HappyGuard);
        signalCommandMap
            .map(SupportSignal)
            .toCommand(ReportingCommand2)
            .withGuards(GrumpyGuard);

        let signal: SupportSignal = injector.get(SupportSignal);

        signal.dispatch();

        assert.deepEqual(reportedExecutions, [ReportingCommand]);
    });

    it("test_command_executes_when_signal_mapped_to_injector_up_front", () => {
        injector
            .bind("Function")
            .toFunction(reportingFunction)
            .whenTargetNamed("executeCallback");

        injector
            .bind(SupportSignal)
            .toSelf()
            .inSingletonScope();

        signalCommandMap.map(SupportSignal).toCommand(ReportingCommand);

        let signal: SupportSignal = injector.get(SupportSignal);

        signal.dispatch();

        assert.deepEqual(reportedExecutions, [ReportingCommand]);
    });
});
