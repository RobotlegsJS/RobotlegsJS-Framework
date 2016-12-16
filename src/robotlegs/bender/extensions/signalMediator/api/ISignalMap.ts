import {ISignal} from "signals.js";

/**
 * The Signal Map allows you to bind Signals to functions
 */
export let ISignalMap = Symbol("ISignalMap");
export interface ISignalMap {
    addToSignal(signal: ISignal, handler: Function): void;

    addOnceToSignal(signal: ISignal, handler: Function): void;

    removeFromSignal(signal: ISignal, handler: Function): void;

    removeAll(): void
}