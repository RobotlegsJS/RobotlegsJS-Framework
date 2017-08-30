import { IFlowViewMapping } from "./IFlowViewMapping";

export let IFlowManager = Symbol("IFlowManager");
export interface IFlowManager {

    map(event: string): IFlowViewMapping;

}
