"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcherSignalSet_1 = require("./EventDispatcherSignalSet");
var AsyncErrorEvent_1 = require("../../../../../flash/events/AsyncErrorEvent");
var IOErrorEvent_1 = require("../../../../../flash/events/IOErrorEvent");
var NetStatusEvent_1 = require("../../../../../flash/events/NetStatusEvent");
var SecurityErrorEvent_1 = require("../../../../../flash/events/SecurityErrorEvent");
/**
 * @author Jon Adams
 */
var NetConnectionSignalSet = (function (_super) {
    __extends(NetConnectionSignalSet, _super);
    function NetConnectionSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(NetConnectionSignalSet.prototype, "asyncError", {
        get: function () {
            return this.getNativeSignal(AsyncErrorEvent_1.AsyncErrorEvent.ASYNC_ERROR, AsyncErrorEvent_1.AsyncErrorEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetConnectionSignalSet.prototype, "ioError", {
        get: function () {
            return this.getNativeSignal(IOErrorEvent_1.IOErrorEvent.IO_ERROR, IOErrorEvent_1.IOErrorEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetConnectionSignalSet.prototype, "netStatus", {
        get: function () {
            return this.getNativeSignal(NetStatusEvent_1.NetStatusEvent.NET_STATUS, NetStatusEvent_1.NetStatusEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetConnectionSignalSet.prototype, "securityError", {
        get: function () {
            return this.getNativeSignal(SecurityErrorEvent_1.SecurityErrorEvent.SECURITY_ERROR, SecurityErrorEvent_1.SecurityErrorEvent);
        },
        enumerable: true,
        configurable: true
    });
    return NetConnectionSignalSet;
}(EventDispatcherSignalSet_1.EventDispatcherSignalSet));
exports.NetConnectionSignalSet = NetConnectionSignalSet;
//# sourceMappingURL=NetConnectionSignalSet.js.map