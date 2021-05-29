// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import Sprite from "openfl/display/Sprite";
import Loader from "openfl/display/Loader";
import URLRequest from "openfl/net/URLRequest";
import Event from "openfl/events/Event";

export class RobotlegsView extends Sprite {
    constructor() {
        super();

        this.addEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
    }

    private onAddedToStage = (event: Event): void => {
        if (event.target === this) {
            this.loadLogo();
            this.enableButtonMode();
        }
    };

    private loadLogo(): void {
        let loader = new Loader();
        loader.contentLoaderInfo.addEventListener(Event.COMPLETE, this.logoLoaded);
        loader.load(new URLRequest("images/robotlegs.png"));
    }

    private logoLoaded = (event: Event): void => {
        let bitmap = event.target.loader.content;

        bitmap.x = (this.stage.stageWidth - bitmap.width) / 2;
        bitmap.y = (this.stage.stageHeight - bitmap.height) / 2;

        this.addChild(bitmap);
    };

    private enableButtonMode(): void {
        this.useHandCursor = true;
        this.mouseEnabled = true;
        this.mouseChildren = false;
        this.buttonMode = true;
    }
}
