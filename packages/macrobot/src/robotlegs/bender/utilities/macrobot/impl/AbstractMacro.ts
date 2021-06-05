// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    applyHooks,
    guardsApprove,
    inject,
    injectable,
    interfaces,
    CommandPayload,
    ContainerModule,
    IClass,
    ICommand,
    IContext,
    IInjector
} from "@robotlegsjs/core";

import { IAsyncCommand } from "../api/IAsyncCommand";
import { IMacro } from "../api/IMacro";
import { ISubCommandMapping } from "../api/ISubCommandMapping";
import { ISubCommandPayload } from "../api/ISubCommandPayload";

import { ISubCommandConfigurator } from "../dsl/ISubCommandConfigurator";

import { AsyncCommand } from "./AsyncCommand";
import { SubCommandMapping } from "./SubCommandMapping";
import { SubCommandMappingList } from "./SubCommandMappingList";
import { SubCommandPayload } from "./SubCommandPayload";

@injectable()
export abstract class AbstractMacro extends AsyncCommand implements IMacro {
    protected _injector: IInjector;
    protected _macroPayload: CommandPayload;
    protected _mappings: SubCommandMappingList;

    protected _executeArguments: any;
    protected _commandPayloads: ISubCommandPayload<any>[] = [];
    protected _commandPayloadsModule: ContainerModule;

    public constructor(
        @inject(IContext) context: IContext,
        @inject(IInjector) injector: IInjector
    ) {
        super(context);

        this._injector = injector.createChild();
        this._macroPayload = new CommandPayload();
        this._mappings = new SubCommandMappingList();
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

    protected captureMacroPayload(executeArguments: any): void {
        this._executeArguments = executeArguments;

        for (const argument of executeArguments) {
            if (argument instanceof SubCommandPayload) {
                this._commandPayloads.push(argument);
            } else {
                this._macroPayload.addPayload(argument, argument.constructor);
            }
        }
    }

    protected executeCommand(mapping: ISubCommandMapping): void {
        let command: ICommand;
        let commandClass: IClass<ICommand> = mapping.commandClass;
        let payloads: ISubCommandPayload<any>[] = this._commandPayloads.concat(mapping.payloads);
        let hasPayloads: boolean = payloads.length > 0;

        this.mapMacroPayload(this._macroPayload);

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

        this.unmapMacroPayload(this._macroPayload);

        if (command) {
            let isAsync: boolean =
                command.constructor.prototype.registerCompleteCallback !== undefined;

            if (isAsync) {
                (<IAsyncCommand>command).registerCompleteCallback(
                    this.commandCompleteHandler.bind(this)
                );
            }

            if (payloads.length > 0) {
                command.execute.apply(command, payloads.concat(this._executeArguments));
            } else {
                command.execute.apply(command, this._executeArguments);
            }

            if (!isAsync) {
                this.commandCompleteHandler(true);
            }
        } else {
            this.commandCompleteHandler(true);
        }
    }

    protected mapMacroPayload(payload: CommandPayload): void {
        let i: number = payload.length;
        while (i--) {
            this._injector.bind(payload.classes[i]).toConstantValue(payload.values[i]);
        }
    }

    protected unmapMacroPayload(payload: CommandPayload): void {
        let i: number = payload.length;
        while (i--) {
            this._injector.unbind(payload.classes[i]);
        }
    }

    protected mapPayloads(payloads: ISubCommandPayload<any>[]): void {
        this._commandPayloadsModule = new ContainerModule(
            (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
                payloads.forEach((payload: ISubCommandPayload<any>) => {
                    if (payload.name.length > 0) {
                        bind(payload.type)
                            .toConstantValue(payload.data)
                            .whenTargetNamed(payload.name);
                    } else {
                        bind(payload.type).toConstantValue(payload.data);
                    }
                });
            }
        );
        this._injector.load(this._commandPayloadsModule);
    }

    protected unmapPayloads(payloads: ISubCommandPayload<any>[]): void {
        this._injector.unload(this._commandPayloadsModule);
    }

    protected abstract commandCompleteHandler(success: boolean): void;
}
