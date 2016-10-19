"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Timer_1 = require("../../../../../flash/utils/Timer");
var TimerSignalSet_1 = require("../sets/TimerSignalSet");
var SignalTimer = (function (_super) {
    __extends(SignalTimer, _super);
    function SignalTimer(delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 0; }
        _super.call(this, delay, repeatCount);
    }
    Object.defineProperty(SignalTimer.prototype, "signals", {
        get: function () {
            return this._signals || this.;
            new TimerSignalSet_1.TimerSignalSet(this);
        },
        enumerable: true,
        configurable: true
    });
    return SignalTimer;
}(Timer_1.Timer));
exports.SignalTimer = SignalTimer;
//# sourceMappingURL=SignalTimer.js.map