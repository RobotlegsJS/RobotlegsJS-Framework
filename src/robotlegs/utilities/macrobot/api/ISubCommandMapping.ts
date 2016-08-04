/**
 * Author:  Alessandro Bianco
 * Website: http://alessandrobianco.eu
 * Twitter: @alebianco
 * Created: 26/07/12 8.32
 *
 * Copyright © 2011 - 2013 Alessandro Bianco
 */

import {
    IInjector,
    ICommand
} from "robotlegs";

import { ISubCommandPayload } from "./ISubCommandPayload";

export interface ISubCommandMapping {

    commandClass: any;

    executeMethod: string;

    guards: any[];

    hooks: any[];

    payloads: ISubCommandPayload[];

    getOrCreateCommandInstance(injector: IInjector): ICommand;
}
