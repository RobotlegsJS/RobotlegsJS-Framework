import { Container } from "pixi.js";

export let IPixiRootContainer = Symbol("IPixiRootContainer");
export interface IPixiRootContainer {

    getRootContainer(): Container;
}
