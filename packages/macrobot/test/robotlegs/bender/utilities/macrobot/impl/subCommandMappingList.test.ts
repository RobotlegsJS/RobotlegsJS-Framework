// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { SubCommandMapping } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SubCommandMapping";
import { SubCommandMappingList } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SubCommandMappingList";

import { NullCommand } from "../support/NullCommand";
import { NullCommand2 } from "../support/NullCommand2";
import { HappyGuard } from "../support/HappyGuard";
import { GrumpyGuard } from "../support/GrumpyGuard";
import { ReportHook } from "../support/ReportHook";

describe("SubCommandMappingList", () => {
    let subject: SubCommandMappingList;

    beforeEach(() => {
        subject = new SubCommandMappingList();
    });

    afterEach(() => {
        subject = null;
    });

    it("getList_return_empty_list", () => {
        assert.equal(subject.getList().length, 0);
    });

    it("addMapping_stores_mapping_in_the_lits", () => {
        let mapping: SubCommandMapping = new SubCommandMapping(NullCommand);
        subject.addMapping(mapping);
        assert.deepEqual(subject.getList(), [mapping]);
    });

    it("addMapping_stores_mapping_even_when_is_duplicated", () => {
        let mapping: SubCommandMapping = new SubCommandMapping(NullCommand);
        subject.addMapping(mapping);
        subject.addMapping(mapping);
        subject.addMapping(mapping);
        assert.deepEqual(subject.getList(), [mapping, mapping, mapping]);
    });

    it("addMapping_stores_mapping_for_same_command_with_different_configurations", () => {
        let mapping1: SubCommandMapping = new SubCommandMapping(NullCommand);
        let mapping2: SubCommandMapping = new SubCommandMapping(NullCommand);
        mapping1.withPayloads("Command 1", 50).withGuards(HappyGuard).withHooks(ReportHook);
        mapping1.withPayloads("Command 2", 100).withGuards(GrumpyGuard).withHooks(ReportHook);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        assert.deepEqual(subject.getList(), [mapping1, mapping2]);
    });

    it("addMapping_stores_mapping_for_different_commands_with_different_configurations", () => {
        let mapping1: SubCommandMapping = new SubCommandMapping(NullCommand);
        let mapping2: SubCommandMapping = new SubCommandMapping(NullCommand2);
        mapping1.withPayloads("Command 1", 50).withGuards(HappyGuard).withHooks(ReportHook);
        mapping1.withPayloads("Command 2", 100).withGuards(GrumpyGuard).withHooks(ReportHook);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        assert.deepEqual(subject.getList(), [mapping1, mapping2]);
    });

    it("removeMapping_works_when_list_is_empty", () => {
        let mapping: SubCommandMapping = new SubCommandMapping(NullCommand);
        subject.removeMapping(mapping);
        assert.deepEqual(subject.getList(), []);
    });

    it("removeMapping_remove_previously_added_mapping", () => {
        let mapping: SubCommandMapping = new SubCommandMapping(NullCommand);
        subject.addMapping(mapping);
        subject.removeMapping(mapping);
        assert.deepEqual(subject.getList(), []);
    });

    it("removeMapping_remove_previously_mapping_added_multiple_times", () => {
        let mapping: SubCommandMapping = new SubCommandMapping(NullCommand);
        subject.addMapping(mapping);
        subject.addMapping(mapping);
        subject.addMapping(mapping);
        subject.removeMapping(mapping);
        assert.deepEqual(subject.getList(), []);
    });

    it("removeMapping_only_remove_previously_mapping_added_multiple_times", () => {
        let mapping1: SubCommandMapping = new SubCommandMapping(NullCommand);
        let mapping2: SubCommandMapping = new SubCommandMapping(NullCommand);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        subject.removeMapping(mapping2);
        assert.deepEqual(subject.getList(), [mapping1, mapping1, mapping1]);
    });

    it("removeMappingsFor_removes_all_mappings_of_passed_command", () => {
        let mapping1: SubCommandMapping = new SubCommandMapping(NullCommand);
        let mapping2: SubCommandMapping = new SubCommandMapping(NullCommand);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        subject.removeMappingsFor(NullCommand);
        assert.deepEqual(subject.getList(), []);
    });

    it("removeMappingsFor_only_removes_mappings_of_passed_command", () => {
        let mapping1: SubCommandMapping = new SubCommandMapping(NullCommand);
        let mapping2: SubCommandMapping = new SubCommandMapping(NullCommand2);
        let mapping3: SubCommandMapping = new SubCommandMapping(NullCommand);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        subject.addMapping(mapping3);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        subject.addMapping(mapping3);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        subject.addMapping(mapping3);
        subject.removeMappingsFor(NullCommand);
        assert.deepEqual(subject.getList(), [mapping2, mapping2, mapping2]);
    });

    it("removeMappingsFor_do_nothing_when_command_was_not_previously_added", () => {
        let mapping1: SubCommandMapping = new SubCommandMapping(NullCommand);
        subject.addMapping(mapping1);
        subject.addMapping(mapping1);
        subject.addMapping(mapping1);
        subject.removeMappingsFor(NullCommand2);
        assert.deepEqual(subject.getList(), [mapping1, mapping1, mapping1]);
    });

    it("removeAllMappings_removes_all_previously_added_mappings", () => {
        let mapping1: SubCommandMapping = new SubCommandMapping(NullCommand);
        let mapping2: SubCommandMapping = new SubCommandMapping(NullCommand2);
        let mapping3: SubCommandMapping = new SubCommandMapping(NullCommand);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        subject.addMapping(mapping3);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        subject.addMapping(mapping3);
        subject.addMapping(mapping1);
        subject.addMapping(mapping2);
        subject.addMapping(mapping3);
        subject.removeAllMappings();
        assert.deepEqual(subject.getList(), []);
    });

    it("removeAllMappings_do_nothing_when_list_is_empty", () => {
        subject.removeAllMappings();
        assert.deepEqual(subject.getList(), []);
    });
});
