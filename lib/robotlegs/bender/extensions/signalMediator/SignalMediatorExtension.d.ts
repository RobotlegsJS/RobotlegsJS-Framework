import {IContext, IExtension} from "robotlegs";
export declare class SignalMediatorExtension implements IExtension {
    private _uid;

    extend(context: IContext): void;

    toString(): string;
}
