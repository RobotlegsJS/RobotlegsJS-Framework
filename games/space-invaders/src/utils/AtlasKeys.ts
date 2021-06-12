import { Texture } from "pixi.js";

export class AtlasKeys {
    public static BUTTON_CANCEL = "button_cancel";
    public static BUTTON_CONFIG = "button_config";
    public static BUTTON_CONFIRM = "button_confirm";
    public static BUTTON_HOME = "button_home";
    public static BUTTON_PAUSE = "button_pause";
    public static BUTTON_RESET = "button_reset";
    public static BUTTON_RESUME = "button_resume";
    public static BUTTON_RETRY = "button_retry";
    public static BUTTON_START = "button_start";

    public static LOGO = "logo_spaceinvaders.png";
    public static LOGO_SETZER = "logo_setzer.png";
    public static LOGO_TYPESCRIPT = "./assets/logo_typescript.png";

    public static CANNON_HUD = "cannon_hud.png";

    public static CANNON = "cannon_frame_01.png";
    public static BULLET = "bullet_frame_01.png";
    public static ENEMY_01 = "enemy_01";
    public static ENEMY_02 = "enemy_02";
    public static ENEMY_03 = "enemy_03";
    public static EXPLOSION = "explosion_frame";

    public static SPXML = "./assets/spaceinvaders-pixijs-atlas.json";
    public static SPPNG = "./assets/spaceinvaders-pixijs-atlas.png";

    private static resources: any;
    private static textureCache: any;

    public static update(): void {
        this.resources = PIXI.loader.resources;
        this.textureCache = PIXI.utils.TextureCache;
    }
    public static getTexture(atlasKey: string): Texture {
        return this.textureCache[atlasKey];
    }
}
