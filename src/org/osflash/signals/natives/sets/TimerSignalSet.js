"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcherSignalSet_1 = require("./EventDispatcherSignalSet");
var TimerEvent_1 = require("../../../../../flash/events/TimerEvent");
/**
 * @author Jon Adams
 */
var TimerSignalSet = (function (_super) {
    __extends(TimerSignalSet, _super);
    function TimerSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(TimerSignalSet.prototype, "timer", {
        get: function () {
            return this.getNativeSignal(TimerEvent_1.TimerEvent.TIMER, TimerEvent_1.TimerEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimerSignalSet.prototype, "timerComplete", {
        get: function () {
            return this.getNativeSignal(TimerEvent_1.TimerEvent.TIMER_COMPLETE, TimerEvent_1.TimerEvent);
        },
        enumerable: true,
        configurable: true
    });
    return TimerSignalSet;
}(EventDispatcherSignalSet_1.EventDispatcherSignalSet));
exports.TimerSignalSet = TimerSignalSet;
//# sourceMappingURL=TimerSignalSet.js.map