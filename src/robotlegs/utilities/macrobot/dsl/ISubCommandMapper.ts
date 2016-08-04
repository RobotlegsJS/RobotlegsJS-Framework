/**
 * Author:  alessandro.bianco
 * Website: http://alessandrobianco.eu
 * Twitter: @alebianco
 * Created: 12/06/2013 11:24
 *
 * Copyright © 2013 Alessandro Bianco
 */

import { ISubCommandConfigurator } from "./ISubCommandConfigurator";

export interface ISubCommandMapper {
    add(commandClass: any): ISubCommandConfigurator;
}
