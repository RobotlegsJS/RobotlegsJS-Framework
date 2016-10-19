"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NativeRelaySignal_1 = require("./NativeRelaySignal");
var getQualifiedClassName_1 = require("../../../../flash/utils/getQualifiedClassName");
/**
 * <p>
 * The NativeMappedSignal class is used to map/transform a native Event,
 * relayed from an IEventDispatcher, into other forms of data,
 * which are dispatched to all listeners.
 * </p>
 * <p>This can be used to form a border where native flash Events do not cross.</p>
 */
var NativeMappedSignal = (function (_super) {
    __extends(NativeMappedSignal, _super);
    /**
     * Creates a new NativeMappedSignal instance to map/transform a native Event,
     * relayed from an IEventDispatcher, into other forms of data,
     * which are dispatched to all listeners.
     *
     * @param	target	An object that implements the flash.events.IEventDispatcher interface.
     * @param	eventType The event string name that would normally be passed to IEventDispatcher.addEventListener().
     * @param 	eventClass An optional class reference that enables an event type check in dispatch().
     * @param	mappedTypes an optional list of types that enables the checking of the types mapped from an Event.
     */
    function NativeMappedSignal(target, eventType, eventClass) {
        if (eventClass === void 0) { eventClass = null; }
        var mappedTypes = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            mappedTypes[_i - 3] = arguments[_i];
        }
        _super.call(this, target, eventType, eventClass);
        /**
         * @default is null, no mapping will occur
         */
        this._mappingFunction = null;
        this.valueClasses = mappedTypes;
    }
    Object.defineProperty(NativeMappedSignal.prototype, "mappingFunction", {
        /*open for extension but closed for modifications*/
        get: function () {
            return this._mappingFunction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeMappedSignal.prototype, "eventClass", {
        /**
         * @inheritDoc
         */
        /*override*/ get: function () { return this._eventClass; },
        /*override*/ set: function (value) { this._eventClass = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeMappedSignal.prototype, "valueClasses", {
        /**
         * @inheritDoc
         * @throws ArgumentError <code>ArgumentError</code>: Invalid valueClasses argument: item at index should be a Class but was not.
         */
        /*override*/ set: function (value) {
            this._valueClasses = value ? value.slice() : [];
            for (var i = this._valueClasses.length; i--;) {
                if (!(this._valueClasses[i] instanceof Class)) {
                    throw new Error('Invalid valueClasses argument: ' +
                        'item at index ' + i + ' should be a Class but was:<' +
                        this._valueClasses[i] + '>.' + getQualifiedClassName_1.getQualifiedClassName(this._valueClasses[i]));
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the mapping function or literal object list.
     * If the argument is a list of object literals then this list is dispatched to listeners.
     *
     * <listing version="3.0">
     *  signal = new NativeMappedSignal(button, MouseEvent.CLICK, MouseEvent, String).mapTo("ping")
     *  signal.add(function(arg:String):void { trace(arg) }) // prints "ping"
     * </listing>
     *
     * And an example passing a list of literals:
     *
     * <listing version="3.0">
     *  signal = new NativeMappedSignal(button, MouseEvent.CLICK, MouseEvent, String, int, Number).mapTo("ping", 3, 3.1415)
     *  signal.add(function(arg1:String, arg2:int, arg3:Number):void { trace(arg1, arg2, arg3) }) // prints "ping", 3, 3.1415
     * </listing>
     *
     * If the argument is a function then it is called when the event this NativeMappedSignal is listening for is dispatched.
     * The function should return an Array or a single object. The data returned from the function is passed along as arguments in the Signal dispatch.
     * Lets look at some examples of mapping functions and the function that is called back:
     *
     * <listing version="3.0">
     *  signal = new NativeMappedSignal(button, MouseEvent.CLICK, MouseEvent, String).mapTo(function():void {
     *    return "ping"
     *  })
     *  signal.add(function(arg:String):void { trace(arg) }) // prints "ping"
     * </listing>
     *
     * and here's an example using a list of arguments:
     *
     * <listing version="3.0">
     *  signal = new NativeMappedSignal(button, MouseEvent.CLICK, MouseEvent, String, int, Number).mapTo(function():void {
     *    return ["ping", 3, 3.1415]
     *  })
     * 	signal.add(function(arg1:String, arg2:int, arg3:Number):void { trace(arg1, arg2, arg3) }) // prints "ping", 3, 3.1415
     * </listing>
     *
     * You can also state your wish to receive the native Event in th mapping function by simply including an argument of type Event:
     *
     * <listing version="3.0">
     *  signal = new NativeMappedSignal(button, MouseEvent.CLICK, MouseEvent, Point).mapTo(function(event:MouseEvent):void {
     *    return new Point(event.localX, event.localY)
     *  })
     *  signal.add(function(arg:Point):void { trace(arg) }) // prints "(x=128, y=256)"
     * </listing>
     *
     * @param objectListOrFunction This can either be a list of object literals or a function that returns list of objects.
     * @return The NativeMappedSignal object this method was called on. This allows the Signal to be defined and mapped in one statement.
     * @throws ArgumentError <code>ArgumentError</code>: Mapping function needs zero or one arguments of type Event
     */
    NativeMappedSignal.prototype.mapTo = function () {
        var objectListOrFunction = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objectListOrFunction[_i - 0] = arguments[_i];
        }
        if (objectListOrFunction.length == 1 && objectListOrFunction[0] instanceof Function) {
            this._mappingFunction = objectListOrFunction[0];
            if (this._mappingFunction.length > 1) {
                throw new Error('Mapping function has ' + this._mappingFunction.length
                    + ' arguments but it needs zero or one of type Event');
            }
        }
        else {
            this._mappingFunction = function () { return objectListOrFunction; };
        }
        return this;
    };
    /**
     * For usage without extension, instances of <code>NativeMappedSignal</code> that are dispatching any values ( <code>valueClasses.length > 0</code> ),
     * needs to be provided with a either a mapping function or a list of object literals.
     * See <code>mapTo</code> for more info.
     *
     * Subclasses could override this one instead of letting the environment set the mapTo,
     * MAKE SURE to also override <code>mapTo(...)</code> if it should not be allowed.
     *
     * @parameter eventFromTarget the event that was dispatched from target.
     * @return An object or Array of objects mapped from an Event. The mapping of Event to data will be performed by the mapping function
     * if it is set. A list of object literals can also be supplied in place of the mapping function.
     * If no mapping function or object literals are supplied then an empty Array is returned or
     * if <code>valueClasses.length > 0</code> an ArgumentError is thrown.
     *
     * @see #mapTo()
     */
    NativeMappedSignal.prototype.mapEvent = function (eventFromTarget) {
        if (this.mappingFunction != null) {
            if (this.mappingFunction.length == 1) {
                return (this.mappingFunction)(eventFromTarget);
            }
            else {
                return this.mappingFunction();
            }
        }
        else if (this.valueClasses.length == 0) {
            return [];
        }
        throw new Error("There are valueClasses set to be dispatched <" + this.valueClasses
            + "> but mappingFunction is null.");
    };
    /*override*/ NativeMappedSignal.prototype.dispatchEvent = function (event) {
        //TODO: this is only required for backwards compatibility
        var mappedData = this.mapEvent(event);
        var numValueClasses = this.valueClasses.length;
        if (mappedData instanceof Array) {
            var valueObjects = mappedData;
            var valueObject;
            var valueClass;
            for (var i = 0; i < numValueClasses; i++) {
                valueObject = valueObjects[i];
                valueClass = this.valueClasses[i];
                if (valueObject === null || valueObject instanceof valueClass)
                    continue;
                throw new Error('Value object <' + valueObject
                    + '> is not an instance of <' + valueClass + '>.');
            }
        }
        else if (numValueClasses > 1) {
            throw new Error('Expected more than one value.');
        }
        else if (!(mappedData instanceof this.valueClasses[0])) {
            throw new Error('Mapping returned ' +
                getQualifiedClassName_1.getQualifiedClassName(mappedData) + ', expected ' +
                this.valueClasses[0] + '.');
        }
        return _super.prototype.dispatchEvent.call(this, event);
    };
    /*override*/ NativeMappedSignal.prototype.onNativeEvent = function (event) {
        var mappedData = this.mapEvent(event);
        var slotsToProcess = this.slots;
        if (mappedData instanceof Array) {
            if (this.valueClasses.length == 1 && this.valueClasses[0] == Array) {
                while (slotsToProcess.nonEmpty) {
                    slotsToProcess.head.execute1(mappedData);
                    slotsToProcess = slotsToProcess.tail;
                }
            }
            else {
                var mappedDataArray = mappedData;
                while (slotsToProcess.nonEmpty) {
                    slotsToProcess.head.execute(mappedDataArray);
                    slotsToProcess = slotsToProcess.tail;
                }
            }
        }
        else {
            while (slotsToProcess.nonEmpty) {
                slotsToProcess.head.execute1(mappedData);
                slotsToProcess = slotsToProcess.tail;
            }
        }
    };
    return NativeMappedSignal;
}(NativeRelaySignal_1.NativeRelaySignal));
exports.NativeMappedSignal = NativeMappedSignal;
//# sourceMappingURL=NativeMappedSignal.js.map