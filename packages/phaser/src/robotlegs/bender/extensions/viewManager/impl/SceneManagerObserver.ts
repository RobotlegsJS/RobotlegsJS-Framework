// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { SceneManagerBinding } from "./SceneManagerBinding";
import { SceneRegistry } from "./SceneRegistry";
import { SceneRegistryEvent } from "./SceneRegistryEvent";

/**
 * @private
 */
export class SceneManagerObserver {
    private _registry: SceneRegistry;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    public constructor(sceneRegistry: SceneRegistry) {
        this._registry = sceneRegistry;

        // We only care about roots
        this._registry.addEventListener(
            SceneRegistryEvent.ROOT_SCENE_MANAGER_ADD,
            this._onRootSceneManagerAdd,
            this
        );
        this._registry.addEventListener(
            SceneRegistryEvent.ROOT_SCENE_MANAGER_REMOVE,
            this._onRootSceneManagerRemove,
            this
        );

        // We might have arrived late on the scene
        this._registry.rootBindings.forEach((binding: SceneManagerBinding) => {
            this._addRootListener(binding.sceneManager);
        });
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public destroy(): void {
        this._registry.removeEventListener(
            SceneRegistryEvent.ROOT_SCENE_MANAGER_ADD,
            this._onRootSceneManagerAdd,
            this
        );
        this._registry.removeEventListener(
            SceneRegistryEvent.ROOT_SCENE_MANAGER_REMOVE,
            this._onRootSceneManagerRemove,
            this
        );

        this._registry.rootBindings.forEach((binding: SceneManagerBinding) => {
            this._removeRootListener(binding.sceneManager);
        });
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _onRootSceneManagerAdd(event: SceneRegistryEvent): void {
        this._addRootListener(event.sceneManager);
    }

    private _onRootSceneManagerRemove(event: SceneRegistryEvent): void {
        this._removeRootListener(event.sceneManager);
    }

    private _addRootListener(sceneManager: Phaser.Scenes.SceneManager): void {
        if (sceneManager) {
            (sceneManager as any).createSceneFromInstance = this._patchCreateSceneMethod(
                sceneManager,
                (sceneManager as any).createSceneFromInstance
            );
            (sceneManager as any).createSceneFromFunction = this._patchCreateSceneMethod(
                sceneManager,
                (sceneManager as any).createSceneFromFunction
            );
            (sceneManager as any).createSceneFromObject = this._patchCreateSceneMethod(
                sceneManager,
                (sceneManager as any).createSceneFromObject
            );

            this._patchGameObjectFactoryAddExistingMethod(sceneManager);
        }
    }

    private _patchGameObjectFactoryAddExistingMethod(
        sceneManager: Phaser.Scenes.SceneManager
    ): void {
        const originalMethod = Phaser.GameObjects.GameObjectFactory.prototype.existing;

        const self = this;

        // eslint-disable-next-line @typescript-eslint/typedef
        Phaser.GameObjects.GameObjectFactory.prototype.existing = function (child) {
            if (child instanceof Phaser.GameObjects.Container) {
                let binding: SceneManagerBinding = self._registry.getBinding(sceneManager);
                if (binding) {
                    binding.handleView(child, <any>child.constructor);
                }
            }
            return originalMethod.apply((child as any).scene.sys.add, arguments);
        };
    }

    private _patchCreateSceneMethod(
        sceneManager: Phaser.Scenes.SceneManager,
        originalMethod: any
    ): (...args: any[]) => Phaser.Scene {
        return (...args) => {
            const scene: Phaser.Scene = originalMethod.apply(sceneManager, args);
            this._onSceneInit(scene);
            return scene;
        };
    }

    private _onSceneInit(scene: Phaser.Scene): void {
        let rootBindings: SceneManagerBinding[] = this._registry.rootBindings;
        let sceneManager: Phaser.Scenes.SceneManager;

        for (const rootBinding of rootBindings) {
            sceneManager = rootBinding.sceneManager;

            if (sceneManager) {
                let binding: SceneManagerBinding = this._registry.getBinding(scene.sys.game.scene);
                if (binding) {
                    // this.events.emit('resume', this);
                    // this.events.emit('wake', this);
                    // this.events.emit('start', this);
                    scene.sys.events.once("start", this._onSceneStart, this);
                }
            }
        }
    }

    private _onSceneStart(sys: Phaser.Scenes.Systems): void {
        sys.events.once("shutdown", this._onSceneShutdown, this);
        sys.events.once("destroy", this._onSceneDestroy, this);
        const binding: SceneManagerBinding = this._registry.getBinding(sys.game.scene);
        if (binding) {
            binding.handleScene(sys.scene, <any>sys.scene.constructor);
        }
    }

    private _onSceneShutdown(sys: Phaser.Scenes.Systems): void {
        sys.events.once("start", this._onSceneStart, this);
        sys.events.off("destroy", this._onSceneDestroy, this, true);
    }

    private _onSceneDestroy(sys: Phaser.Scenes.Systems): void {
        sys.events.off("shutdown", this._onSceneStart, this, true);
    }

    private _removeRootListener(container: any): void {}
}
