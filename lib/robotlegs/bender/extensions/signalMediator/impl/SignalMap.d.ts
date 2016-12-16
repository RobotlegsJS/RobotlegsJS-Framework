import {ISignalMap} from "../api/ISignalMap";
import {ISignal} from "signals.js";
export declare class SignalMap implements ISignalMap {
    protected _handlersBySignal: Map<ISignal, Array<Function>>;
    constructor();
    addToSignal(signal: ISignal, handler: Function): void;
    addOnceToSignal(signal: ISignal, handler: Function): void;
    /**
     * @private
     */
    removeFromSignal(signal: any, handler: Function): void;
    /**
     * @private
     */
    removeAll(): void;
    protected storeSignalHandler(signal: any, handler: Function): void;
}
