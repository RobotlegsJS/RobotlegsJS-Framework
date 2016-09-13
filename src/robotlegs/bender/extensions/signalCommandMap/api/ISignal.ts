// ------------------------------------------------------------------------------
//  Copyright (c) 2016 Goodgame Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

export interface IListener {
    fn: any;
    ctx?: any;
    ctor: boolean;
}

export interface ISignal {
    numItems: number;
    valueTypes: any[];

    add(commandOrCallback: any, context?: any): number;
    addOnce(commandOrCallback: any, context?: any): void;
    remove(commandOrCallback: any): boolean;
    removeAll(): boolean;
    dispatch(...args: any[]): void;
    // run(listener: IListener, ...args: any[]): void;
}
