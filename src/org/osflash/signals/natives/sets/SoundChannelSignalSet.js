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
var SoundChannelSignalSet = (function (_super) {
    __extends(SoundChannelSignalSet, _super);
    function SoundChannelSignalSet(target) {
        _super.call(this, target);
    }
    Object.defineProperty(SoundChannelSignalSet.prototype, "soundComplete", {
        get: function () {
            return this.getNativeSignal(Event_1.Event.SOUND_COMPLETE);
        },
        enumerable: true,
        configurable: true
    });
    return SoundChannelSignalSet;
}(EventDispatcherSignalSet_1.EventDispatcherSignalSet));
exports.SoundChannelSignalSet = SoundChannelSignalSet;
//# sourceMappingURL=SoundChannelSignalSet.js.map