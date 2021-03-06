// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IConfig } from "@robotlegsjs/core";
import { assert } from "chai";
import { IContextSceneManager } from "../../../../../../src/robotlegs/bender/extensions/contextSceneManager/api/IContextSceneManager";
import { ContextSceneManager } from "../../../../../../src/robotlegs/bender/extensions/contextSceneManager/impl/ContextSceneManager";
import "../../../../../entry";

describe("ContextSceneManager", () => {
    let game: Phaser.Game;
    let contextSceneManager: IContextSceneManager;

    beforeEach(() => {
        game = new Phaser.Game();
    });

    afterEach(() => {
        game = null;
        contextSceneManager = null;
    });

    it("sceneManager_is_stored", () => {
        contextSceneManager = new ContextSceneManager(game.scene);
        assert.isNotNull(contextSceneManager.sceneManager);
        assert.equal(contextSceneManager.sceneManager, game.scene);
    });

    it("ContextSceneManager_throws_a_error_when_scene_manager_is_null", () => {
        function inicializeContextSceneManagerWithNullSceneManager(): void {
            contextSceneManager = new ContextSceneManager(null);
        }
        assert.throws(inicializeContextSceneManagerWithNullSceneManager, Error);
    });

    it("ContextSceneManager_throws_a_error_when_scene_manager_is_undefined", () => {
        function inicializeContextSceneManagerWithUndefinedSceneManager(): void {
            contextSceneManager = new ContextSceneManager(undefined);
        }
        assert.throws(inicializeContextSceneManagerWithUndefinedSceneManager, Error);
    });

    it("ContextSceneManager_has_configure_method_implementation", () => {
        let config: IConfig = new ContextSceneManager(game.scene);
        config.configure();
        assert.isNotNull(config.configure);
    });
});
