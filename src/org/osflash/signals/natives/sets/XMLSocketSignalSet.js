"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcherSignalSet_1 = require("./EventDispatcherSignalSet");
var DataEvent_1 = require("../../../../../flash/events/DataEvent");
var Event_1 = require("../../../../../flash/events/Event");
var IOErrorEvent_1 = require("../../../../../flash/events/IOErrorEvent");
var SecurityErrorEvent_1 = require("../../../../../flash/events/SecurityErrorEvent");
/**
 * @author Jon Adams
 */
var XMLSocketSignalSet = (function (_super) {
    __extends(XMLSocketSignalSet, _super);
    function XMLSocketSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(XMLSocketSignalSet.prototype, "close", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.CLOSE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLSocketSignalSet.prototype, "connect", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.CONNECT);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLSocketSignalSet.prototype, "data", {
        get: function () {
            return this.getNativeSignal(DataEvent_1.DataEvent.DATA, DataEvent_1.DataEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLSocketSignalSet.prototype, "ioError", {
        get: function () {
            return this.getNativeSignal(IOErrorEvent_1.IOErrorEvent.IO_ERROR, IOErrorEvent_1.IOErrorEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XMLSocketSignalSet.prototype, "securityError", {
        get: function () {
            return this.getNativeSignal(SecurityErrorEvent_1.SecurityErrorEvent.SECURITY_ERROR, SecurityErrorEvent_1.SecurityErrorEvent);
        },
        enumerable: true,
        configurable: true
    });
    return XMLSocketSignalSet;
}(EventDispatcherSignalSet_1.EventDispatcherSignalSet));
exports.XMLSocketSignalSet = XMLSocketSignalSet;
//# sourceMappingURL=XMLSocketSignalSet.js.map