import {injectable} from "@robotlegsjs/core";
import {ISignalMap} from "../api/ISignalMap";
import {ISignal} from "@robotlegsjs/signals";

@injectable()
export class SignalMap implements ISignalMap {

    /*============================================================================*/
    /* Protected Properties                                                       */
    /*============================================================================*/

    protected _handlersBySignal: Map<ISignal, Array<Function>>;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    constructor() {
        this._handlersBySignal = new Map();
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    addToSignal(signal: ISignal, handler: Function): void {
        signal.add(handler);
        this.storeSignalHandler(signal, handler);
    }

    addOnceToSignal(signal: ISignal, handler: Function): void {
        signal.addOnce(handler);
        this.storeSignalHandler(signal, handler);
    }


    /**
     * @private
     */
    removeFromSignal(signal: any, handler: Function): void {
        signal.remove(handler);

        if ((this._handlersBySignal[signal] == null) || (this._handlersBySignal[signal].length == 0)) {
            return;
        }

        let handlerIndex = this._handlersBySignal[signal].indexOf(handler);

        if (handlerIndex > -1) {
            this._handlersBySignal[signal].splice(handlerIndex, 1);
        }
    }

    /**
     * @private
     */
    removeAll(): void {
        this._handlersBySignal.forEach(
            (handlers, signal) => handlers.forEach((handler) => signal.remove(handler))
        );

        this._handlersBySignal.clear();

        this._handlersBySignal = new Map();
    }

    /*============================================================================*/
    /* Protected Functions                                                        */
    /*============================================================================*/

    protected storeSignalHandler(signal: any, handler: Function): void {
        if (this._handlersBySignal.get(signal) == null) {
            this._handlersBySignal.set(signal, [handler]);
        } else {
            this._handlersBySignal.get(signal).push(handler);
        }
    }
}