export interface IListener {
    fn: any;
    ctx?: any;
    ctor: boolean;
}

export interface ISignal {
    numItems: number;

    add(commandOrCallback: any, context?: any): number;
    addOnce(commandOrCallback: any, context?: any): void;
    remove(commandOrCallback: any): boolean;
    removeAll(): boolean;
    dispatch(...args: any[]): void;
    // run(listener: IListener, ...args: any[]): void;
}
