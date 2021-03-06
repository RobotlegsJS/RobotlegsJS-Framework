// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import DisplayObjectContainer from "openfl/display/DisplayObjectContainer";

/**
 * @private
 */
export class TreeContainer extends DisplayObjectContainer {
    private _treeDepth: number = 0;
    private _treeWidth: number = 0;
    private _treeChildren: TreeContainer[] = [];

    public constructor(treeDetpth: number, treeWidth: number) {
        super();

        this._treeDepth = treeDetpth;
        this._treeWidth = treeWidth;

        this._populate();
    }

    private _populate(): void {
        if (this._treeDepth > 0) {
            for (let i: number = 0; i < this._treeWidth; i++) {
                let child: TreeContainer = new TreeContainer(this._treeDepth - 1, this._treeWidth);
                this._treeChildren.push(child);
                this.addChild(child);
            }
        }
    }

    public get treeChildren(): TreeContainer[] {
        return this._treeChildren;
    }
}
