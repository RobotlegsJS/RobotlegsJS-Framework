import { Colors } from "./Colors";
import { Texts } from "./Texts";
import { CustomButton } from "./../views/components/CustomButton";
import { MagicValues } from "./MagicValues";
import { AtlasKeys } from "./AtlasKeys";

import { Graphics, Text, Container, Sprite, Texture } from "pixi.js";

export class PixiFactory {
    /* TEXTFIELDS */
    public static getText(text: string, color = Colors.TEXT): Container {
        let style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.FONT_SIZE_DEFAULT }
        };
        let label = new PIXI.extras.BitmapText(text, style);
        label.tint = color;
        return label;
    }

    public static getTextHUDSmall(text: string): Container {
        let style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.FONT_SIZE_HUD_SMALL }
        };
        let label = new PIXI.extras.BitmapText(text, style);
        label.tint = Colors.TEXT;
        return label;
    }

    public static getTitle(label: string): Container {
        let style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.FONT_SIZE_TITLE }
        };

        let title = new PIXI.extras.BitmapText(label, style);
        title.x = MagicValues.HALF_WIDTH;
        title.y = 50;
        title.pivot.x = title.width * 0.5;
        title.pivot.y = title.height * 0.5;
        title.tint = Colors.TITLE;
        return title;
    }

    public static getButtonLabel(label: string): Container {
        let style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.FONT_SIZE_BUTTON }
        };

        let title = new PIXI.extras.BitmapText(label, style);
        title.pivot.x = title.width * 0.5;
        title.pivot.y = title.height * 0.5;
        title.tint = Colors.BUTTON_ICON;
        return title;
    }

    /* BUTTONS */
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
    /* IMAGES */
    public static getImage(atlasKey: string): Sprite {
        let texture: Texture = AtlasKeys.getTexture(atlasKey);
        return new Sprite(texture);
    }

    /* BACKGROUNDS */
    public static getColorBackground(color = Colors.BACKGROUND_DARK): Graphics {
        return this.getColorBox(MagicValues.MAX_WIDTH, MagicValues.MAX_HEIGHT, color);
    }

    public static getColorBox(width: number, heigth: number, color = 0x00000): Graphics {
        let background: Graphics = new Graphics();
        background.beginFill(color);
        background.drawRect(0, 0, width, heigth);
        return background;
    }

    public static getColorBoxRounded(width: number, heigth: number, color = 0x00000): Graphics {
        let background: Graphics = new Graphics();
        background.beginFill(color);
        background.drawRoundedRect(0, 0, width, heigth, 5);
        return background;
    }

    public static getShadowBackground(alpha = 0.6): Graphics {
        let bg: Graphics = PixiFactory.getColorBackground(0x000000);
        bg.alpha = alpha;
        return bg;
    }

    public static getShadowHeader(alpha = 0.8): Graphics {
        let bg: Graphics = PixiFactory.getColorBox(MagicValues.MAX_WIDTH, 100);
        bg.alpha = alpha;
        return bg;
    }

    public static getIsometricBackground(length: number, color: number = 0x000000): Container {
        let background = new Container();
        let graphic: Graphics = PixiFactory.getColorBoxRounded(length, length, color);
        graphic.rotation = Math.PI / 4;
        background.addChild(graphic);
        background.scale.y = 0.5;
        return background;
    }

    /* GAME */
    public static getTileLabel(text: string, color: number): Container {
        let style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.FONT_SIZE_BUTTON }
        };
        let bmpText = new PIXI.extras.BitmapText(text, style);
        bmpText.tint = color;
        bmpText.pivot.x = bmpText.width * 0.5;
        bmpText.pivot.y = bmpText.height * 0.5;
        return bmpText;
    }
}
