"use strict";
// ------------------------------------------------------------------------------
//  Copyright (c) 2016 San Dinh Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------
var signals_js_1 = require("signals.js");
var robotlegs_1 = require("robotlegs");
var ISignalMap_1 = require("./api/ISignalMap");
var SignalMap_1 = require("./impl/SignalMap");
// allow signals to be injected
robotlegs_1.injectable()(signals_js_1.MonoSignal);
robotlegs_1.injectable()(signals_js_1.OnceSignal);
robotlegs_1.injectable()(signals_js_1.Signal);
robotlegs_1.injectable()(signals_js_1.DeluxeSignal);
robotlegs_1.injectable()(signals_js_1.PrioritySignal);
var SignalMediatorExtension = (function () {
    function SignalMediatorExtension() {
        /*============================================================================*/
        /* Private Properties                                                         */
        /*============================================================================*/
        this._uid = robotlegs_1.UID.create(SignalMediatorExtension);
    }
    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/
    SignalMediatorExtension.prototype.extend = function (context) {
        context.injector.bind(ISignalMap_1.ISignalMap).to(SignalMap_1.SignalMap).inSingletonScope();
    };
    SignalMediatorExtension.prototype.toString = function () {
        return this._uid;
    };
    return SignalMediatorExtension;
}());
exports.SignalMediatorExtension = SignalMediatorExtension;
//# sourceMappingURL=SignalMediatorExtension.js.map