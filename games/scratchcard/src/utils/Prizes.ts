import { AssetKeys } from "./AssetKeys";

export class Prizes {
    public static ALL: string[] = [
        AssetKeys.PRIZE_01,
        AssetKeys.PRIZE_02,
        AssetKeys.PRIZE_03,
        AssetKeys.PRIZE_04,
        AssetKeys.PRIZE_05,
        AssetKeys.PRIZE_06,
        AssetKeys.PRIZE_07,
        AssetKeys.PRIZE_08,
        AssetKeys.PRIZE_09,
        AssetKeys.PRIZE_10,
        AssetKeys.PRIZE_11,
        AssetKeys.PRIZE_12,
        AssetKeys.PRIZE_13,
        AssetKeys.PRIZE_14,
        AssetKeys.PRIZE_15,
        AssetKeys.PRIZE_16,
        AssetKeys.PRIZE_17,
        AssetKeys.PRIZE_18,
        AssetKeys.PRIZE_19,
        AssetKeys.PRIZE_20
    ];

    public static getNine(): string[] {
        const result = [];
        for (let i = 0; i < 9; i++) {
            const rnd = Math.floor(Math.random() * Prizes.ALL.length);
            result.push(Prizes.ALL[rnd]);
        }
        return result;
    }
}
