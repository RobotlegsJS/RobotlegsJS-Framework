"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectSignalSet_1 = require("../sets/DisplayObjectSignalSet");
var Bitmap_1 = require("../../../../../flash/display/Bitmap");
/**
 * @author Simon Richardson - me@simonrichardson.info
 */
var SignalBitmap = (function (_super) {
    __extends(SignalBitmap, _super);
    function SignalBitmap() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SignalBitmap.prototype, "signals", {
        get: function () {
            return this._signals || this.;
            new DisplayObjectSignalSet_1.DisplayObjectSignalSet(this);
        },
        enumerable: true,
        configurable: true
    });
    return SignalBitmap;
}(Bitmap_1.Bitmap));
exports.SignalBitmap = SignalBitmap;
//# sourceMappingURL=SignalBitmap.js.map