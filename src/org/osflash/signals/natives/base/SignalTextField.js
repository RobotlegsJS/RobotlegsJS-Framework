"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextField_1 = require("../../../../../flash/text/TextField");
var TextFieldSignalSet_1 = require("../sets/TextFieldSignalSet");
var SignalTextField = (function (_super) {
    __extends(SignalTextField, _super);
    function SignalTextField() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SignalTextField.prototype, "signals", {
        get: function () {
            return this._signals || this.;
            new TextFieldSignalSet_1.TextFieldSignalSet(this);
        },
        enumerable: true,
        configurable: true
    });
    return SignalTextField;
}(TextField_1.TextField));
exports.SignalTextField = SignalTextField;
//# sourceMappingURL=SignalTextField.js.map