// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { SceneKey } from "../constants/SceneKey";
import { BaseScene } from "./BaseScene";

export class Preload extends BaseScene {
    public constructor() {
        super(SceneKey.PRELOAD);
    }

    public preload(): void {
        /* Preload required assets */
        this.load.image("koreez", "images/koreez.jpg");
        this.load.image("robotlegs", "images/robotlegs.png");
        // this.game.load.audio('myAudio', 'images/my-audio.wav');
        // this.game.load.atlas('myAtlas', 'images/my-atlas.png', 'assets/my-atlas.json');
    }

    public create(): void {
        super.create();

        // NOTE: Change to GameTitle if required
        // this.game.state.start(StateKey.MAIN);

        this.scene.start(SceneKey.MAIN);
    }
}
