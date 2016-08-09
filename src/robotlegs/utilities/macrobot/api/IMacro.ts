/**
 * Author:  Alessandro Bianco
 * Website: http://alessandrobianco.eu
 * Twitter: @alebianco
 * Created: 26/07/12 8.32
 *
 * Copyright © 2011 - 2013 Alessandro Bianco
 */

import { ICommand } from "robotlegs";

import { ISubCommandMapper } from "../dsl/ISubCommandMapper";
import { ISubCommandUnMapper } from "../dsl/ISubCommandUnMapper";

export interface IMacro extends ICommand, ISubCommandMapper, ISubCommandUnMapper {
    prepare(): void;
}
