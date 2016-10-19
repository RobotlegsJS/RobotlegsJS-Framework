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
var SecurityErrorEvent_1 = require("../../../../../flash/events/SecurityErrorEvent");
/**
 * @author Jon Adams
 */
var SocketSignalSet = (function (_super) {
    __extends(SocketSignalSet, _super);
    function SocketSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(SocketSignalSet.prototype, "close", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.CLOSE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketSignalSet.prototype, "connect", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.CONNECT);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketSignalSet.prototype, "ioError", {
        get: function () {
            return this.getNativeSignal(IOErrorEvent_1.IOErrorEvent.IO_ERROR, IOErrorEvent_1.IOErrorEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketSignalSet.prototype, "securityError", {
        get: function () {
            return this.getNativeSignal(SecurityErrorEvent_1.SecurityErrorEvent.SECURITY_ERROR, SecurityErrorEvent_1.SecurityErrorEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketSignalSet.prototype, "socketData", {
        get: function () {
            return this.getNativeSignal(ProgressEvent_1.ProgressEvent.SOCKET_DATA, ProgressEvent_1.ProgressEvent);
        },
        enumerable: true,
        configurable: true
    });
    return SocketSignalSet;
}(EventDispatcherSignalSet_1.EventDispatcherSignalSet));
exports.SocketSignalSet = SocketSignalSet;
//# sourceMappingURL=SocketSignalSet.js.map