/**
 * Author:  Alessandro Bianco
 * Website: http://alessandrobianco.eu
 * Twitter: @alebianco
 * Created: 26/07/12 8.32
 *
 * Copyright © 2011 - 2013 Alessandro Bianco
 */

import { ICommand } from "robotlegs";

export interface IAsyncCommand extends ICommand {
    registerCompleteCallback(callback: Function): void;
}
