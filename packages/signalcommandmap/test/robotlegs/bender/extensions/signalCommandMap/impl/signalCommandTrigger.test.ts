// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { CommandMapper, IInjector, RobotlegsInjector } from "@robotlegsjs/core";
import { ISignal, Signal } from "@robotlegsjs/signals";
import { assert } from "chai";
import { SignalCommandTrigger } from "../../../../../../src/robotlegs/bender/extensions/signalCommandMap/impl/SignalCommandTrigger";
import { SignalCommandMapExtension } from "../../../../../../src/robotlegs/bender/extensions/signalCommandMap/SignalCommandMapExtension";
import "../../../../../entry";
import { CallbackCommand } from "../support/CallbackCommand";
import { CallbackParametersCommand } from "../support/CallbackParametersCommand";
import { NullCommand } from "../support/NullCommand";
import { ParametersSignal } from "../support/ParametersSignal";

import sinon = require("sinon");

describe("SignalCommandTrigger", () => {
    let extension: SignalCommandMapExtension;
    let signal: Signal;
    let injector: IInjector;
    let subject: SignalCommandTrigger;

    beforeEach(() => {
        extension = new SignalCommandMapExtension();
        signal = new Signal();
        injector = new RobotlegsInjector();
        subject = new SignalCommandTrigger(injector, Signal);
    });

    afterEach(() => {
        signal.removeAll();
        signal = null;
        injector = null;
        subject = null;
        extension = null;
    });

    it("extension_is_added", () => {
        assert.isNotNull(extension);
    });

    it("createMapper_returns_a_command_mapper", () => {
        let mapper: any = subject.createMapper();

        assert.instanceOf(mapper, CommandMapper);
    });

    it("test_activate_adds_a_listener", () => {
        let signalMock = sinon.mock(signal);

        signalMock.expects("add").once();

        injector.bind(Signal).toConstantValue(signal);
        subject.activate();

        signalMock.restore();
        signalMock.verify();
    });

    it("test_activate_maps_signal_if_was_not_mapped_before", () => {
        subject = new SignalCommandTrigger(injector, Signal);
        subject.activate();
    });

    it("test_deactivate_removes_listener", () => {
        let signalMock = sinon.mock(signal);

        signalMock.expects("add").once();
        signalMock.expects("remove").once();

        injector.bind(Signal).toConstantValue(signal);
        subject.activate();
        subject.deactivate();

        signalMock.restore();
        signalMock.verify();
    });

    it("test_doesnt_throw_error_when_deactivating_without_signal", () => {
        let signalMock = sinon.mock(signal);

        signalMock.expects("add").never();
        signalMock.expects("remove").never();

        injector.bind(Signal).toConstantValue(signal);
        subject.deactivate();

        signalMock.restore();
        signalMock.verify();
    });

    it("toString_returns_a_string", () => {
        assert.isString(subject.toString());
    });

    it("command_is_triggered_when_signal_dispatch_without_parameters", () => {
        let triggered: boolean = false;
        let mapper: CommandMapper;

        injector
            .bind("Function")
            .toFunction(() => {
                triggered = true;
            })
            .whenTargetNamed("executeCallback");

        injector.bind(Signal).toConstantValue(signal);
        mapper = subject.createMapper();
        mapper.toCommand(CallbackCommand);
        signal.dispatch();

        assert.isTrue(triggered);
    });

    it("command_is_not_triggered_when_trigger_is_deactivated", () => {
        let triggered: boolean = false;
        let mapper: CommandMapper;

        injector
            .bind("Function")
            .toFunction(() => {
                triggered = true;
            })
            .whenTargetNamed("executeCallback");

        injector.bind(Signal).toConstantValue(signal);
        mapper = subject.createMapper();
        mapper.toCommand(CallbackCommand);
        subject.deactivate();
        signal.dispatch();

        assert.isFalse(triggered);
    });

    it("command_is_triggered_but_do_not_receives_parameters_from_signal_without_value_classes", () => {
        const parameters: any[] = [
            true,
            999,
            "I'm a string!",
            ISignal,
            { x: 5, y: 5 },
            new Date(),
            [1, 2, 3, 4, 5, 6, 7, 8, 9]
        ];
        const expected: any[] = [];
        let actual: any[] = [];

        let mapper: CommandMapper;

        injector
            .bind("Function")
            .toFunction((parameter: any) => {
                actual.push(parameter);
            })
            .whenTargetNamed("reportParameter");

        injector.bind(Signal).toConstantValue(signal);
        mapper = subject.createMapper();
        mapper.toCommand(CallbackParametersCommand);
        signal.dispatch.apply(signal, parameters);

        assert.deepEqual(actual, expected);
    });

    it("command_is_triggered_and_receives_parameters_from_signal_with_value_classes", () => {
        const expected: any[] = [
            true,
            999,
            "I'm a string!",
            ISignal,
            { x: 5, y: 5 },
            new Date(),
            [1, 2, 3, 4, 5, 6, 7, 8, 9]
        ];
        let actual: any[] = [];

        let mapper: CommandMapper;

        injector
            .bind("Function")
            .toFunction((parameter: any) => {
                actual.push(parameter);
            })
            .whenTargetNamed("reportParameter");

        signal = new ParametersSignal();
        injector.bind(Signal).toConstantValue(signal);
        mapper = subject.createMapper();
        mapper.toCommand(CallbackParametersCommand);
        signal.dispatch.apply(signal, expected);

        assert.deepEqual(actual, expected);
    });

    it("mapping_processor_is_called", () => {
        let processors: Function[] = [];
        let callCount: number = 0;
        let mapper: CommandMapper;

        processors.push((mapping: any) => {
            callCount++;
        });

        injector.bind(Signal).toConstantValue(signal);
        subject = new SignalCommandTrigger(injector, Signal, processors);
        mapper = subject.createMapper();
        mapper.toCommand(NullCommand);
        signal.dispatch();

        assert.equal(callCount, 1);
    });

    it("mapping_processors_are_called", () => {
        let processors: Function[] = [];
        let callCount: number = 0;
        let mapper: CommandMapper;

        processors.push((mapping: any) => {
            callCount++;
        });
        processors.push((mapping: any) => {
            callCount++;
        });
        processors.push((mapping: any) => {
            callCount++;
        });

        injector.bind(Signal).toConstantValue(signal);
        subject = new SignalCommandTrigger(injector, Signal, processors);
        mapper = subject.createMapper();
        mapper.toCommand(NullCommand);
        signal.dispatch();

        assert.equal(callCount, 3);
    });
});
