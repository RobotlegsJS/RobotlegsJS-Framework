import { Texture } from "pixi.js";

export class AtlasKeys {
    public static ATLAS_XML: string = "./assets/battleship-pixijs.json";
    public static ATLAS_PNG: string = "./assets/battleship-pixijs.png";

    public static FONT_FNT: string = "./assets/fonts/SimpleSmallPixel7.fnt";

    /* BUTTONS */
    public static BUTTON: string = "button_background.png";

    /* ICONS */
    public static ICON_PAUSE: string = "icon_pause.png";
    public static ICON_RESUME: string = "icon_resume.png";
    public static ICON_RETRY: string = "icon_retry.png";
    public static ICON_HOME: string = "icon_home.png";

    /* SHIPS */
    public static SHIP_1: string = "ship_2.png";
    public static SHIP_2: string = "ship_3_1.png";
    public static SHIP_3: string = "ship_3_2.png";
    public static SHIP_4: string = "ship_4.png";
    public static SHIP_5: string = "ship_5.png";

    /* Others */
    public static LOGO_BATTLESHIP: string = "logo_battleship.png";

    /* ATLAS PREFIX */
    public static LOGO_SETZER: string = "logo_setzer.png";
    public static LOGO_TYPESCRIPT: string = "./assets/logo_typescript.png";

    private static _resources: any;
    private static _textureCache: any;

    public static update(textureCache: any): void {
        this._textureCache = textureCache;
    }

    public static getShipTextureById(id: number): Texture {
        let textures = [this.SHIP_1, this.SHIP_2, this.SHIP_3, this.SHIP_4, this.SHIP_5];
        return this._textureCache[textures[id - 1]];
    }

    public static getTexture(atlasKey: any): Texture {
        return this._textureCache[atlasKey];
    }
}
