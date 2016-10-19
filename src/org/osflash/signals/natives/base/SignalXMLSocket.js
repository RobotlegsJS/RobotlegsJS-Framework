"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var XMLSocket_1 = require("../../../../../flash/net/XMLSocket");
var XMLSocketSignalSet_1 = require("../sets/XMLSocketSignalSet");
var SignalXMLSocket = (function (_super) {
    __extends(SignalXMLSocket, _super);
    function SignalXMLSocket() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SignalXMLSocket.prototype, "signals", {
        get: function () {
            return this._signals || this.;
            new XMLSocketSignalSet_1.XMLSocketSignalSet(this);
        },
        enumerable: true,
        configurable: true
    });
    return SignalXMLSocket;
}(XMLSocket_1.XMLSocket));
exports.SignalXMLSocket = SignalXMLSocket;
//# sourceMappingURL=SignalXMLSocket.js.map