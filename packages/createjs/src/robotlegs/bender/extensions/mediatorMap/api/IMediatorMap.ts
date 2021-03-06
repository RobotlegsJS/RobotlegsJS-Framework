// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ITypeMatcher } from "@robotlegsjs/core";
import { IMediatorMapper } from "../dsl/IMediatorMapper";
import { IMediatorUnmapper } from "../dsl/IMediatorUnmapper";

// eslint-disable-next-line @rushstack/typedef-var
export const IMediatorMap = Symbol("IMediatorMap");

/**
 * The Mediator Map allows you to bind Mediators to objects
 */
export interface IMediatorMap {
    /**
     * Maps a matcher that will be tested against incoming items to be handled.
     *
     * @param matcher The type or package matcher specifying the rules for matching.
     * @return the mapper so that you can continue the mapping.
     */
    mapMatcher(matcher: ITypeMatcher): IMediatorMapper;

    /**
     * Maps a type that will be tested against incoming items to be handled.
     * Under the hood this will create a TypeMatcher for this type.
     *
     * @param type The class or interface to be matched against.
     * @return the mapper so that you can continue the mapping.
     */
    map(type: IClass<any>): IMediatorMapper;

    /**
     * Removes a mapping that was made against a matcher.
     * No error will be thrown if there isn't a mapping to remove.
     *
     * @param matcher The type or package matcher specifying the rules for matching.
     * @return the unmapper so that you can continue the unmapping.
     */
    unmapMatcher(matcher: ITypeMatcher): IMediatorUnmapper;

    /**
     * Removes a mapping that was made against a type.
     * No error will be thrown if there isn't a mapping to remove.
     *
     * @param type The class or interface to be matched against.
     * @return the unmapper so that you can continue the unmapping.
     */
    unmap(type: IClass<any>): IMediatorUnmapper;

    /**
     * Mediates an item directly. If the item matches any mapped matchers or types then it will be mediated according to those mappings.
     *
     * @param item The item to create mediators for.
     */
    mediate(item: any): void;

    /**
     * Removes the mediators for an item if there are any.
     *
     * @param item The item to remove mediators for.
     */
    unmediate(item: any): void;

    /**
     * Removes all mediators
     */
    unmediateAll(): void;
}
