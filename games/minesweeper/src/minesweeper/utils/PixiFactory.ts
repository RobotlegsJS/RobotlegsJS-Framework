import { BitmapText, Container, Graphics, Sprite, Texture } from "pixi.js";

import { CustomButton } from "./../views/components/CustomButton";
import { AtlasKeys } from "./AtlasKeys";
import { Colors } from "./Colors";
import { MagicValues } from "./MagicValues";
import { ViewPortSize } from "./ViewPortSize";

export class PixiFactory {
    /* TEXTFIELDS */
    public static getText(text: string): Container {
        const style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.FONT_SIZE_DEFAULT }
        };
        const label = new BitmapText(text, style);
        label.tint = Colors.TEXT;
        return label;
    }
    public static getHUDText(text: string): Container {
        const style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.FONT_SIZE_HUD }
        };
        const label = new BitmapText(text, style);
        label.tint = Colors.TITLE;
        return label;
    }
    public static getTitle(label: string): Container {
        const style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.FONT_SIZE_TITLE }
        };

        const title = new BitmapText(label, style);
        title.x = ViewPortSize.HALF_WIDTH;
        title.y = 50;
        title.pivot.x = title.width * 0.5;
        title.pivot.y = title.height * 0.5;
        title.tint = Colors.TITLE;
        return title;
    }
    public static getButtonLabel(label: string): Container {
        const style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.FONT_SIZE_BUTTON }
        };

        const title = new BitmapText(label, style);
        title.pivot.x = title.width * 0.5;
        title.pivot.y = title.height * 0.5;
        title.tint = Colors.BUTTON_ICON;
        return title;
    }
    /* BUTTONS */
    public static getIconButton(icon: string): CustomButton {
        const button: CustomButton = new CustomButton();
        button.setIco(icon);
        return button;
    }
    public static getTextButton(icon: string): CustomButton {
        const button: CustomButton = new CustomButton();
        button.setText(icon);
        return button;
    }
    /* IMAGES */
    public static getImage(atlasKey: string): Sprite {
        const texture: Texture = AtlasKeys.getTexture(atlasKey);
        return new Sprite(texture);
    }
    /* BACKGROUNDS */
    public static getColorBackground(color = Colors.BACKGROUND_DARK): Graphics {
        return this.getColorBox(ViewPortSize.MAX_WIDTH, ViewPortSize.MAX_HEIGHT, color);
    }
    public static getColorBox(width: number, heigth: number, color = 0x00000): Graphics {
        const background: Graphics = new Graphics();
        background.beginFill(color);
        background.drawRect(0, 0, width, heigth);
        return background;
    }
    public static getShadowBackground(alpha = 0.6): Graphics {
        const bg: Graphics = PixiFactory.getColorBackground(0x000000);
        bg.alpha = alpha;
        return bg;
    }
    public static getShadowHeader(alpha = 0.8): Graphics {
        const bg: Graphics = PixiFactory.getColorBox(ViewPortSize.MAX_WIDTH, 100);
        bg.alpha = alpha;
        return bg;
    }
    /* GAME */
    public static getTileLabel(text: string, color: number): Container {
        const style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.FONT_SIZE_BUTTON }
        };
        const bmpText = new BitmapText(text, style);
        bmpText.tint = color;
        bmpText.pivot.x = bmpText.width * 0.5;
        bmpText.pivot.y = bmpText.height * 0.5;
        return bmpText;
    }
}
