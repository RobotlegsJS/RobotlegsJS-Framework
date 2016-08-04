/**
 * Author:  alessandro.bianco
 * Website: http://alessandrobianco.eu
 * Twitter: @alebianco
 * Created: 12/06/2013 11:24
 *
 * Copyright © 2013 Alessandro Bianco
 */

import { ISubCommandPayload } from "../api/ISubCommandPayload";

export interface ISubCommandConfigurator {

    withGuards(...guards: any[]): ISubCommandConfigurator;

    withHooks(...hooks: any[]): ISubCommandConfigurator;

    withPayloads(...payloads: ISubCommandPayload[]): ISubCommandConfigurator;

    withExecuteMethod(name: String): ISubCommandConfigurator;
}
