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
/**
 * @author Jon Adams
 */
var NetStreamSignalSet = (function (_super) {
    __extends(NetStreamSignalSet, _super);
    function NetStreamSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(NetStreamSignalSet.prototype, "asyncError", {
        get: function () {
            return this.getNativeSignal(AsyncErrorEvent_1.AsyncErrorEvent.ASYNC_ERROR, AsyncErrorEvent_1.AsyncErrorEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetStreamSignalSet.prototype, "ioError", {
        get: function () {
            return this.getNativeSignal(IOErrorEvent_1.IOErrorEvent.IO_ERROR, IOErrorEvent_1.IOErrorEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetStreamSignalSet.prototype, "netStatus", {
        get: function () {
            return this.getNativeSignal(NetStatusEvent_1.NetStatusEvent.NET_STATUS, NetStatusEvent_1.NetStatusEvent);
        },
        enumerable: true,
        configurable: true
    });
    return NetStreamSignalSet;
}(EventDispatcherSignalSet_1.EventDispatcherSignalSet));
exports.NetStreamSignalSet = NetStreamSignalSet;
//# sourceMappingURL=NetStreamSignalSet.js.map