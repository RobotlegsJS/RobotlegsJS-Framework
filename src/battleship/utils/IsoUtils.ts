export class IsoUtils {
    public static toIso(col: number, row: number): any {
        let base = 16;
        let x = base * col - base * row;
        let y = (base * col + base * row) / 2;
        return { x, y };
    }
}
