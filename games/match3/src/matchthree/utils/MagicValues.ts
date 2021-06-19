export class MagicValues {
    /* FONT */
    public static FONT_FAMILY: string = "BerlinSansFBDemi";

    public static SHARED_OBJECT_NAME: string = "Match3Palidor";

    public static SIZE_TITLE: number = 42;
    public static SIZE_DEFAULT: number = 32;
    public static SIZE_HUD: number = 22;

    public static BORDER_OFFSET: number = 18;
    public static BORDER_OFFSET_BOTTOM: number = 120;
    public static BORDER_OFFSET_POPUP: number = 60;
    public static BORDER_OFFSET_HUD: number = 10;

    public static convertTime(secs: number): string {
        const m = Math.floor((secs % 3600) / 60);
        const s = Math.max(Math.floor((secs % 3600) % 60), 0);
        return m.toString() + ": " + (s < 10 ? "0" + s.toString() : s.toString());
    }
}
