import { Texture } from "pixi.js";

export class AssetKeys {
    public static ATLAS_XML = "./assets/atlas.json";
    public static ATLAS_PNG = "./assets/atlas.png";

    public static LOGO_TYPESCRIPT = "./assets/logo_typescript.png";

    public static PRIZE_01 = "bitbucket.png";
    public static PRIZE_02 = "chai.png";
    public static PRIZE_03 = "git.png";
    public static PRIZE_04 = "github.png";
    public static PRIZE_05 = "html5.png";
    public static PRIZE_06 = "javascript.png";
    public static PRIZE_07 = "mocha.png";
    public static PRIZE_08 = "node.png";
    public static PRIZE_09 = "npm.png";
    public static PRIZE_10 = "palidor.png";
    public static PRIZE_11 = "pixijs.png";
    public static PRIZE_12 = "prettier.png";
    public static PRIZE_13 = "profile.png";
    public static PRIZE_14 = "robotlegsjs.png";
    public static PRIZE_15 = "setzer.png";
    public static PRIZE_16 = "texturepacker.png";
    public static PRIZE_17 = "typescript.png";
    public static PRIZE_18 = "vscode.png";
    public static PRIZE_19 = "webpack.png";
    public static PRIZE_20 = "yarn.png";

    private static resources: any;
    private static textureCache: any;

    public static update(textureCache: any): void {
        this.textureCache = textureCache;
    }
    public static getTexture(atlasKey): Texture {
        return this.textureCache[atlasKey];
    }
}
