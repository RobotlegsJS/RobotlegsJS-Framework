import { injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { MainView } from "../views/MainView";

@injectable()
export class MainViewMediator extends Mediator<MainView> {
    public initialize(): void {
        this.view.createComponents();
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
}
