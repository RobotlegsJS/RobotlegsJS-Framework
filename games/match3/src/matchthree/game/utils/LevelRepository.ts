import { injectable } from "@robotlegsjs/core";
import { LevelInfo } from "../models/LevelInfo";

@injectable()
export class LevelsRepository {
    private _levels: LevelInfo[];

    public constructor() {
        this._setupLevels();
    }

    public getLevelInfoById(levelId: number): LevelInfo {
        return this._levels[levelId] || this._levels[0];
    }

    public updateHiScore(levelId: number, hiScore: number): void {
        this.getLevelInfoById(levelId).hiScore = hiScore;
    }

    public getLevels(): LevelInfo[] {
        return this._levels;
    }

    private _setupLevels(): void {
        this._levels = [];
        this._levels.push(new LevelInfo(0, 5, 7, LevelInfo.MOVE_TYPE, [4200, 5000, 6000], 10)); // 35
        this._levels.push(new LevelInfo(1, 6, 8, LevelInfo.TIMER_TYPE, [8000, 9000, 10000], 0, 80)); // 48
        this._levels.push(new LevelInfo(2, 6, 9, LevelInfo.MOVE_TYPE, [8000, 10000, 12000], 20)); // 54
        this._levels.push(new LevelInfo(3, 8, 6, LevelInfo.MOVE_TYPE, [8000, 9000, 10000], 15)); // 48
        this._levels.push(
            new LevelInfo(4, 7, 7, LevelInfo.TIMER_TYPE, [16000, 18000, 20000], 0, 120)
        ); // 49
        this._levels.push(
            new LevelInfo(5, 9, 5, LevelInfo.TIMER_TYPE, [42000, 48000, 55000], 0, 300)
        ); // 45
        this._levels.push(new LevelInfo(6, 5, 5, LevelInfo.MOVE_TYPE, [1800, 2600, 3200], 5)); // 25
        this._levels.push(new LevelInfo(7, 6, 8, LevelInfo.MOVE_TYPE, [16000, 21000, 26000], 30)); // 48
        this._levels.push(
            new LevelInfo(8, 6, 7, LevelInfo.TIMER_TYPE, [24500, 28200, 32000], 0, 180)
        ); // 45
    }
}
