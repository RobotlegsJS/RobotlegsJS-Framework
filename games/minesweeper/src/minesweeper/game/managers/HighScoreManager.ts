import { injectable } from "@robotlegsjs/core";

import { Texts } from "./../../utils/Texts";

@injectable()
export class HighScoreManager {
    private _gameID = "Minesweeper";

    public save(levelId: string, value: number) {
        try {
            const data = this.getData();
            data[levelId] = Math.min(value, data[levelId]);
            window.localStorage.setItem(this._gameID, JSON.stringify(data));
            console.log("update score:", levelId, ":", value);
        } catch (err) {
            console.log(err);
        }
    }

    public getHighScore(levelId: string): number {
        const data = this.getData();
        return data[levelId];
    }
    public getAllHighScore(): any {
        const data = this.getData();
        return data;
    }
    public getData(): any {
        let data = {};
        try {
            const dataStr = window.localStorage.getItem(this._gameID);
            if (dataStr === null) {
                data = this.createData();
                window.localStorage.setItem(this._gameID, JSON.stringify(data));
                console.log("saving a empty object");
            } else {
                data = JSON.parse(dataStr);
                console.log("loaded: ", dataStr);
            }
        } catch (err) {
            console.log(err);
        }
        return data;
    }
    private createData(): any {
        const data = {};
        data[Texts.EASY] = Number.MAX_SAFE_INTEGER;
        data[Texts.NORMAL] = Number.MAX_SAFE_INTEGER;
        data[Texts.HARD] = Number.MAX_SAFE_INTEGER;
        data[Texts.CUSTOM] = Number.MAX_SAFE_INTEGER;
        return data;
    }
}
