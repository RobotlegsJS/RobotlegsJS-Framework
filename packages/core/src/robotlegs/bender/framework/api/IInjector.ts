// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { interfaces } from "inversify";

// eslint-disable-next-line @rushstack/typedef-var
export const IInjector = Symbol("IInjector");

/**
 * The <code>Injector</code> manages the mappings and acts as the central hub from which all
 * injections are started.
 */
export interface IInjector extends interfaces.Container {}
