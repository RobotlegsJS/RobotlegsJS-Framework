import { Colors } from "./Colors";
import { MagicValues } from "./MagicValues";
import { Texts } from "./Texts";
import { CustomButton } from "./../views/components/CustomButton";
import { ViewPortSize } from "./ViewPortSize";
import { AtlasKeys } from "./AtlasKeys";

import { Graphics, Text, Container, Sprite, Texture } from "pixi.js";

export class PixiFactory {

    public static getText(text: string, fontSize: number = MagicValues.SIZE_DEFAULT): Container {
        let style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: fontSize }
        };

        return new PIXI.extras.BitmapText(text, style);
    }
    public static getTitle(label: string): Container {
        let style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.SIZE_TITLE }
        };

        let title = new PIXI.extras.BitmapText(label, style);
        title.x = ViewPortSize.HALF_WIDTH;
        title.y = 50;
        title.pivot.x = title.width * .5;
        title.pivot.y = title.height * .5;
        title.tint = Colors.STATIC_TEXT;
        return title;
    }

    public static getButtonText(label: string): Container {
        let style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.SIZE_BUTTON }
        };

        let title = new PIXI.extras.BitmapText(label, style);
        title.pivot.x = title.width * .5;
        title.pivot.y = title.height * .5;
        title.tint = Colors.BACKGROUND_DARK;
        return title;
    }

    public static getIconButton(icon: string): CustomButton {
        let button: CustomButton = new CustomButton();
        button.setIco(icon);
        return button;
    }

    public static getTextButton(icon: string): CustomButton {
        let button: CustomButton = new CustomButton();
        button.setText(icon);
        return button;
    }

    public static getImage(atlasKey: string): Sprite {
        let texture: Texture = AtlasKeys.getTexture(atlasKey);
        return new Sprite(texture);
    }

    public static getColorBackground(color = Colors.BACKGROUND_DARK): Graphics {
        return this.getColorBox(ViewPortSize.MAX_WIDTH, ViewPortSize.MAX_HEIGHT, color);
    }

    public static getColorBox(width: number, heigth: number, color = 0x00000): Graphics {
        let background: Graphics = new Graphics();
        background.beginFill(color);
        background.drawRect(0, 0, width, heigth);
        return background;
    }

    public static getShadowBackground(alpha = .8): Graphics {
        let bg: Graphics = PixiFactory.getColorBackground(0x000000);
        bg.alpha = alpha;
        return bg;
    }

    public static getTileBackground(color = Colors.BACKGROUND): Graphics {
        let background = new Graphics();
        background.beginFill(color);
        background.drawRoundedRect(0, 0, MagicValues.TILE_WIDTH - 1, MagicValues.TILE_HEIGHT - 1, 5);
        background.pivot.x = background.width * .5;
        background.pivot.y = background.height * .5;
        return background;
    }
    public static getTileText(text: string, color: number): Container {
        let style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.SIZE_BUTTON }
        };
        let bmpText = new PIXI.extras.BitmapText(text, style);
        bmpText.tint = color;
        bmpText.pivot.x = bmpText.width * .5;
        bmpText.pivot.y = bmpText.height * .5;
        return bmpText;
    }
}
