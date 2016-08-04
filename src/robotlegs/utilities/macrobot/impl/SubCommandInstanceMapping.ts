import {
    IInjector,
    ICommand
} from "robotlegs";

import { SubCommandMapping } from "./SubCommandMapping";

export class SubCommandInstanceMapping extends SubCommandMapping {

    private _instance: ICommand;

    constructor(instance: ICommand) {
        super(instance);

        this._instance = instance;
    }

    public getOrCreateCommandInstance(injector: IInjector): ICommand {
        return this._instance;
    }
}
