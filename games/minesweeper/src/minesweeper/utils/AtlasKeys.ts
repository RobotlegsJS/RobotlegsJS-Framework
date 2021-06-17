import { Texture } from "pixi.js";

export class AtlasKeys {
    public static ATLAS_XML: string = "./assets/minesweeper-pixijs.json";
    public static ATLAS_PNG: string = "./assets/minesweeper-pixijs.png";

    public static FONT_FNT: string = "./assets/fonts/SimpleSmallPixel7.fnt";

    /* BUTTONS */
    public static BUTTON: string = "button_background.png";

    /* ICONS */
    public static ICON_MINE: string = "icon_mine.png";
    public static ICON_FLAG: string = "icon_flag.png";
    public static ICON_FLAG_LARGE: string = "icon_flag_large.png";

    public static ICON_PAUSE: string = "icon_pause.png";
    public static ICON_RESUME: string = "icon_resume.png";
    public static ICON_RETRY: string = "icon_retry.png";
    public static ICON_HOME: string = "icon_home.png";

    /* Others */
    public static LOGO_MINESWEEPER: string = "logo_minesweeper.png";

    /* ATLAS PREFIX */
    public static LOGO_SETZER: string = "logo_setzer.png";
    public static LOGO_TYPESCRIPT: string = "./assets/logo_typescript.png";

    private static _resources: any;
    private static _textureCache: any;

    public static update(textureCache: any): void {
        this._textureCache = textureCache;
    }

    public static getTexture(atlasKey: any): Texture {
        return this._textureCache[atlasKey];
    }
}
