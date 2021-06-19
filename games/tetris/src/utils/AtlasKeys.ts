import { Loader, Texture, utils } from "pixi.js";

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

    public static LOGO: string = "logo_tetris.png";
    public static LOGO_SETZER: string = "logo_setzer.png";
    public static LOGO_TYPESCRIPT: string = "./assets/logo_typescript.png";

    public static GRID: string = "grid.png";
    public static NEXT_TILE: string = "next_tile.png";

    /* TILES */
    public static TILE_01: string = "tile_01.png";
    public static TILE_02: string = "tile_02.png";
    public static TILE_03: string = "tile_03.png";
    public static TILE_04: string = "tile_04.png";
    public static TILE_05: string = "tile_05.png";
    public static TILE_06: string = "tile_06.png";
    public static TILE_07: string = "tile_07.png";
    public static TILE_08: string = "tile_08.png";

    public static ATLAS_XML: string = "./assets/tetris-pixijs-atlas.json";
    public static ATLAS_PNG: string = "./assets/tetris-pixijs-atlas.png";

    private static _resources: any;
    private static _textureCache: any;

    public static update(): void {
        this._resources = Loader.shared.resources;
        this._textureCache = utils.TextureCache;
    }

    public static getTexture(atlasKey: any): Texture {
        return this._textureCache[atlasKey];
    }

    public static getTileTexture(id: number): Texture {
        const ids: string[] = [
            this.TILE_01,
            this.TILE_02,
            this.TILE_03,
            this.TILE_04,
            this.TILE_05,
            this.TILE_06,
            this.TILE_07,
            this.TILE_08
        ];
        return this._textureCache[ids[id] || ids[0]];
    }
}
