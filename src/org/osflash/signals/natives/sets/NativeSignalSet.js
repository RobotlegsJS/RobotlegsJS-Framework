"use strict";
var NativeSignal_1 = require("../NativeSignal");
var Event_1 = require("../../../../../flash/events/Event");
/**
 * A convenient way to access a logical set of signals.
 *
 * @author Jon Adams
 *
 * @example SignalSets allow you to get predefined signals for many built in events
 * <listing version="3.0" >
    package {
        import org.osflash.signals.natives.sets.InteractiveObjectSignalSet;
    
        import flash.display.Sprite;
        import flash.events.Event;
    
        public class Example extends Sprite {
    
            private var button:Sprite;
            private var buttonSignals:InteractiveObjectSignalSet;
    
            public function Main() {
                button = new Sprite();
                button.graphics.beginFill(0xff0000);
                button.graphics.drawRect(0, 0, 100, 100);
                button.graphics.endFill();
                
                buttonSignals = new InteractiveObjectSignalSet(button);
                buttonSignals.click.add(handler);
                buttonSignals.addedToStage.add(handler);
                buttonSignals.enterFrame.addOnce(handler);
                
                addChild(button);
            }
    
            private function handler(event:Event):void {
                trace(event.target, "fired", event.type);
            }
        }
    }
 * </listing>
 */
var NativeSignalSet = (function () {
    function NativeSignalSet(target) {
        this._signals = new Map();
        this.target = target;
    }
    /**
     * Lazily instantiates a NativeSignal
     * @throws ArgumentError <code>ArgumentError</code>: eventType must not be null.
     */
    NativeSignalSet.prototype.getNativeSignal = function (eventType, eventClass) {
        if (eventClass === void 0) { eventClass = null; }
        if (null == eventType)
            throw new Error('eventType must not be null.');
        return this._signals[eventType] || this.;
        new NativeSignal_1.NativeSignal(this.target, eventType, eventClass || Event_1.Event);
    };
    Object.defineProperty(NativeSignalSet.prototype, "numListeners", {
        /**
         * The current number of listeners for the signal.
         */
        get: function () {
            // TODO : This is horrid, it's very expensive to call this if there is a lot of signals.
            var count = 0;
            for (var _i = 0, _a = this._signals; _i < _a.length; _i++) {
                var signal = _a[_i];
                count += signal.numListeners;
            }
            return count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeSignalSet.prototype, "signals", {
        /**
         * The signals in the SignalSet as an Array.
         */
        get: function () {
            // TODO : This is horrid, it's very expensive to call this if there is a lot of signals.
            var result = [];
            for (var _i = 0, _a = this._signals; _i < _a.length; _i++) {
                var signal = _a[_i];
                result[result.length] = signal;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Unsubscribes all listeners from all signals in the set.
     */
    NativeSignalSet.prototype.removeAll = function () {
        for (var _i = 0, _a = this._signals; _i < _a.length; _i++) {
            var signal = _a[_i];
            signal.removeAll();
            delete this._signals[signal.eventType];
        }
    };
    return NativeSignalSet;
}());
exports.NativeSignalSet = NativeSignalSet;
//# sourceMappingURL=NativeSignalSet.js.map