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
import DisplayObject from "openfl/display/DisplayObject";
import { IViewHandler } from "../../viewManager/api/IViewHandler";
import { IMediatorMap } from "../api/IMediatorMap";
import { IMediatorMapper } from "../dsl/IMediatorMapper";
import { IMediatorUnmapper } from "../dsl/IMediatorUnmapper";
import { MediatorFactory } from "./MediatorFactory";
import { MediatorMapper } from "./MediatorMapper";
import { MediatorViewHandler } from "./MediatorViewHandler";
import { NullMediatorUnmapper } from "./NullMediatorUnmapper";

/**
 * @private
 */
@injectable()
export class MediatorMap implements IMediatorMap, IViewHandler {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappers: Map<string, MediatorMapper> = new Map<string, MediatorMapper>();

    private _logger: ILogger;

    private _factory: MediatorFactory;

    private _viewHandler: MediatorViewHandler;

    private _NULL_UNMAPPER: IMediatorUnmapper = new NullMediatorUnmapper();

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    public constructor(@inject(IContext) context: IContext) {
        this._logger = context.getLogger(this);
        this._factory = new MediatorFactory(context.injector);
        this._viewHandler = new MediatorViewHandler(this._factory);
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public mapMatcher(matcher: ITypeMatcher): IMediatorMapper {
        const desc = matcher.createTypeFilter().descriptor;
        let mapper = this._mappers.get(desc);

        if (mapper) {
            return mapper;
        }

        mapper = this._createMapper(matcher);
        this._mappers.set(desc, mapper);
        return mapper;
    }

    /**
     * @inheritDoc
     */
    public map(type: IClass<any>): IMediatorMapper {
        return this.mapMatcher(new TypeMatcher().allOf(type));
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
    public unmap(type: IClass<any>): IMediatorUnmapper {
        return this.unmapMatcher(new TypeMatcher().allOf(type));
    }

    /**
     * @inheritDoc
     */
    public handleView(view: DisplayObject, type: IClass<any>): void {
        this._viewHandler.handleView(view, type);
    }

    /**
     * @inheritDoc
     */
    public mediate(item: any): void {
        this._viewHandler.handleItem(item, <IClass<any>>item.constructor);
    }

    /**
     * @inheritDoc
     */
    public unmediate(item: any): void {
        this._factory.removeMediators(item);
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

    private _createMapper(matcher: ITypeMatcher): MediatorMapper {
        return new MediatorMapper(matcher.createTypeFilter(), this._viewHandler, this._logger);
    }
}
