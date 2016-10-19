"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InteractiveObjectSignalSet_1 = require("./InteractiveObjectSignalSet");
var Event_1 = require("../../../../../flash/events/Event");
/**
 * @author Jon Adams
 */
var StageSignalSet = (function (_super) {
    __extends(StageSignalSet, _super);
    function StageSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(StageSignalSet.prototype, "fullScreen", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.FULLSCREEN);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageSignalSet.prototype, "mouseLeave", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.MOUSE_LEAVE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageSignalSet.prototype, "resize", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.RESIZE);
        },
        enumerable: true,
        configurable: true
    });
    return StageSignalSet;
}(InteractiveObjectSignalSet_1.InteractiveObjectSignalSet));
exports.StageSignalSet = StageSignalSet;
//# sourceMappingURL=StageSignalSet.js.map