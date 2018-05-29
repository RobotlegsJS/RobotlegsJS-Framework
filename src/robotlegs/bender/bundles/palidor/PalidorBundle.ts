import {
    ConsoleLoggingExtension,
    DirectCommandMapExtension,
    EventCommandMapExtension,
    EventDispatcherExtension,
    IBundle,
    IContext,
    InjectableLoggerExtension,
    LocalEventMapExtension
} from "@robotlegsjs/core";
import {
    ContextViewExtension,
    ContextViewListenerConfig,
    IContextView,
    MediatorMapExtension,
    StageCrawlerExtension,
    StageObserverExtension,
    ViewManagerExtension
} from "@robotlegsjs/pixi";

import { PalidorPixiExtension } from "./../../extensions/palidorPixi/PalidorPixiExtension";

export class PalidorBundle implements IBundle {
    private _context: IContext;

    public extend(context: IContext): void {
        this._context = context;

        this._context.install(
            ConsoleLoggingExtension,
            InjectableLoggerExtension,
            EventDispatcherExtension,
            DirectCommandMapExtension,
            EventCommandMapExtension,
            LocalEventMapExtension,
            ContextViewExtension,
            ViewManagerExtension,
            StageObserverExtension,
            MediatorMapExtension,
            StageCrawlerExtension,
            PalidorPixiExtension
        );

        this._context.whenInitializing(this.whenInitializing.bind(this));
        this._context.afterDestroying(this.afterDestroying.bind(this));
    }

    private whenInitializing(): void {
        if (this._context.injector.isBound(IContextView)) {
            this._context.configure(ContextViewListenerConfig);
        }
    }

    private afterDestroying(): void {
        this._context = null;
    }
}
