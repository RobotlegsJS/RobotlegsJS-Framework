"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
var robotlegs_1 = require("robotlegs");
var SignalMap = (function () {
    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/
    function SignalMap() {
        this._handlersBySignal = new Map();
    }
    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/
    SignalMap.prototype.addToSignal = function (signal, handler) {
        signal.add(handler);
        this.storeSignalHandler(signal, handler);
    };
    SignalMap.prototype.addOnceToSignal = function (signal, handler) {
        signal.addOnce(handler);
        this.storeSignalHandler(signal, handler);
    };
    /**
     * @private
     */
    SignalMap.prototype.removeFromSignal = function (signal, handler) {
        signal.remove(handler);
        if ((this._handlersBySignal[signal] == null) || (this._handlersBySignal[signal].length == 0)) {
            return;
        }
        var handlerIndex = this._handlersBySignal[signal].indexOf(handler);
        if (handlerIndex > -1) {
            this._handlersBySignal[signal].splice(handlerIndex, 1);
        }
    };
    /**
     * @private
     */
    SignalMap.prototype.removeAll = function () {
        this._handlersBySignal.forEach(function (handlers, signal) {
            return handlers.forEach(function (handler) {
                return signal.remove(handler);
            });
        });
        this._handlersBySignal = new Map();
    };
    /*============================================================================*/
    /* Protected Functions                                                        */
    /*============================================================================*/
    SignalMap.prototype.storeSignalHandler = function (signal, handler) {
        if (this._handlersBySignal[signal] == null) {
            this._handlersBySignal[signal] = [handler];
        }
        else {
            this._handlersBySignal[signal].push(handler);
        }
    };
    return SignalMap;
}());
SignalMap = __decorate([
    robotlegs_1.injectable(),
    __metadata("design:paramtypes", [])
], SignalMap);
exports.SignalMap = SignalMap;
//# sourceMappingURL=SignalMap.js.map