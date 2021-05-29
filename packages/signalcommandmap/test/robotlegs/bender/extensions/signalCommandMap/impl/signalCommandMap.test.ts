// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { ISignal, Signal } from "@robotlegsjs/signals";

import { IContext, ICommandMapper, Context, CommandMapper } from "@robotlegsjs/core";

import { SignalCommandMapExtension } from "../../../../../../src/robotlegs/bender/extensions/signalCommandMap/SignalCommandMapExtension";
import { SignalCommandMap } from "../../../../../../src/robotlegs/bender/extensions/signalCommandMap/impl/SignalCommandMap";

import { NullCommand } from "../support/NullCommand";

describe("SignalCommandMap", () => {
    let extension: SignalCommandMapExtension;
    let signal: ISignal;
    let context: IContext;
    let subject: SignalCommandMap;

    beforeEach(() => {
        extension = new SignalCommandMapExtension();
        signal = new Signal();
        context = new Context();
        subject = new SignalCommandMap(context);
    });

    afterEach(() => {
        signal.removeAll();
        if (context.initialized) {
            context.destroy();
        }
        extension = null;
        signal = null;
        context = null;
        subject = null;
    });

    it("extension_is_added", () => {
        assert.isNotNull(extension);
    });

    it("map_creates_mapper", () => {
        let mapper: any = subject.map(Signal);

        assert.instanceOf(mapper, CommandMapper);
    });

    it("test_map_returns_new_mapper_when_identical_signal", () => {
        let mapper1: ICommandMapper = subject.map(Signal);
        let mapper2: ICommandMapper = subject.map(Signal);

        assert.isNotNull(mapper1);
        assert.isNotNull(mapper2);
        assert.notEqual(mapper1, mapper2);
    });

    it("test_unmap_returns_unmapper", () => {
        let mapper: any = subject.unmap(Signal);

        assert.instanceOf(mapper, CommandMapper);
    });

    it("test_robust_unmapping_non_existent_mappings", () => {
        subject.unmap(Signal).fromCommand(NullCommand);
    });

    it("mapping_processor_is_called", () => {
        let callCount: number = 0;
        subject.addMappingProcessor((mapping: any) => {
            callCount++;
        });
        subject.map(Signal).toCommand(NullCommand);
        assert.equal(callCount, 1);
    });

    it("mapping_processors_are_called", () => {
        let callCount: number = 0;
        subject.addMappingProcessor((mapping: any) => {
            callCount++;
        });
        subject.addMappingProcessor((mapping: any) => {
            callCount++;
        });
        subject.addMappingProcessor((mapping: any) => {
            callCount++;
        });
        subject.map(Signal).toCommand(NullCommand);
        assert.equal(callCount, 3);
    });

    it("mapping_processor_added_twice_is_called_once", () => {
        let callCount: number = 0;
        let handler: Function = (mapping: any) => {
            callCount++;
        };
        subject.addMappingProcessor(handler);
        subject.addMappingProcessor(handler);
        subject.map(Signal).toCommand(NullCommand);
        assert.equal(callCount, 1);
    });
});
