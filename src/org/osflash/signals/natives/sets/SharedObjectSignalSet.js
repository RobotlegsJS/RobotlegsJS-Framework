"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcherSignalSet_1 = require("./EventDispatcherSignalSet");
var AsyncErrorEvent_1 = require("../../../../../flash/events/AsyncErrorEvent");
var NetStatusEvent_1 = require("../../../../../flash/events/NetStatusEvent");
var SyncEvent_1 = require("../../../../../flash/events/SyncEvent");
/**
 * @author Jon Adams
 */
var SharedObjectSignalSet = (function (_super) {
    __extends(SharedObjectSignalSet, _super);
    function SharedObjectSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(SharedObjectSignalSet.prototype, "asyncError", {
        get: function () {
            return this.getNativeSignal(AsyncErrorEvent_1.AsyncErrorEvent.ASYNC_ERROR, AsyncErrorEvent_1.AsyncErrorEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedObjectSignalSet.prototype, "netStatus", {
        get: function () {
            return this.getNativeSignal(NetStatusEvent_1.NetStatusEvent.NET_STATUS, NetStatusEvent_1.NetStatusEvent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedObjectSignalSet.prototype, "sync", {
        get: function () {
            return this.getNativeSignal(SyncEvent_1.SyncEvent.SYNC, SyncEvent_1.SyncEvent);
        },
        enumerable: true,
        configurable: true
    });
    return SharedObjectSignalSet;
}(EventDispatcherSignalSet_1.EventDispatcherSignalSet));
exports.SharedObjectSignalSet = SharedObjectSignalSet;
//# sourceMappingURL=SharedObjectSignalSet.js.map