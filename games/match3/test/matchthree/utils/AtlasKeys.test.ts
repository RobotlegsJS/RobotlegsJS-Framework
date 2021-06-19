import { assert } from "chai";
import { Sprite, TilingSprite } from "pixi.js";
import { AtlasKeys } from "../../../src/matchthree/utils/AtlasKeys";
import "../../entry";

describe("AtlasKeys", () => {
    it("GetTexture", () => {
        const key = "./assets/atlas/game/piece_normal_3.png";
        const sprite: Sprite = TilingSprite.from(key);
        const textureCache: any = { "./assets/atlas/game/piece_normal_3.png": sprite.texture };
        AtlasKeys.update(textureCache);
        assert.equal(sprite.texture, AtlasKeys.getTexture(key));
    });
});
