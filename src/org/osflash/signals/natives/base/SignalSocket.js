"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Socket_1 = require("../../../../../flash/net/Socket");
var SocketSignalSet_1 = require("../sets/SocketSignalSet");
var SignalSocket = (function (_super) {
    __extends(SignalSocket, _super);
    function SignalSocket() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SignalSocket.prototype, "signals", {
        get: function () {
            return this._signals || this.;
            new SocketSignalSet_1.SocketSignalSet(this);
        },
        enumerable: true,
        configurable: true
    });
    return SignalSocket;
}(Socket_1.Socket));
exports.SignalSocket = SignalSocket;
//# sourceMappingURL=SignalSocket.js.map