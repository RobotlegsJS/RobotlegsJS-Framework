import { Texture } from "pixi.js";

export class AtlasKeys {
    public static ATLAS_XML = "./assets/minesweeper-pixijs.json";
    public static ATLAS_PNG = "./assets/minesweeper-pixijs.png";

    public static FONT_FNT = "./assets/fonts/SimpleSmallPixel7.fnt";

    /* BUTTONS */
    public static BUTTON_SMALL = "button_small";
    public static BUTTON_SMALL_DANGER = "button_small_danger";
    public static BUTTON_MEDIUM = "button_medium";

    /* ICONS */
    public static ICON_PAUSE = "icon_pause.png";
    public static ICON_RESUME = "icon_resume.png";
    public static ICON_DELETE = "icon_delete.png";
    public static ICON_RETRY = "icon_retry.png";
    public static ICON_CONFIG = "icon_config.png";
    public static ICON_HOME = "icon_home.png";

    public static ICON_CONFIRM = "icon_confirm.png";
    public static ICON_CLOSE = "icon_close.png";

    /* Others */
    public static LOGO_MINESWEEPER = "logo_minesweeper.png";

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
