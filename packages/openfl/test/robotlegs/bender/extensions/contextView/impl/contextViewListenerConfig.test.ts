// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import Stage from "openfl/display/Stage";
import { IContextView } from "../../../../../../src/robotlegs/bender/extensions/contextView/api/IContextView";
import { ContextView } from "../../../../../../src/robotlegs/bender/extensions/contextView/impl/ContextView";
import { ContextViewListenerConfig } from "../../../../../../src/robotlegs/bender/extensions/contextView/impl/ContextViewListenerConfig";
import { ContainerRegistry } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";
import { ViewManager } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ViewManager";
import "../../../../../entry";

describe("ContextViewListenerConfig", () => {
    let stage: Stage;
    let contextView: IContextView;
    let containerRegistry: ContainerRegistry;
    let viewManager: ViewManager;
    let contextViewListenerConfig: ContextViewListenerConfig;

    beforeEach(() => {
        stage = new Stage();
        contextView = new ContextView(stage);
        containerRegistry = new ContainerRegistry();
        viewManager = new ViewManager(containerRegistry);
        contextViewListenerConfig = new ContextViewListenerConfig(contextView, viewManager);
    });

    afterEach(() => {
        contextView = null;
        stage = null;
        containerRegistry = null;
        viewManager = null;
        contextViewListenerConfig = null;
    });

    it("container_is_added_to_view_manager", () => {
        contextViewListenerConfig.configure();
        assert.deepEqual(viewManager.containers, [stage]);
    });
});
