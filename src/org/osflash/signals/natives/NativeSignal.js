"use strict";
var Slot_1 = require("../Slot");
var SlotList_1 = require("../SlotList");
var IllegalOperationError_1 = require("../../../../flash/errors/IllegalOperationError");
var Event_1 = require("../../../../flash/events/Event");
/**
 * Allows the eventClass to be set in MXML, e.g.
 * <natives:NativeSignal id="clicked" eventType="click" target="{this}">{MouseEvent}</natives:NativeSignal>
 */
/*[DefaultProperty("eventClass")]*/
/**
 * The NativeSignal class provides a strongly-typed facade for an IEventDispatcher.
 * A NativeSignal is essentially a mini-dispatcher locked to a specific event type and class.
 * It can become part of an interface.
 */
var NativeSignal = (function () {
    /**
     * Creates a NativeSignal instance to dispatch events on behalf of a target object.
     * @param	target The object on whose behalf the signal is dispatching events.
     * @param	eventType The type of Event permitted to be dispatched from this signal. Corresponds to Event.type.
     * @param	eventClass An optional class reference that enables an event type check in dispatch(). Defaults to flash.events.Event if omitted.
     */
    function NativeSignal(target, eventType, eventClass) {
        if (target === void 0) { target = null; }
        if (eventType === void 0) { eventType = ""; }
        if (eventClass === void 0) { eventClass = null; }
        this.slots = SlotList_1.SlotList.NIL;
        this.target = target;
        this.eventType = eventType;
        this.eventClass = eventClass;
    }
    Object.defineProperty(NativeSignal.prototype, "eventType", {
        /** @inheritDoc */
        get: function () { return this._eventType; },
        set: function (value) { this._eventType = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeSignal.prototype, "eventClass", {
        /** @inheritDoc */
        get: function () { return this._eventClass; },
        set: function (value) {
            this._eventClass = value || Event_1.Event;
            this._valueClasses = [this._eventClass];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeSignal.prototype, "valueClasses", {
        /** @inheritDoc */
        /*[ArrayElementType("Class")]*/
        get: function () { return this._valueClasses; },
        set: function (value) {
            this.eventClass = value && value.length > 0 ? value[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeSignal.prototype, "numListeners", {
        /** @inheritDoc */
        get: function () { return this.slots.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeSignal.prototype, "target", {
        /** @inheritDoc */
        get: function () { return this._target; },
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
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
     */
    NativeSignal.prototype.add = function (listener) {
        return this.addWithPriority(listener);
    };
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
     */
    NativeSignal.prototype.addWithPriority = function (listener, priority) {
        if (priority === void 0) { priority = 0; }
        return this.registerListenerWithPriority(listener, false, priority);
    };
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
     */
    NativeSignal.prototype.addOnce = function (listener) {
        return this.addOnceWithPriority(listener);
    };
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
     */
    NativeSignal.prototype.addOnceWithPriority = function (listener, priority) {
        if (priority === void 0) { priority = 0; }
        return this.registerListenerWithPriority(listener, true, priority);
    };
    /** @inheritDoc */
    NativeSignal.prototype.remove = function (listener) {
        var slot = this.slots.find(listener);
        if (!slot)
            return null;
        this._target.removeEventListener(this._eventType, slot.execute1);
        this.slots = this.slots.filterNot(listener);
        return slot;
    };
    /** @inheritDoc */
    NativeSignal.prototype.removeAll = function () {
        var slotsToProcess = this.slots;
        while (slotsToProcess.nonEmpty) {
            this.target.removeEventListener(this._eventType, slotsToProcess.head.execute1);
            slotsToProcess = slotsToProcess.tail;
        }
        this.slots = SlotList_1.SlotList.NIL;
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
    NativeSignal.prototype.dispatch = function () {
        var valueObjects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            valueObjects[_i - 0] = arguments[_i];
        }
        //TODO: check if ...valueObjects can ever be null.
        if (null == valueObjects)
            throw new Error('Event object expected.');
        if (valueObjects.length != 1)
            throw new Error('No more than one Event object expected.');
        this.dispatchEvent(valueObjects[0]);
    };
    /**
     * Unlike other signals, NativeSignal does not dispatch null
     * because it causes an exception in EventDispatcher.
     * @inheritDoc
     * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Event object cannot be <code>null</code>.
     * @throws ArgumentError <code>ArgumentError</code>: Event object [event] is not an instance of [eventClass].
     * @throws ArgumentError <code>ArgumentError</code>: Event object has incorrect type. Expected [eventType] but was [event.type].
     */
    NativeSignal.prototype.dispatchEvent = function (event) {
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
    NativeSignal.prototype.registerListenerWithPriority = function (listener, once, priority) {
        if (once === void 0) { once = false; }
        if (priority === void 0) { priority = 0; }
        if (!this.target)
            throw new Error('Target object cannot be null.');
        if (this.registrationPossible(listener, once)) {
            var slot = new Slot_1.Slot(listener, this, once, priority);
            // Not necessary to insertWithPriority() because the target takes care of ordering.
            this.slots = this.slots.prepend(slot);
            this._target.addEventListener(this._eventType, slot.execute1, false, priority);
            return slot;
        }
        return this.slots.find(listener);
    };
    NativeSignal.prototype.registrationPossible = function (listener, once) {
        if (!this.slots.nonEmpty)
            return true;
        var existingSlot = this.slots.find(listener);
        if (existingSlot) {
            if (existingSlot.once != once) {
                // If the listener was previously added, definitely don't add it again.
                // But throw an exception if their once value differs.
                throw new IllegalOperationError_1.IllegalOperationError('You cannot addOnce() then add() the same listener without removing the relationship first.');
            }
            // Listener was already added.
            return false;
        }
        // This listener has not been added before.
        return true;
    };
    return NativeSignal;
}());
exports.NativeSignal = NativeSignal;
//# sourceMappingURL=NativeSignal.js.map