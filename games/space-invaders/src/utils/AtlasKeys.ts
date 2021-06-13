import { Texture, Loader, utils } from "pixi.js";

export class AtlasKeys {
    public static BUTTON_CANCEL: string = "button_cancel";
    public static BUTTON_CONFIG: string = "button_config";
    public static BUTTON_CONFIRM: string = "button_confirm";
    public static BUTTON_HOME: string = "button_home";
    public static BUTTON_PAUSE: string = "button_pause";
    public static BUTTON_RESET: string = "button_reset";
    public static BUTTON_RESUME: string = "button_resume";
    public static BUTTON_RETRY: string = "button_retry";
    public static BUTTON_START: string = "button_start";

    public static LOGO: string = "logo_spaceinvaders.png";
    public static LOGO_SETZER: string = "logo_setzer.png";
    public static LOGO_TYPESCRIPT: string = "./assets/logo_typescript.png";

    public static CANNON_HUD: string = "cannon_hud.png";

    public static CANNON: string = "cannon_frame_01.png";
    public static BULLET: string = "bullet_frame_01.png";
    public static ENEMY_01: string = "enemy_01";
    public static ENEMY_02: string = "enemy_02";
    public static ENEMY_03: string = "enemy_03";
    public static EXPLOSION: string = "explosion_frame";

    public static SPXML: string = "./assets/spaceinvaders-pixijs-atlas.json";
    public static SPPNG: string = "./assets/spaceinvaders-pixijs-atlas.png";

    private static _resources: any;
    private static _textureCache: any;

    public static update(): void {
        this._resources = Loader.shared.resources;
        this._textureCache = utils.TextureCache;
    }

    public static getTexture(atlasKey: string): Texture {
        return this._textureCache[atlasKey];
    }
}
