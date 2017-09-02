export let IContainerController = Symbol("IContainerController");
export interface IContainerController {

    addView(view: any): void;

    changeView(view: any): void;

    removeCurrentView(): void;

    removeLastFloatingViewAdded(): void;

    removeAllFloatingViews(): void;

}
