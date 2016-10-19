"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NativeSignalSet_1 = require("./NativeSignalSet");
{
    /**
     * @author Jon Adams
     */
    var EventDispatcherSignalSet = (function (_super) {
        __extends(EventDispatcherSignalSet, _super);
        function EventDispatcherSignalSet(target) {
            _super.call(this, target);
        }
        Object.defineProperty(EventDispatcherSignalSet.prototype, "activate", {
            get: function () {
                return this.getNativeSignal(Event_1.Event.ACTIVATE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDispatcherSignalSet.prototype, "deactivate", {
            get: function () {
                return this.getNativeSignal(Event_1.Event.DEACTIVATE);
            },
            enumerable: true,
            configurable: true
        });
        return EventDispatcherSignalSet;
    }(NativeSignalSet_1.NativeSignalSet));
    exports.EventDispatcherSignalSet = EventDispatcherSignalSet;
}
//# sourceMappingURL=EventDispatcherSignalSet.js.map