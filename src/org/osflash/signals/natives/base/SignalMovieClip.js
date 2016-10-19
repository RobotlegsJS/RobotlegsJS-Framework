"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InteractiveObjectSignalSet_1 = require("../sets/InteractiveObjectSignalSet");
var MovieClip_1 = require("../../../../../flash/display/MovieClip");
var SignalMovieClip = (function (_super) {
    __extends(SignalMovieClip, _super);
    function SignalMovieClip() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SignalMovieClip.prototype, "signals", {
        get: function () {
            return this._signals || this.;
            new InteractiveObjectSignalSet_1.InteractiveObjectSignalSet(this);
        },
        enumerable: true,
        configurable: true
    });
    return SignalMovieClip;
}(MovieClip_1.MovieClip));
exports.SignalMovieClip = SignalMovieClip;
//# sourceMappingURL=SignalMovieClip.js.map