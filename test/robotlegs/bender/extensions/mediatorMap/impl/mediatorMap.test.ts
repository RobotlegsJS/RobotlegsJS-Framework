// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import DisplayObjectContainer from "openfl/display/DisplayObjectContainer";
import DisplayObject from "openfl/display/DisplayObject";

import { IContext, Context, TypeMatcher } from "@robotlegsjs/core";

import { IMediatorMapper } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/dsl/IMediatorMapper";
import { MediatorMap } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorMap";
import { MediatorMapper } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorMapper";

describe("MediatorMap", () => {
    let context: IContext = null;
    let mediatorMap: MediatorMap = null;

    beforeEach(() => {
        context = new Context();
        mediatorMap = new MediatorMap(context);
    });

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }

        context = null;
        mediatorMap = null;
    });

    xit("mapMatcher_creates_mapper", () => {
        const matcher: TypeMatcher = new TypeMatcher().allOf(DisplayObjectContainer);
        assert.instanceOf(mediatorMap.mapMatcher(matcher), MediatorMapper);
    });

    xit("mapMatcher_to_matching_TypeMatcher_returns_same_mapper", () => {
        const matcher1: TypeMatcher = new TypeMatcher().allOf(DisplayObjectContainer);
        const matcher2: TypeMatcher = new TypeMatcher().allOf(DisplayObjectContainer);
        const mapper1: IMediatorMapper = mediatorMap.mapMatcher(matcher1);
        const mapper2: IMediatorMapper = mediatorMap.mapMatcher(matcher2);
        assert.equal(mapper1, mapper2);
    });

    xit("mapMatcher_to_differing_TypeMatcher_returns_different_mapper", () => {
        const matcher1: TypeMatcher = new TypeMatcher().allOf(DisplayObjectContainer);
        const matcher2: TypeMatcher = new TypeMatcher().allOf(DisplayObject);
        const mapper1: IMediatorMapper = mediatorMap.mapMatcher(matcher1);
        const mapper2: IMediatorMapper = mediatorMap.mapMatcher(matcher2);
        assert.notEqual(mapper1, mapper2);
    });

    xit("map_creates_mapper", () => {
        assert.instanceOf(mediatorMap.map(DisplayObjectContainer), MediatorMapper);
    });

    xit("map_to_matching_TypeMatcher_returns_same_mapper", () => {
        const mapper1: IMediatorMapper = mediatorMap.map(DisplayObjectContainer);
        const mapper2: IMediatorMapper = mediatorMap.map(DisplayObjectContainer);
        assert.equal(mapper1, mapper2);
    });

    xit("map_to_differing_TypeMatcher_returns_different_mapper", () => {
        const mapper1: IMediatorMapper = mediatorMap.map(DisplayObjectContainer);
        const mapper2: IMediatorMapper = mediatorMap.map(DisplayObject);
        assert.notEqual(mapper1, mapper2);
    });

    xit("unmapMatcher_returns_mapper", () => {
        const mapper: MediatorMapper = <MediatorMapper>mediatorMap.mapMatcher(new TypeMatcher().allOf(DisplayObjectContainer));
        const unmappedMapper: MediatorMapper = <MediatorMapper>mediatorMap.unmapMatcher(new TypeMatcher().allOf(DisplayObjectContainer));
        assert.equal(unmappedMapper, mapper);
    });

    xit("unmap_returns_mapper", () => {
        const mapper: MediatorMapper = <MediatorMapper>mediatorMap.map(DisplayObjectContainer);
        const unmappedMapper: MediatorMapper = <MediatorMapper>mediatorMap.unmap(DisplayObjectContainer);
        assert.equal(unmappedMapper, mapper);
    });

    xit("robust_to_unmapping_non_existent_mappings", () => {
        mediatorMap.unmapMatcher(new TypeMatcher().allOf(DisplayObjectContainer)).fromAll();
    });
});
