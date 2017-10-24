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

    public static getTexture(atlasKey): Texture {
        return this.textureCache[atlasKey];
    }
}
