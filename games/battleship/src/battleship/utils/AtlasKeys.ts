import { Texture } from "pixi.js";

export class AtlasKeys {
    public static ATLAS_XML = "./assets/battleship-pixijs.json";
    public static ATLAS_PNG = "./assets/battleship-pixijs.png";

    public static FONT_FNT = "./assets/fonts/SimpleSmallPixel7.fnt";

    /* BUTTONS */
    public static BUTTON = "button_background.png";

    /* ICONS */
    public static ICON_PAUSE = "icon_pause.png";
    public static ICON_RESUME = "icon_resume.png";
    public static ICON_RETRY = "icon_retry.png";
    public static ICON_HOME = "icon_home.png";

    /* SHIPS */
    public static SHIP_1 = "ship_2.png";
    public static SHIP_2 = "ship_3_1.png";
    public static SHIP_3 = "ship_3_2.png";
    public static SHIP_4 = "ship_4.png";
    public static SHIP_5 = "ship_5.png";

    /* Others */
    public static LOGO_BATTLESHIP = "logo_battleship.png";

    /* ATLAS PREFIX */
    public static LOGO_SETZER = "logo_setzer.png";
    public static LOGO_TYPESCRIPT = "./assets/logo_typescript.png";

    private static resources: any;
    private static textureCache: any;

    public static update(textureCache: any): void {
        this.textureCache = textureCache;
    }

    public static getShipTextureById(id: number): Texture {
        let textures = [this.SHIP_1, this.SHIP_2, this.SHIP_3, this.SHIP_4, this.SHIP_5];
        return this.textureCache[textures[id - 1]];
    }

    public static getTexture(atlasKey): Texture {
        return this.textureCache[atlasKey];
    }
}
