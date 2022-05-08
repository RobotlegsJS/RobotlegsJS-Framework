// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/**
 * Patch PIXI to:
 * - emit "added"/"removed" events on stage
 * - implement PIXI.Container.contains method
 */

import { Container, DisplayObject } from "pixi.js";

function isConnectedToStage(stage: Container, object: DisplayObject): boolean {
    if (object === stage) {
        return true;
    } else if (object.parent) {
        return isConnectedToStage(stage, object.parent);
    } else {
        return false;
    }
}

function emitAddedEvent(stage: Container, target: DisplayObject): void {
    stage.emit("added", { target });

    if (target instanceof Container) {
        target.children.forEach((child) => emitAddedEvent(stage, child));
    }
}

function emitRemovedEvent(stage: Container, target: DisplayObject): void {
    stage.emit("removed", { target });

    if (target instanceof Container) {
        target.children.forEach((child) => emitRemovedEvent(stage, child));
    }
}

export function applyPixiPatch(stage: Container): void {
    let addChild = Container.prototype.addChild;
    let addChildAt = Container.prototype.addChildAt;
    let removeChild = Container.prototype.removeChild;
    let removeChildren = Container.prototype.removeChildren;
    let removeChildAt = Container.prototype.removeChildAt;

    Container.prototype.addChild = function patchedAddChild<T extends DisplayObject[]>(
        ...children: T
    ): T[0] {
        for (let i = 0, len = arguments.length; i < len; i++) {
            const object = arguments[i];
            addChild.call(this, object);

            if (isConnectedToStage(stage, object)) {
                emitAddedEvent(stage, object);
            }
        }
        return arguments[0];
    };

    Container.prototype.addChildAt = function patchedAddChildAt<T extends DisplayObject>(
        child: T,
        index: number
    ): T {
        addChildAt.call(this, child, index);

        if (isConnectedToStage(stage, child)) {
            emitAddedEvent(stage, child);
        }

        return child;
    };

    Container.prototype.removeChild = function patchedRemoveChild<T extends DisplayObject[]>(
        ...children: T
    ): T[0] {
        for (let i = 0, len = arguments.length; i < len; i++) {
            const object = arguments[i];
            if (isConnectedToStage(stage, object)) {
                emitRemovedEvent(stage, object);
            }

            removeChild.call(this, object);
        }

        return arguments[0];
    };

    Container.prototype.removeChildren = function patchedRemoveChildren<
        T extends DisplayObject = Container
    >(beginIndex: number = 0, endIndex?: number): T[] {
        let removedChildren = removeChildren.call(this, beginIndex, endIndex);

        if (isConnectedToStage(stage, this) && removedChildren.length) {
            for (let child of removedChildren) {
                emitRemovedEvent(stage, child);
            }
        }

        return removedChildren;
    };

    Container.prototype.removeChildAt = function patchedRemoveChildAt<
        T extends DisplayObject = Container
    >(index: number): T {
        let child = removeChildAt.call(this, index);

        if (isConnectedToStage(stage, this) && child) {
            emitRemovedEvent(stage, child);
        }

        return child;
    };
}
