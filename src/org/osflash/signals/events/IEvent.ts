import {IPrioritySignal} from "../IPrioritySignal";

export interface IEvent {
    /** The object that originally dispatched the event.
     *  When dispatched from an signal, the target is the object containing the signal. */
    target: Object;
    /*function set target(value:Object):void;*/

    /** The object that added the listener for the event. */
    currentTarget: Object;
    /*function set currentTarget(value:Object):void;*/

    /** The signal that dispatched the event. */
    signal: IPrioritySignal;
    /*function set signal(value:IPrioritySignal):void;*/

    /** Indicates whether the event is a bubbling event. */
    bubbles: boolean;
    /*function set bubbles(value:Boolean):void;*/

    /** Returns a new copy of the instance. */
    clone(): IEvent;
}

