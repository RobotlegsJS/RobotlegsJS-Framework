"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcherSignalSet_1 = require("./EventDispatcherSignalSet");
var Event_1 = require("../../../../../flash/events/Event");
var HTTPStatusEvent_1 = require("../../../../../flash/events/HTTPStatusEvent");
var IOErrorEvent_1 = require("../../../../../flash/events/IOErrorEvent");
var ProgressEvent_1 = require("../../../../../flash/events/ProgressEvent");
/**
 * @author Jon Adams
 */
var LoaderInfoSignalSet = (function (_super) {
    __extends(LoaderInfoSignalSet, _super);
    function LoaderInfoSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(LoaderInfoSignalSet.prototype, "complete", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.COMPLETE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfoSignalSet.prototype, "httpStatus", {
        get: function () {
            return this.getNativeSignal(HTTPStatusEvent_1.HTTPStatusEvent.HTTP_STATUS, HTTPStatusEvent_1.HTTPStatusEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfoSignalSet.prototype, "init", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.INIT);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfoSignalSet.prototype, "ioError", {
        get: function () {
            return this.getNativeSignal(IOErrorEvent_1.IOErrorEvent.IO_ERROR, IOErrorEvent_1.IOErrorEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfoSignalSet.prototype, "open", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.OPEN);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfoSignalSet.prototype, "progress", {
        get: function () {
            return this.getNativeSignal(ProgressEvent_1.ProgressEvent.PROGRESS, ProgressEvent_1.ProgressEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfoSignalSet.prototype, "unload", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.UNLOAD);
        },
        enumerable: true,
        configurable: true
    });
    return LoaderInfoSignalSet;
}(EventDispatcherSignalSet_1.EventDispatcherSignalSet));
exports.LoaderInfoSignalSet = LoaderInfoSignalSet;
//# sourceMappingURL=LoaderInfoSignalSet.js.map