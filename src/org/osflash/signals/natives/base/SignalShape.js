"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectSignalSet_1 = require("../sets/DisplayObjectSignalSet");
var Shape_1 = require("../../../../../flash/display/Shape");
/**
 * @author Simon Richardson - me@simonrichardson.info
 */
var SignalShape = (function (_super) {
    __extends(SignalShape, _super);
    function SignalShape() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SignalShape.prototype, "signals", {
        get: function () {
            return this._signals || this.;
            new DisplayObjectSignalSet_1.DisplayObjectSignalSet(this);
        },
        enumerable: true,
        configurable: true
    });
    return SignalShape;
}(Shape_1.Shape));
exports.SignalShape = SignalShape;
//# sourceMappingURL=SignalShape.js.map