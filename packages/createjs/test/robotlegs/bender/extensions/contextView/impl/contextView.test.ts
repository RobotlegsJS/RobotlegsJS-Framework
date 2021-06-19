// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { IContextView } from "../../../../../../src/robotlegs/bender/extensions/contextView/api/IContextView";
import { ContextView } from "../../../../../../src/robotlegs/bender/extensions/contextView/impl/ContextView";
import "../../../../../entry";

describe("ContextView", () => {
    let stage: createjs.Stage;
    let contextView: IContextView;

    beforeEach(() => {
        stage = new createjs.Stage("canvas");
        contextView = new ContextView(stage);
    });

    afterEach(() => {
        contextView = null;
        stage = null;
    });

    it("container_is_stored", () => {
        assert.isNotNull(contextView.view);
        assert.equal(contextView.view, stage);
    });

    it("ContextView_throws_a_error_when_view_is_null", () => {
        function inicializeContextViewWithNullView(): void {
            contextView = new ContextView(null);
        }
        assert.throws(inicializeContextViewWithNullView, Error);
    });

    it("ContextView_throws_a_error_when_view_is_undefined", () => {
        function inicializeContextViewWithUndefinedView(): void {
            contextView = new ContextView(undefined);
        }
        assert.throws(inicializeContextViewWithUndefinedView, Error);
    });
});
