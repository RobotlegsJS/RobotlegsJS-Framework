// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { IContextStateManager } from "../../../../../../src/robotlegs/bender/extensions/contextStateManager/api/IContextStateManager";
import { ContextStateManager } from "../../../../../../src/robotlegs/bender/extensions/contextStateManager/impl/ContextStateManager";
import "../../../../../entry";

describe("ContextStateManager", () => {
    let stateManager: Phaser.StateManager;
    let contextStateManager: IContextStateManager;

    beforeEach(() => {
        stateManager = new Phaser.StateManager(null);
    });

    afterEach(() => {
        stateManager = null;
        contextStateManager = null;
    });

    it("stateManager_is_stored", () => {
        contextStateManager = new ContextStateManager(stateManager);
        assert.isNotNull(contextStateManager.stateManager);
        assert.equal(contextStateManager.stateManager, stateManager);
    });

    it("ContextStateManager_throws_a_error_when_state_manager_is_null", () => {
        function inicializeContextStateManagerWithNullStateManager(): void {
            contextStateManager = new ContextStateManager(null);
        }
        assert.throws(inicializeContextStateManagerWithNullStateManager, Error);
    });

    it("ContextStateManager_throws_a_error_when_state_manager_is_undefined", () => {
        function inicializeContextStateManagerWithUndefinedStateManager(): void {
            contextStateManager = new ContextStateManager(undefined);
        }
        assert.throws(inicializeContextStateManagerWithUndefinedStateManager, Error);
    });
});
