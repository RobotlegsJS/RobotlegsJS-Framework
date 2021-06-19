import { Texture } from "pixi.js";

export class AssetKeys {
    public static ATLAS_XML: string = "./assets/atlas.json";
    public static ATLAS_PNG: string = "./assets/atlas.png";

    public static LOGO_TYPESCRIPT: string = "./assets/logo_typescript.png";

    public static PRIZE_01: string = "bitbucket.png";
    public static PRIZE_02: string = "chai.png";
    public static PRIZE_03: string = "git.png";
    public static PRIZE_04: string = "github.png";
    public static PRIZE_05: string = "html5.png";
    public static PRIZE_06: string = "javascript.png";
    public static PRIZE_07: string = "mocha.png";
    public static PRIZE_08: string = "node.png";
    public static PRIZE_09: string = "npm.png";
    public static PRIZE_10: string = "palidor.png";
    public static PRIZE_11: string = "pixijs.png";
    public static PRIZE_12: string = "prettier.png";
    public static PRIZE_13: string = "profile.png";
    public static PRIZE_14: string = "robotlegsjs.png";
    public static PRIZE_15: string = "setzer.png";
    public static PRIZE_16: string = "texturepacker.png";
    public static PRIZE_17: string = "typescript.png";
    public static PRIZE_18: string = "vscode.png";
    public static PRIZE_19: string = "webpack.png";
    public static PRIZE_20: string = "yarn.png";

    private static _resources: any;
    private static _textureCache: any;

    public static update(textureCache: any): void {
        this._textureCache = textureCache;
    }

    public static getTexture(atlasKey: any): Texture {
        return this._textureCache[atlasKey];
    }
}
