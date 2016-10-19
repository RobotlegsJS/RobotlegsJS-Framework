"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Signal_1 = require("../Signal");
var Slot_1 = require("../Slot");
var Event_1 = require("../../../../flash/events/Event");
/**
 * The NativeRelaySignal class is used to relay events from an IEventDispatcher
 * to listeners.
 * The difference as compared to NativeSignal is that
 * NativeRelaySignal has its own dispatching code,
 * whereas NativeSignal uses the IEventDispatcher to dispatch.
 */
var NativeRelaySignal = (function (_super) {
    __extends(NativeRelaySignal, _super);
    /**
     * Creates a new NativeRelaySignal instance to relay events from an IEventDispatcher.
     * @param	target	An object that implements the flash.events.IEventDispatcher interface.
     * @param	eventType	The event string name that would normally be passed to IEventDispatcher.addEventListener().
     * @param	eventClass An optional class reference that enables an event type check in dispatch().
     * Because the target is an IEventDispatcher,
     * eventClass needs to be flash.events.Event or a subclass of it.
     */
    function NativeRelaySignal(target, eventType, eventClass) {
        if (eventClass === void 0) { eventClass = null; }
        _super.call(this, eventClass || Event_1.Event);
        this.eventType = eventType;
        this.eventClass = eventClass;
        this.target = target;
    }
    Object.defineProperty(NativeRelaySignal.prototype, "target", {
        /** @inheritDoc */
        get: function () {
            return this._target;
        },
        set: function (value) {
            if (value == this._target)
                return;
            if (this._target)
                this.removeAll();
            this._target = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeRelaySignal.prototype, "eventType", {
        /** @inheritDoc */
        get: function () { return this._eventType; },
        set: function (value) { this._eventType = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeRelaySignal.prototype, "eventClass", {
        /** @inheritDoc */
        get: function () { return this._eventClass; },
        set: function (value) {
            this._eventClass = value || Event_1.Event;
            this._valueClasses = [this._eventClass];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeRelaySignal.prototype, "valueClasses", {
        /*override*/ set: function (value) {
            this.eventClass = (value && value.length > 0) ? value[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
     */
    /*override*/ NativeRelaySignal.prototype.add = function (listener) {
        return this.addWithPriority(listener);
    };
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
     */
    /*override*/ NativeRelaySignal.prototype.addOnce = function (listener) {
        return this.addOnceWithPriority(listener);
    };
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
     */
    NativeRelaySignal.prototype.addWithPriority = function (listener, priority) {
        if (priority === void 0) { priority = 0; }
        return this.registerListenerWithPriority(listener, false, priority);
    };
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
     */
    NativeRelaySignal.prototype.addOnceWithPriority = function (listener, priority) {
        if (priority === void 0) { priority = 0; }
        return this.registerListenerWithPriority(listener, true, priority);
    };
    /** @inheritDoc */
    /*override*/ NativeRelaySignal.prototype.remove = function (listener) {
        var nonEmptyBefore = this.slots.nonEmpty;
        var slot = _super.prototype.remove.call(this, listener);
        if (nonEmptyBefore != this.slots.nonEmpty)
            this.target.removeEventListener(this.eventType, this.onNativeEvent);
        return slot;
    };
    /**
     * @inheritDoc
     */
    /*override*/ NativeRelaySignal.prototype.removeAll = function () {
        if (this.target)
            this.target.removeEventListener(this.eventType, this.onNativeEvent);
        _super.prototype.removeAll.call(this);
    };
    /**
     * @inheritDoc
     * @throws ArgumentError <code>ArgumentError</code>: Event object expected.
     * @throws ArgumentError <code>ArgumentError</code>: No more than one Event object expected.
     * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Event object cannot be <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Event object [event] is not an instance of [eventClass].
     * @throws ArgumentError <code>ArgumentError</code>: Event object has incorrect type. Expected [eventType] but was [event.type].
     */
    /*override*/ NativeRelaySignal.prototype.dispatch = function () {
        var valueObjects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            valueObjects[_i - 0] = arguments[_i];
        }
        if (null == valueObjects)
            throw new Error('Event object expected.');
        if (valueObjects.length != 1)
            throw new Error('No more than one Event object expected.');
        this.dispatchEvent(valueObjects[0]);
    };
    /**
     * Unlike other signals, NativeRelaySignal does not dispatch null
     * because it causes an exception in EventDispatcher.
     * @inheritDoc
     * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Event object cannot be <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Event object [event] is not an instance of [eventClass].
     * @throws ArgumentError <code>ArgumentError</code>: Event object has incorrect type. Expected [eventType] but was [event.type].
     */
    NativeRelaySignal.prototype.dispatchEvent = function (event) {
        if (!this.target)
            throw new Error('Target object cannot be null.');
        if (!event)
            throw new Error('Event object cannot be null.');
        if (!(event instanceof this.eventClass))
            throw new Error('Event object ' + event + ' is not an instance of ' + this.eventClass + '.');
        if (event.type != this.eventType)
            throw new Error('Event object has incorrect type. Expected <' + this.eventType + '> but was <' + event.type + '>.');
        return this.target.dispatchEvent(event);
    };
    NativeRelaySignal.prototype.onNativeEvent = function (event) {
        var slotsToProcess = this.slots;
        while (slotsToProcess.nonEmpty) {
            slotsToProcess.head.execute1(event);
            slotsToProcess = slotsToProcess.tail;
        }
    };
    NativeRelaySignal.prototype.registerListenerWithPriority = function (listener, once, priority) {
        if (once === void 0) { once = false; }
        if (priority === void 0) { priority = 0; }
        if (!this.target)
            throw new Error('Target object cannot be null.');
        var nonEmptyBefore = this.slots.nonEmpty;
        var slot = null;
        if (this.registrationPossible(listener, once)) {
            slot = new Slot_1.Slot(listener, this, once, priority);
            this.slots = this.slots.insertWithPriority(slot);
        }
        else
            slot = this.slots.find(listener);
        // Account for cases where the same listener is added twice.
        if (nonEmptyBefore != this.slots.nonEmpty)
            this.target.addEventListener(this.eventType, this.onNativeEvent, false, priority);
        return slot;
    };
    return NativeRelaySignal;
}(Signal_1.Signal));
exports.NativeRelaySignal = NativeRelaySignal;
//# sourceMappingURL=NativeRelaySignal.js.map