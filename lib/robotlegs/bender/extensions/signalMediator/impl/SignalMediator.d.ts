import {IEventDispatcher} from "robotlegs";
import {Mediator} from "robotlegs-pixi";
import {ISignalMap} from "../api/ISignalMap";
import {ISignal} from "signals.js";
/**
 * Signal mediator implementation
 *
 * <p>Override initialize and destroy to hook into the mediator lifecycle.</p>
 */
export declare abstract class SignalMediator<T extends IEventDispatcher> extends Mediator<T> {
    protected signalMap: ISignalMap;

    /**
     * Runs after the mediator has been destroyed.
     * Cleans up listeners mapped through the local EventMap.
     */
    postDestroy(): void;

    protected addToSignal(signal: ISignal, handler: Function): void;

    protected addOnceToSignal(signal: ISignal, handler: Function): void;
}
