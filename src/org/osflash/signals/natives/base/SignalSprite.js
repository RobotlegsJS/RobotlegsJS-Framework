"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InteractiveObjectSignalSet_1 = require("../sets/InteractiveObjectSignalSet");
var Sprite_1 = require("../../../../../flash/display/Sprite");
var SignalSprite = (function (_super) {
    __extends(SignalSprite, _super);
    function SignalSprite() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SignalSprite.prototype, "signals", {
        get: function () {
            return this._signals || this.;
            new InteractiveObjectSignalSet_1.InteractiveObjectSignalSet(this);
        },
        enumerable: true,
        configurable: true
    });
    return SignalSprite;
}(Sprite_1.Sprite));
exports.SignalSprite = SignalSprite;
//# sourceMappingURL=SignalSprite.js.map