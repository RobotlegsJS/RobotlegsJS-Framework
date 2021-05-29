// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

export class RobotlegsView extends createjs.Container {
    constructor() {
        super();

        this.loadLogo();
    }

    private loadLogo(): void {
        let logo: HTMLImageElement = new Image();

        logo.onload = this.logoLoaded.bind(this);
        logo.crossOrigin = "anonymous";
        logo.src = "images/robotlegs.png";
    }

    private logoLoaded(event: Event): void {
        let logo: HTMLImageElement = <HTMLImageElement>event.target;
        let bitmap: createjs.Bitmap = new createjs.Bitmap(event.target);

        bitmap.x = -(logo.width / 2);
        bitmap.y = -(logo.height / 2);

        this.addChild(bitmap);

        let area: createjs.Shape = new createjs.Shape();
        let graphics: createjs.Graphics = area.graphics;

        graphics.beginFill("#f00");
        graphics.drawRect(bitmap.x, bitmap.y, logo.width, logo.height);

        this.hitArea = area;

        this.mouseEnabled = true;
        this.mouseChildren = false;
    }
}
