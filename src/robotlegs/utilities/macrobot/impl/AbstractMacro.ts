/**
 * Author:  Alessandro Bianco
 * Website: http://alessandrobianco.eu
 * Twitter: @alebianco
 * 
 * Copyright © 2011 - 2013 Alessandro Bianco
 */

import {
    inject,
    injectable,
    ICommand,
    IInjector,
    IContext,
    applyHooks,
    guardsApprove
} from "robotlegs";

import { IAsyncCommand } from "../api/IAsyncCommand";
import { IMacro } from "../api/IMacro";
import { ISubCommandMapping } from "../api/ISubCommandMapping";
import { ISubCommandPayload } from "../api/ISubCommandPayload";

import { ISubCommandConfigurator } from "../dsl/ISubCommandConfigurator";

import { AsyncCommand } from "./AsyncCommand";
import { SubCommandInstanceMapping } from "./SubCommandInstanceMapping";
import { SubCommandMapping } from "./SubCommandMapping";
import { SubCommandMappingList } from "./SubCommandMappingList";

@injectable()
export abstract class AbstractMacro extends AsyncCommand implements IMacro {

    protected _injector: IInjector;
    protected _mappings: SubCommandMappingList;

    constructor(
        @inject(IContext) context: IContext,
        @inject(IInjector) injector: IInjector
    ) {
        super(context);

        this._injector = injector.createChild();
        this._mappings = new SubCommandMappingList();
        this.prepare();
    }

    public add(commandClass: any): ISubCommandConfigurator {
        let mapping: SubCommandMapping = new SubCommandMapping(commandClass);
        this._mappings.addMapping(mapping);
        return mapping;
    }

    public addInstance(command: ICommand): ISubCommandConfigurator {
        let mapping: SubCommandMapping = new SubCommandInstanceMapping(command);
        this._mappings.addMapping(mapping);
        return mapping;
    }

    public remove(commandClass: any): void {
        this._mappings.removeMappingsFor(commandClass);
    }

    public abstract prepare(): void;

    protected executeCommand(mapping: ISubCommandMapping): void {
        let command: ICommand;
        let commandClass: any = mapping.commandClass;
        let payloads: ISubCommandPayload[] = mapping.payloads;
        let hasPayloads: boolean = payloads.length > 0;

        hasPayloads && this.mapPayloads(payloads);

        if (mapping.guards.length === 0 || guardsApprove(mapping.guards, this._injector)) {
            command = mapping.getOrCreateCommandInstance(this._injector);

            if (mapping.hooks.length > 0) {
                this._injector.bind(commandClass).toConstantValue(command);
                applyHooks(mapping.hooks, this._injector);
                this._injector.unbind(commandClass);
            }
        }

        hasPayloads && this.unmapPayloads(payloads);

        if (command && mapping.executeMethod) {
            let isAsync: boolean = command.constructor.prototype.registerCompleteCallback !== undefined;
            isAsync && (<IAsyncCommand>command).registerCompleteCallback(this.commandCompleteHandler.bind(this));
            let executeMethod: Function = command[mapping.executeMethod];
            executeMethod.apply(command);
            !isAsync && this.commandCompleteHandler(true);
        } else {
            this.commandCompleteHandler(true);
        }
    }

    protected mapPayloads(payloads: ISubCommandPayload[]): void {
        for (let i: number = 0; i < payloads.length; i++) {
            let payload: ISubCommandPayload = payloads[i];
            this._injector.bind(payload.type).toConstantValue(payload.data);
        }
    }

    protected unmapPayloads(payloads: ISubCommandPayload[]): void {
        for (let i: number = 0; i < payloads.length; i++) {
            let payload: ISubCommandPayload = payloads[i];
            this._injector.unbind(payload.type);
        }
    }

    protected abstract commandCompleteHandler(success: boolean): void;
}
