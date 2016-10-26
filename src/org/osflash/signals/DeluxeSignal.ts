import {PrioritySignal} from "./PrioritySignal";
import {SlotList} from "./SlotList";
import {IBubbleEventHandler} from "./events/IBubbleEventHandler";
import {IEvent} from "./events/IEvent";

/**
 * Allows the valueClasses to be set in MXML, e.g.
 * <signals:Signal id="nameChanged">{[String, uint]}</signals:Signal>
 */
/*[DefaultProperty("valueClasses")]*/
/**
 * Signal dispatches events to multiple listeners.
 * It is inspired by C# events and delegates, and by
 * <a target="_top" href="http://en.wikipedia.org/wiki/Signals_and_slots">signals and slots</a>
 * in Qt.
 * A Signal adds event dispatching functionality through composition and interfaces,
 * rather than inheriting from a dispatcher.
 * <br/><br/>
 * Project home: <a target="_top" href="http://github.com/robertpenner/as3-signals/">http://github.com/robertpenner/as3-signals/</a>
 */
export class DeluxeSignal extends PrioritySignal {
    protected _target: Object;

    /**
     * Creates a DeluxeSignal instance to dispatch events on behalf of a target object.
     * @param    target The object the signal is dispatching events on behalf of.
     * @param    valueClasses Any number of class references that enable type checks in dispatch().
     * For example, new DeluxeSignal(this, String, uint)
     * would allow: signal.dispatch("the Answer", 42)
     * but not: signal.dispatch(true, 42.5)
     * nor: signal.dispatch()
     *
     * NOTE: Subclasses cannot call super.apply(null, valueClasses),
     * but this constructor has logic to support super(valueClasses).
     */
    constructor(target: Object = null, ...valueClasses) {
        // Cannot use super.apply(null, valueClasses), so allow the subclass to call super(valueClasses).
        valueClasses = (valueClasses.length == 1 && valueClasses[0] instanceof Array) ? valueClasses[0] : valueClasses;

        super(valueClasses);

        //@CHANGED - this was the first call in the constructor
        //Typescript does not allow "this" to be called before super
        this._target = target;
    }

    /** @inheritDoc */
    public get target(): Object {
        return this._target;
    }

    public set target(value: Object) {
        if (value == this._target) return;
        this.removeAll();
        this._target = value;
    }

    /**
     * @inheritDoc
     * @throws ArgumentError <code>ArgumentError</code>: Incorrect number of arguments.
     * @throws ArgumentError <code>ArgumentError</code>: Value object is not an instance of the appropriate valueClasses Class.
     */
    /*override*/
    public dispatch(...valueObjects): void {
        // Validate value objects against pre-defined value classes.
        var numValueClasses: number = this._valueClasses.length;
        var numValueObjects: number = valueObjects.length;

        if (numValueObjects < numValueClasses) {
            throw new Error('Incorrect number of arguments. ' +
                'Expected at least ' + numValueClasses + ' but received ' +
                numValueObjects + '.');
        }

        // Cannot dispatch differently typed objects than declared classes.
        for (var i: number = 0; i < numValueClasses; i++) {
            // Optimized for the optimistic case that values are correct.
            if (valueObjects[i] instanceof this._valueClasses[i] || valueObjects[i] === null)
                continue;

            throw new Error('Value object <' + valueObjects[i]
                + '> is not an instance of <' + this._valueClasses[i] + '>.');
        }

        // Extract and clone event object if necessary.
        var event: IEvent = (<IEvent>valueObjects[0] );
        if (event) {
            if (event.target) {
                event = event.clone();
                valueObjects[0] = event;
            }

            event.target = this.target;
            event.currentTarget = this.target;
            event.signal = this;
        }

        // Broadcast to listeners.
        var slotsToProcess: SlotList = this.slots;
        while (slotsToProcess.nonEmpty) {
            slotsToProcess.head.execute(valueObjects);
            slotsToProcess = slotsToProcess.tail;
        }

        // Bubble the event as far as possible.
        if (!event || !event.bubbles) return;

        var currentTarget: Object = this.target;

        while (currentTarget && currentTarget.hasOwnProperty("parent")) {
            currentTarget = currentTarget["parent"];
            if (!currentTarget) break;

            if ((<IBubbleEventHandler>currentTarget).onEventBubbled !== undefined) {
                event.currentTarget = currentTarget;
                // onEventBubbled() can stop the bubbling by returning false.
                if ((<IBubbleEventHandler>currentTarget).onEventBubbled(event))
                    break;
            }
        }
    }

}

