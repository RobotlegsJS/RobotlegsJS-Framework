"use strict";
// ------------------------------------------------------------------------------
//  Copyright (c) 2016 San Dinh Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------
var robotlegs_1 = require("robotlegs");
var ISignalMap_1 = require("./api/ISignalMap");
var SignalMap_1 = require("./impl/SignalMap");
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