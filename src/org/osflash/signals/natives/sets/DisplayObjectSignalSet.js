"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcherSignalSet_1 = require("./EventDispatcherSignalSet");
{
    /**
     * @author Jon Adams
     */
    var DisplayObjectSignalSet = (function (_super) {
        __extends(DisplayObjectSignalSet, _super);
        function DisplayObjectSignalSet(target) {
            _super.call(this, target);
        }
        Object.defineProperty(DisplayObjectSignalSet.prototype, "added", {
            get: function () {
                return this.getNativeSignal(Event_1.Event.ADDED);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObjectSignalSet.prototype, "addedToStage", {
            get: function () {
                return this.getNativeSignal(Event_1.Event.ADDED_TO_STAGE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObjectSignalSet.prototype, "enterFrame", {
            get: function () {
                return this.getNativeSignal(Event_1.Event.ENTER_FRAME);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObjectSignalSet.prototype, "exitFrame", {
            get: function () {
                // Using a string here because we need to target FP9
                return this.getNativeSignal("exitFrame");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObjectSignalSet.prototype, "frameConstructed", {
            get: function () {
                // Using a string here because we need to target FP9
                return this.getNativeSignal("frameConstructed");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObjectSignalSet.prototype, "removed", {
            get: function () {
                return this.getNativeSignal(Event_1.Event.REMOVED);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObjectSignalSet.prototype, "removedFromStage", {
            get: function () {
                return this.getNativeSignal(Event_1.Event.REMOVED_FROM_STAGE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObjectSignalSet.prototype, "render", {
            get: function () {
                return this.getNativeSignal(Event_1.Event.RENDER);
            },
            enumerable: true,
            configurable: true
        });
        return DisplayObjectSignalSet;
    }(EventDispatcherSignalSet_1.EventDispatcherSignalSet));
    exports.DisplayObjectSignalSet = DisplayObjectSignalSet;
}
//# sourceMappingURL=DisplayObjectSignalSet.js.map