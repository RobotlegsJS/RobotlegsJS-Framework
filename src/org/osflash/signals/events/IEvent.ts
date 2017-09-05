import { IPrioritySignal } from "../IPrioritySignal";

export interface IEvent {
    /**
     * The object that originally dispatched the event.
     * When dispatched from an signal, the target is the object containing the signal.
     */
    target: Object;

    /**
     * The object that added the listener for the event.
     */
    currentTarget: Object;

    /**
     * The signal that dispatched the event.
     */
    signal: IPrioritySignal;

    /**
     * Indicates whether the event is a bubbling event.
     */
    bubbles: boolean;

    /**
     * Returns a new copy of the instance.
     */
    clone(): IEvent;
}
