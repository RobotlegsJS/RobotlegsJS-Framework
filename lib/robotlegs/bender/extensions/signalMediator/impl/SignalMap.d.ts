import {ISignalMap} from "../api/ISignalMap";
export declare class SignalMap implements ISignalMap {
    protected _handlersBySignal: Map<any, Array<Function>>;
    constructor();
    addToSignal(signal: any, handler: Function): void;
    addOnceToSignal(signal: any, handler: Function): void;
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
