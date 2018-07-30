// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { interfaces, ContainerModule } from "inversify";

import { inject, injectable, IClass, ICommand, IInjector, IContext, applyHooks, guardsApprove } from "@robotlegsjs/core";

import { IAsyncCommand } from "../api/IAsyncCommand";
import { IMacro } from "../api/IMacro";
import { ISubCommandMapping } from "../api/ISubCommandMapping";
import { ISubCommandPayload } from "../api/ISubCommandPayload";

import { ISubCommandConfigurator } from "../dsl/ISubCommandConfigurator";

import { AsyncCommand } from "./AsyncCommand";
import { SubCommandMapping } from "./SubCommandMapping";
import { SubCommandMappingList } from "./SubCommandMappingList";

@injectable()
export abstract class AbstractMacro extends AsyncCommand implements IMacro {
    protected _injector: IInjector;
    protected _mappings: SubCommandMappingList;
    protected _payloadsModule: ContainerModule;

    constructor(@inject(IContext) context: IContext, @inject(IInjector) injector: IInjector) {
        super(context);

        this._injector = injector.createChild();
        this._mappings = new SubCommandMappingList();
        this.prepare();
    }

    public add(commandClass: IClass<ICommand>): ISubCommandConfigurator {
        let mapping: SubCommandMapping = new SubCommandMapping(commandClass);
        this._mappings.addMapping(mapping);
        return mapping;
    }

    public remove(commandClass: IClass<ICommand>): void {
        this._mappings.removeMappingsFor(commandClass);
    }

    public abstract prepare(): void;

    protected executeCommand(mapping: ISubCommandMapping): void {
        let command: ICommand;
        let commandClass: IClass<ICommand> = mapping.commandClass;
        let payloads: Array<ISubCommandPayload<any>> = mapping.payloads;
        let hasPayloads: boolean = payloads.length > 0;

        if (hasPayloads) {
            this.mapPayloads(payloads);
        }

        if (mapping.guards.length === 0 || guardsApprove(mapping.guards, this._injector)) {
            command = mapping.getOrCreateCommandInstance(this._injector);

            if (mapping.hooks.length > 0) {
                this._injector.bind(commandClass).toConstantValue(command);
                applyHooks(mapping.hooks, this._injector);
                this._injector.unbind(commandClass);
            }
        }

        if (hasPayloads) {
            this.unmapPayloads(payloads);
        }

        if (command) {
            let isAsync: boolean = command.constructor.prototype.registerCompleteCallback !== undefined;

            if (isAsync) {
                (<IAsyncCommand>command).registerCompleteCallback(this.commandCompleteHandler.bind(this));
            }

            command.execute();

            if (!isAsync) {
                this.commandCompleteHandler(true);
            }
        } else {
            this.commandCompleteHandler(true);
        }
    }

    protected mapPayloads(payloads: Array<ISubCommandPayload<any>>): void {
        this._payloadsModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
            payloads.forEach((payload: ISubCommandPayload<any>) => {
                if (payload.name.length > 0) {
                    bind(payload.type)
                        .toConstantValue(payload.data)
                        .whenTargetNamed(payload.name);
                } else {
                    bind(payload.type).toConstantValue(payload.data);
                }
            });
        });
        this._injector.load(this._payloadsModule);
    }

    protected unmapPayloads(payloads: Array<ISubCommandPayload<any>>): void {
        this._injector.unload(this._payloadsModule);
    }

    protected abstract commandCompleteHandler(success: boolean): void;
}
