"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InteractiveObjectSignalSet_1 = require("./InteractiveObjectSignalSet");
var Event_1 = require("../../../../../flash/events/Event");
var TextEvent_1 = require("../../../../../flash/events/TextEvent");
/**
 * @author Jon Adams
 */
var TextFieldSignalSet = (function (_super) {
    __extends(TextFieldSignalSet, _super);
    function TextFieldSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(TextFieldSignalSet.prototype, "change", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.CHANGE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFieldSignalSet.prototype, "link", {
        get: function () {
            return this.getNativeSignal(TextEvent_1.TextEvent.LINK, TextEvent_1.TextEvent);
        },
        enumerable: true,
        configurable: true
    });
    return TextFieldSignalSet;
}(InteractiveObjectSignalSet_1.InteractiveObjectSignalSet));
exports.TextFieldSignalSet = TextFieldSignalSet;
//# sourceMappingURL=TextFieldSignalSet.js.map