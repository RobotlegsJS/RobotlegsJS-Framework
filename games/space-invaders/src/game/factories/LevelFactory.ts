import { LevelData } from "./../../models/LevelData";
import { LevelModel } from "./../../models/LevelModel";
import { ViewPortSize } from "./../../utils/ViewPortSize";
import { CannonDisplay } from "./../displays/CannonDisplay";
import { Entity } from "./../entities/Entity";
import { EntityPool } from "./../utils/EntityPool";

export class LevelFactory {
    private static _maps: LevelData[];

    public static setupLevels(): void {
        this._maps = [];
        this._maps[0] = new LevelData(7, 5);
        this._maps[1] = new LevelData(3, 1);
        this._maps[2] = new LevelData(3, 2);
        this._maps[3] = new LevelData(4, 2);
        this._maps[4] = new LevelData(4, 3);
        this._maps[5] = new LevelData(5, 2);
        this._maps[6] = new LevelData(5, 3);
        this._maps[7] = new LevelData(6, 3);
        this._maps[8] = new LevelData(6, 4);
        this._maps[9] = new LevelData(7, 4);
    }
    public static getEmptyMap(numCols = 5, numRows = 3): number[][] {
        const result: number[][] = [];
        let vectorRow: number[];
        const ids = [Entity.ENEMY_1, Entity.ENEMY_2, Entity.ENEMY_3];

        for (let row = 0; row < numRows; row++) {
            vectorRow = new Array<number>();

            for (let col = 0; col < numCols; col++) {
                vectorRow.push(ids[Math.floor(row * 3 / numRows)]);
            }
            result.push(vectorRow);
        }
        return result;
    }
    public static generateLevel(levelModel: LevelModel, level: number): void {
        levelModel.reset();

        const map: number[][] = this.getLevelMapByLevel(level);
        let enemy: Entity;

        for (let row = 0; row < map.length; row++) {
            for (let col = 0; col < map[row].length; col++) {
                if (map[row][col] === 0) {
                    continue;
                }
                enemy = EntityPool.getEntity(map[row][col]);
                enemy.x = ViewPortSize.HALF_WIDTH + 30 * col - (map[row].length - 1) * 15;
                enemy.y = 20 * row + 120;
                enemy.applyPosition();
                levelModel.addEnemy(enemy);
            }
        }
        const cannon: Entity = EntityPool.getEntity(Entity.CANNON);
        cannon.x = ViewPortSize.HALF_WIDTH;
        cannon.y = ViewPortSize.MAX_HEIGHT - 100;
        cannon.display = new CannonDisplay();
        cannon.applyPosition();
        levelModel.setCannon(cannon);
    }
    private static getLevelMapByLevel(level: number): number[][] {
        const levelData: LevelData = this._maps[level] || this._maps[0];
        levelData.map = this.getEmptyMap(levelData.cols, levelData.rows);

        return levelData.map;
    }
}
