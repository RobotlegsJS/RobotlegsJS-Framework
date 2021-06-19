// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { IContextStateManager } from "../../../../../../src/robotlegs/bender/extensions/contextStateManager/api/IContextStateManager";
import { ContextStateManager } from "../../../../../../src/robotlegs/bender/extensions/contextStateManager/impl/ContextStateManager";
import { ContextStateManagerListenerConfig } from "../../../../../../src/robotlegs/bender/extensions/contextStateManager/impl/ContextStateManagerListenerConfig";
import { StateManager } from "../../../../../../src/robotlegs/bender/extensions/stateManager/impl/StateManager";
import { StateRegistry } from "../../../../../../src/robotlegs/bender/extensions/stateManager/impl/StateRegistry";
import "../../../../../entry";

describe("ContextStateManagerListenerConfig", () => {
    let phaserStateManager: Phaser.StateManager;
    let contextStateManager: IContextStateManager;
    let stateRegistry: StateRegistry;
    let stateManager: StateManager;
    let contextStateManagerListenerConfig: ContextStateManagerListenerConfig;

    beforeEach(() => {
        phaserStateManager = new Phaser.StateManager(null);
        contextStateManager = new ContextStateManager(phaserStateManager);
        stateRegistry = new StateRegistry();
        stateManager = new StateManager(stateRegistry);
        contextStateManagerListenerConfig = new ContextStateManagerListenerConfig(
            contextStateManager,
            stateManager
        );
    });

    afterEach(() => {
        phaserStateManager = null;
        contextStateManager = null;
        stateRegistry = null;
        stateManager = null;
        contextStateManagerListenerConfig = null;
    });

    it("container_is_added_to_view_manager", () => {
        contextStateManagerListenerConfig.configure();
        assert.deepEqual(stateManager.stateManagers, [phaserStateManager]);
    });
});
