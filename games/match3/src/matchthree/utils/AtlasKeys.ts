import { Texture } from "pixi.js";

export class AtlasKeys {
    public static ATLAS_XML: string = "./assets/matchthree-pixijs-atlas.json";
    public static ATLAS_PNG: string = "./assets/matchthree-pixijs-atlas.png";

    public static FONT_FNT: string = "./assets/fonts/BerlinSansDemi.fnt";

    /* ATLAS PREFIX */
    public static LOGO_SETZER: string = "logo_setzer.png";
    public static LOGO_TYPESCRIPT: string = "./assets/logo_typescript.png";

    public static PIECE_NORMAL: string = "piece_normal";
    public static PIECE_ROW: string = "piece_row";
    public static PIECE_COL: string = "piece_col";
    public static PIECE_RAINBOW: string = "piece_rainbow";

    /* BUTTONS */
    public static BUTTON_SMALL: string = "button_small";
    public static BUTTON_SMALL_DANGER: string = "button_small_danger";
    public static BUTTON_MEDIUM: string = "button_medium";

    /* ICONS */
    public static ICON_LEVEL_SELECT: string = "icon_level_select.png";
    public static ICON_PAUSE: string = "icon_pause.png";
    public static ICON_RESUME: string = "icon_resume.png";
    public static ICON_DELETE: string = "icon_delete.png";
    public static ICON_RETRY: string = "icon_retry.png";
    public static ICON_CONFIG: string = "icon_config.png";
    public static ICON_HOME: string = "icon_home.png";

    public static ICON_CONFIRM: string = "icon_confirm.png";
    public static ICON_CLOSE: string = "icon_close.png";

    /* Others */
    public static POPUP_STAR: string = "popup_star";
    public static STAR_HUD_DISPLAY: string = "star_hud_display_";
    public static LEVEL_SELECT_SMALL_STAR: string = "level_select_small_star";
    public static LOGO_MATCH_THREE: string = "logo_matchthree.png";

    public static BG_IMAGE: string = "./assets/backgrounds/background.png";
    public static BG_POPUP_IMAGE: string = "./assets/backgrounds/background_popup.png";
    public static BG_HUD_IMAGE: string = "./assets/backgrounds/background_hud.png";

    private static _resources: any;
    private static _textureCache: any;

    public static update(textureCache: any): void {
        this._textureCache = textureCache;
    }

    public static getTexture(atlasKey: any): Texture {
        return this._textureCache[atlasKey];
    }
}
