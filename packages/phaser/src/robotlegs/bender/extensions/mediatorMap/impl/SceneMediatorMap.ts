// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    IClass,
    IContext,
    ILogger,
    inject,
    injectable,
    ITypeMatcher,
    TypeMatcher
} from "@robotlegsjs/core";
import { ISceneHandler } from "../../viewManager/api/ISceneHandler";
import { ISceneMediatorMap } from "../api/ISceneMediatorMap";
import { IMediatorMapper } from "../dsl/IMediatorMapper";
import { IMediatorUnmapper } from "../dsl/IMediatorUnmapper";
import { MediatorMapper } from "./MediatorMapper";
import { NullMediatorUnmapper } from "./NullMediatorUnmapper";
import { SceneMediatorFactory } from "./SceneMediatorFactory";
import { SceneMediatorHandler } from "./SceneMediatorHandler";

/**
 * @private
 */
@injectable()
export class SceneMediatorMap implements ISceneMediatorMap, ISceneHandler {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappers: Map<string, MediatorMapper> = new Map<string, MediatorMapper>();

    private _logger: ILogger;

    private _factory: SceneMediatorFactory;

    private _sceneHandler: SceneMediatorHandler;

    private _NULL_UNMAPPER: IMediatorUnmapper = new NullMediatorUnmapper();

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    public constructor(@inject(IContext) context: IContext) {
        this._logger = context.getLogger(this);
        this._factory = new SceneMediatorFactory(context.injector);
        this._sceneHandler = new SceneMediatorHandler(this._factory);
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public mapMatcher(matcher: ITypeMatcher): IMediatorMapper {
        const desc = matcher.createTypeFilter().descriptor;
        let mapper: MediatorMapper = this._mappers.get(desc);

        if (mapper) {
            return mapper;
        }

        mapper = this._createMapper(matcher) as MediatorMapper;
        this._mappers.set(desc, mapper);
        return mapper;
    }

    /**
     * @inheritDoc
     */
    public map(scene: IClass<Phaser.Scene>): IMediatorMapper {
        return this.mapMatcher(new TypeMatcher().allOf(scene));
    }

    /**
     * @inheritDoc
     */
    public unmapMatcher(matcher: ITypeMatcher): IMediatorUnmapper {
        return this._mappers.get(matcher.createTypeFilter().descriptor) || this._NULL_UNMAPPER;
    }

    /**
     * @inheritDoc
     */
    public unmap(scene: IClass<Phaser.Scene>): IMediatorUnmapper {
        return this.unmapMatcher(new TypeMatcher().allOf(scene));
    }

    /**
     * @inheritDoc
     */
    public handleScene(scene: Phaser.Scene, type: any): void {
        this._sceneHandler.handleScene(scene, type);
    }

    /**
     * @inheritDoc
     */
    public mediate(scene: IClass<Phaser.Scene>): void {
        this._sceneHandler.handleItem(scene, <any>scene.constructor);
    }

    /**
     * @inheritDoc
     */
    public unmediate(scene: IClass<Phaser.Scene>): void {
        this._factory.removeMediators(scene);
    }

    /**
     * @inheritDoc
     */
    public unmediateAll(): void {
        this._factory.removeAllMediators();
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _createMapper(matcher: ITypeMatcher): IMediatorMapper {
        return new MediatorMapper(matcher.createTypeFilter(), this._sceneHandler, this._logger);
    }
}
