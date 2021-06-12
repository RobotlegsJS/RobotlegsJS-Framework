import { injectable } from "@robotlegsjs/core";
import { Signal } from "@robotlegsjs/signals";

@injectable()
export class TickManager {
    private _playing: boolean;
    private _tick: Signal;

    public constructor() {
        this._playing = false;
        this._tick = new Signal();
        window.requestAnimationFrame(this.onEnterFrame.bind(this));
    }

    public start(): void {
        this._playing = true;
    }

    public stop(): void {
        this._playing = false;
    }

    public isPlaying(): boolean {
        return this._playing;
    }

    public getTick(): Signal {
        return this._tick;
    }

    public onEnterFrame(e: any): void {
        if (this._playing === true) {
            this._tick.dispatch();
        }
        window.requestAnimationFrame(this.onEnterFrame.bind(this));
    }
}
