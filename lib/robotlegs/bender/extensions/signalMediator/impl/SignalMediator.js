"use strict";
var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
// ------------------------------------------------------------------------------
//  Copyright (c) 2016 San Dinh Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------
var inversify_1 = require("inversify");
var robotlegs_pixi_1 = require("robotlegs-pixi");
var ISignalMap_1 = require("../api/ISignalMap");
/**
 * Signal mediator implementation
 *
 * <p>Override initialize and destroy to hook into the mediator lifecycle.</p>
 */
var SignalMediator = (function (_super) {
    __extends(SignalMediator, _super);
    function SignalMediator() {
        return _super.apply(this, arguments) || this;
    }
    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/
    /**
     * Runs after the mediator has been destroyed.
     * Cleans up listeners mapped through the local EventMap.
     */
    SignalMediator.prototype.postDestroy = function () {
        this.signalMap.removeAll();
        _super.prototype.postDestroy.call(this);
    };
    /*============================================================================*/
    /* Protected Functions                                                        */
    /*============================================================================*/
    SignalMediator.prototype.addToSignal = function (signal, handler) {
        this.signalMap.addToSignal(signal, handler);
    };
    SignalMediator.prototype.addOnceToSignal = function (signal, handler) {
        this.signalMap.addOnceToSignal(signal, handler);
    };
    return SignalMediator;
}(robotlegs_pixi_1.Mediator));
__decorate([
    inversify_1.inject(ISignalMap_1.ISignalMap),
    __metadata("design:type", Object)
], SignalMediator.prototype, "signalMap", void 0);
SignalMediator = __decorate([
    inversify_1.injectable()
], SignalMediator);
exports.SignalMediator = SignalMediator;
//# sourceMappingURL=SignalMediator.js.map