// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/**
 * Patch createjs to:
 * - emit "added"/"removed" events on stage
 */

function isConnectedToStage(stage: createjs.Stage, displayObject: createjs.DisplayObject): boolean {
    return displayObject.stage === stage;
}

function emitAddedEvent(stage: createjs.Stage, target: createjs.DisplayObject): void {
    let event: createjs.Event = new createjs.Event("added", true, false);

    event.data = target;

    stage.dispatchEvent(event);

    if (target instanceof createjs.Container) {
        target.children.forEach((child) => emitAddedEvent(stage, child));
    }
}

function emitRemovedEvent(stage: createjs.Stage, target: createjs.DisplayObject): void {
    let event: createjs.Event = new createjs.Event("removed", true, false);

    event.data = target;

    stage.dispatchEvent(event);

    if (target instanceof createjs.Container) {
        target.children.forEach((child) => emitRemovedEvent(stage, child));
    }
}

export function applyCreateJSPatch(stage: createjs.Stage): void {
    let addChild = createjs.Container.prototype.addChild;
    let addChildAt = createjs.Container.prototype.addChildAt;
    let removeChild = createjs.Container.prototype.removeChild;
    let removeChildAt = createjs.Container.prototype.removeChildAt;
    let removeAllChildren = createjs.Container.prototype.removeAllChildren;

    createjs.Container.prototype.addChild = function patchedAddChild<
        T extends createjs.DisplayObject
    >(child: T, ...additionalChildren: T[]): T {
        for (let i = 0, len = arguments.length; i < len; i++) {
            const object = arguments[i];
            addChild.call(this, object);

            if (isConnectedToStage(stage, object)) {
                emitAddedEvent(stage, object);
            }
        }

        return arguments[arguments.length - 1];
    };

    createjs.Container.prototype.addChildAt = function patchedAddChildAt<
        T extends createjs.DisplayObject
    >(...childOrIndex: T[] | number[]): T {
        for (let i = 0, len = arguments.length - 1; i < len; i++) {
            const object = arguments[i];
            addChildAt.call(this, object, arguments[len] + i);

            if (isConnectedToStage(stage, object)) {
                emitAddedEvent(stage, object);
            }
        }

        return arguments[arguments.length - 2];
    };

    createjs.Container.prototype.removeChild = function patchedRemoveChild<
        T extends createjs.DisplayObject
    >(...child: T[]): boolean {
        let removed: boolean = true;

        for (let i = 0, len = child.length; i < len; i++) {
            if (isConnectedToStage(stage, child[i])) {
                emitRemovedEvent(stage, child[i]);
            }

            removed = removed && removeChild.call(this, child[i]);
        }

        return removed;
    };

    createjs.Container.prototype.removeChildAt = function patchedRemoveChildAt(
        ...index: number[]
    ): boolean {
        let removed: boolean = true;

        for (let i = 0, len = arguments.length; i < len; i++) {
            const child: createjs.DisplayObject = this.getChildAt(arguments[i]);

            if (isConnectedToStage(stage, child)) {
                emitRemovedEvent(stage, child);
            }

            removed = removed && removeChildAt.call(this, arguments[i]);
        }

        return removed;
    };

    createjs.Container.prototype.removeAllChildren = function patchedRemoveAllChildren(): void {
        if (isConnectedToStage(stage, this) && this.children.length) {
            this.children.forEach((child: createjs.DisplayObject) => {
                emitRemovedEvent(stage, child);
            });
        }

        removeAllChildren.call(this);
    };
}
