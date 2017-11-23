import { Graphics } from 'pixi.js';

import { Colors } from './Colors';
import { MagicValues } from './MagicValues';

export class PixiFactory {
    /* BACKGROUNDS */
    public static getColorBackground(color = Colors.BACKGROUND_DARK): Graphics {
        return this.getColorBox(MagicValues.MAX_WIDTH, MagicValues.MAX_HEIGHT, color);
    }
    public static getColorBox(width: number, heigth: number, color = 0x00000): Graphics {
        const background: Graphics = new Graphics();
        background.beginFill(color);
        background.drawRect(0, 0, width, heigth);
        return background;
    }
}
