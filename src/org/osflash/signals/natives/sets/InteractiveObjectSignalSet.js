"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectSignalSet_1 = require("./DisplayObjectSignalSet");
{
    /**
     * @author Jon Adams
     */
    var InteractiveObjectSignalSet = (function (_super) {
        __extends(InteractiveObjectSignalSet, _super);
        function InteractiveObjectSignalSet(target) {
            _super.call(this, target);
        }
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "click", {
            get: function () {
                return this.getNativeSignal(MouseEvent_1.MouseEvent.CLICK, MouseEvent_1.MouseEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "doubleClick", {
            get: function () {
                return this.getNativeSignal(MouseEvent_1.MouseEvent.DOUBLE_CLICK, MouseEvent_1.MouseEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "focusIn", {
            get: function () {
                return this.getNativeSignal(FocusEvent_1.FocusEvent.FOCUS_IN, FocusEvent_1.FocusEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "focusOut", {
            get: function () {
                return this.getNativeSignal(FocusEvent_1.FocusEvent.FOCUS_OUT, FocusEvent_1.FocusEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "keyDown", {
            get: function () {
                return this.getNativeSignal(KeyboardEvent_1.KeyboardEvent.KEY_DOWN, KeyboardEvent_1.KeyboardEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "keyFocusChange", {
            get: function () {
                return this.getNativeSignal(FocusEvent_1.FocusEvent.KEY_FOCUS_CHANGE, FocusEvent_1.FocusEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "keyUp", {
            get: function () {
                return this.getNativeSignal(KeyboardEvent_1.KeyboardEvent.KEY_UP, KeyboardEvent_1.KeyboardEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "mouseDown", {
            get: function () {
                return this.getNativeSignal(MouseEvent_1.MouseEvent.MOUSE_DOWN, MouseEvent_1.MouseEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "mouseFocusChange", {
            get: function () {
                return this.getNativeSignal(FocusEvent_1.FocusEvent.MOUSE_FOCUS_CHANGE, FocusEvent_1.FocusEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "mouseMove", {
            get: function () {
                return this.getNativeSignal(MouseEvent_1.MouseEvent.MOUSE_MOVE, MouseEvent_1.MouseEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "mouseOut", {
            get: function () {
                return this.getNativeSignal(MouseEvent_1.MouseEvent.MOUSE_OUT, MouseEvent_1.MouseEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "mouseOver", {
            get: function () {
                return this.getNativeSignal(MouseEvent_1.MouseEvent.MOUSE_OVER, MouseEvent_1.MouseEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "mouseUp", {
            get: function () {
                return this.getNativeSignal(MouseEvent_1.MouseEvent.MOUSE_UP, MouseEvent_1.MouseEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "mouseWheel", {
            get: function () {
                return this.getNativeSignal(MouseEvent_1.MouseEvent.MOUSE_WHEEL, MouseEvent_1.MouseEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "rollOut", {
            get: function () {
                return this.getNativeSignal(MouseEvent_1.MouseEvent.ROLL_OUT, MouseEvent_1.MouseEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "rollOver", {
            get: function () {
                return this.getNativeSignal(MouseEvent_1.MouseEvent.ROLL_OVER, MouseEvent_1.MouseEvent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "tabChildrenChange", {
            get: function () {
                return this.getNativeSignal(Event_1.Event.TAB_CHILDREN_CHANGE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "tabEnabledChange", {
            get: function () {
                return this.getNativeSignal(Event_1.Event.TAB_ENABLED_CHANGE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "tabIndexChange", {
            get: function () {
                return this.getNativeSignal(Event_1.Event.TAB_INDEX_CHANGE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InteractiveObjectSignalSet.prototype, "textInput", {
            get: function () {
                return this.getNativeSignal(TextEvent_1.TextEvent.TEXT_INPUT, TextEvent_1.TextEvent);
            },
            enumerable: true,
            configurable: true
        });
        return InteractiveObjectSignalSet;
    }(DisplayObjectSignalSet_1.DisplayObjectSignalSet));
    exports.InteractiveObjectSignalSet = InteractiveObjectSignalSet;
}
//# sourceMappingURL=InteractiveObjectSignalSet.js.map