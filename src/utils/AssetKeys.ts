import { Texture } from "pixi.js";

export class AssetKeys {
    public static ATLAS_XML = "./assets/atlas.json";
    public static ATLAS_PNG = "./assets/atlas.png";

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
