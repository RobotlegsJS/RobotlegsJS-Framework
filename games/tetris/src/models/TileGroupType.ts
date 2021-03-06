export class TileGroupType {
    public static TYPE_I: number = 0;
    public static TYPE_Z: number = 1;
    public static TYPE_S: number = 2;
    public static TYPE_T: number = 3;
    public static TYPE_L: number = 4;
    public static TYPE_J: number = 5;
    public static TYPE_O: number = 6;

    private static _TYPE_I_ARRAY: number[] = [1, 3, 5, 7];
    private static _TYPE_Z_ARRAY: number[] = [2, 4, 5, 7];
    private static _TYPE_S_ARRAY: number[] = [3, 5, 4, 6];
    private static _TYPE_T_ARRAY: number[] = [3, 5, 4, 7];
    private static _TYPE_L_ARRAY: number[] = [2, 3, 5, 7];
    private static _TYPE_J_ARRAY: number[] = [3, 5, 7, 6];
    private static _TYPE_O_ARRAY: number[] = [2, 3, 4, 5];

    public static getTypeArray(type: number): number[] {
        const dic: Map<number, number[]> = new Map<number, number[]>();
        dic.set(this.TYPE_I, this._TYPE_I_ARRAY);
        dic.set(this.TYPE_Z, this._TYPE_Z_ARRAY);
        dic.set(this.TYPE_S, this._TYPE_S_ARRAY);
        dic.set(this.TYPE_T, this._TYPE_T_ARRAY);
        dic.set(this.TYPE_L, this._TYPE_L_ARRAY);
        dic.set(this.TYPE_J, this._TYPE_J_ARRAY);
        dic.set(this.TYPE_O, this._TYPE_O_ARRAY);

        return dic.get(type);
    }
}
