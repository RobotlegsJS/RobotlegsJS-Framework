"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var URLLoader_1 = require("../../../../../flash/net/URLLoader");
var URLLoaderSignalSet_1 = require("../sets/URLLoaderSignalSet");
var SignalURLLoader = (function (_super) {
    __extends(SignalURLLoader, _super);
    function SignalURLLoader() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SignalURLLoader.prototype, "signals", {
        get: function () {
            return this._signals || this.;
            new URLLoaderSignalSet_1.URLLoaderSignalSet(this);
        },
        enumerable: true,
        configurable: true
    });
    return SignalURLLoader;
}(URLLoader_1.URLLoader));
exports.SignalURLLoader = SignalURLLoader;
//# sourceMappingURL=SignalURLLoader.js.map