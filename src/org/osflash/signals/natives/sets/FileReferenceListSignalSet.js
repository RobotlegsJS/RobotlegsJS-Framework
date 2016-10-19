"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcherSignalSet_1 = require("./EventDispatcherSignalSet");
var Event_1 = require("../../../../../flash/events/Event");
/**
 * @author Jon Adams
 */
var FileReferenceListSignalSet = (function (_super) {
    __extends(FileReferenceListSignalSet, _super);
    function FileReferenceListSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(FileReferenceListSignalSet.prototype, "cancel", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.CANCEL);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileReferenceListSignalSet.prototype, "select", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.SELECT);
        },
        enumerable: true,
        configurable: true
    });
    return FileReferenceListSignalSet;
}(EventDispatcherSignalSet_1.EventDispatcherSignalSet));
exports.FileReferenceListSignalSet = FileReferenceListSignalSet;
//# sourceMappingURL=FileReferenceListSignalSet.js.map