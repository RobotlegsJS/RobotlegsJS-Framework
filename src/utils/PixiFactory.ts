import { Graphics, Sprite, Text } from "pixi.js";

import { AssetKeys } from "./AssetKeys";
import { Colors } from "./Colors";
import { MagicValues } from "./MagicValues";

export class PixiFactory {
    public static getColorBackground(color = Colors.BACKGROUND_DARK): Graphics {
        return this.getColorBox(MagicValues.MAX_WIDTH, MagicValues.MAX_HEIGHT, color);
    }
    public static getColorBox(width: number, heigth: number, color = 0x000000): Graphics {
        const background: Graphics = new Graphics();
        background.beginFill(color);
        background.drawRect(0, 0, width, heigth);
        return background;
    }
    public static getText(label: string, color: number = 0xffffff): Text {
        const text = new Text(label, { fill: [color] });
        return text;
    }
    public static getSprite(atlasKey: string): Sprite {
        return new Sprite(AssetKeys.getTexture(atlasKey));
    }
}
