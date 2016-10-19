"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcherSignalSet_1 = require("./EventDispatcherSignalSet");
var Event_1 = require("../../../../../flash/events/Event");
var IOErrorEvent_1 = require("../../../../../flash/events/IOErrorEvent");
var ProgressEvent_1 = require("../../../../../flash/events/ProgressEvent");
/**
 * @author Jon Adams
 */
var SoundSignalSet = (function (_super) {
    __extends(SoundSignalSet, _super);
    function SoundSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(SoundSignalSet.prototype, "complete", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.COMPLETE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundSignalSet.prototype, "id3", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.ID3);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundSignalSet.prototype, "ioError", {
        get: function () {
            return this.getNativeSignal(IOErrorEvent_1.IOErrorEvent.IO_ERROR, IOErrorEvent_1.IOErrorEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundSignalSet.prototype, "open", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.OPEN);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundSignalSet.prototype, "progress", {
        get: function () {
            return this.getNativeSignal(ProgressEvent_1.ProgressEvent.PROGRESS, ProgressEvent_1.ProgressEvent);
        },
        enumerable: true,
        configurable: true
    });
    return SoundSignalSet;
}(EventDispatcherSignalSet_1.EventDispatcherSignalSet));
exports.SoundSignalSet = SoundSignalSet;
//# sourceMappingURL=SoundSignalSet.js.map