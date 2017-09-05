/**
 * The ISlot interface defines the basic properties of a
 * listener associated with a Signal.
 *
 * @author Joa Ebert
 * @author Robert Penner
 */
export let ISlot = Symbol("ISlot");
export interface ISlot {
    /**
     * The listener associated with this slot.
     */
    listener: Function;

    /**
     * Allows the ISlot to inject parameters when dispatching. The params will be at
     * the tail of the arguments and the ISignal arguments will be at the head.
     *
     * var signal:ISignal = new Signal(String);
     * signal.add(handler).params = [42];
     * signal.dispatch('The Answer');
     * function handler(name:String, num:int):void{}
     */
    params: any[];

    /**
     * Whether this slot is automatically removed after it has been used once.
     */
    once: boolean;

    /**
     * The priority of this slot should be given in the execution order.
     * An IPrioritySignal will call higher numbers before lower ones.
     * Defaults to 0.
     */
    priority: number;

    /**
     * Whether the listener is called on execution. Defaults to true.
     */
    enabled: boolean;

    /**
     * Executes a listener without arguments.
     * Existing <code>params</code> are appended before the listener is called.
     */
    execute0(): void;

    /**
     * Dispatches one argument to a listener.
     * Existing <code>params</code> are appended before the listener is called.
     * @param value The argument for the listener.
     */
    execute1(value: Object): void;

    /**
     * Executes a listener of arity <code>n</code> where <code>n</code> is
     * <code>valueObjects.length</code>.
     * Existing <code>params</code> are appended before the listener is called.
     * @param valueObjects The array of arguments to be applied to the listener.
     */
    execute(valueObjects: any[]): void;

    /**
     * Removes the slot from its signal.
     */
    remove(): void;
}
