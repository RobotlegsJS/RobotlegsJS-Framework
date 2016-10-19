"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcherSignalSet_1 = require("./EventDispatcherSignalSet");
var ActivityEvent_1 = require("../../../../../flash/events/ActivityEvent");
var StatusEvent_1 = require("../../../../../flash/events/StatusEvent");
/**
 * @author Jon Adams
 */
var MicrophoneSignalSet = (function (_super) {
    __extends(MicrophoneSignalSet, _super);
    function MicrophoneSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(MicrophoneSignalSet.prototype, "activity", {
        get: function () {
            return this.getNativeSignal(ActivityEvent_1.ActivityEvent.ACTIVITY, ActivityEvent_1.ActivityEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MicrophoneSignalSet.prototype, "status", {
        get: function () {
            return this.getNativeSignal(StatusEvent_1.StatusEvent.STATUS, StatusEvent_1.StatusEvent);
        },
        enumerable: true,
        configurable: true
    });
    return MicrophoneSignalSet;
}(EventDispatcherSignalSet_1.EventDispatcherSignalSet));
exports.MicrophoneSignalSet = MicrophoneSignalSet;
//# sourceMappingURL=MicrophoneSignalSet.js.map