export class MagicValues {
    /* FONT */
/*     public static FONT_FAMILY = "BerlinSansFBDemi"; */
    public static FONT_FAMILY = "SimpleSmallPixel7";

    public static TILE_WIDTH = 28;
    public static TILE_HEIGHT = 28;

    public static SIZE_TITLE = 38;
    public static SIZE_DEFAULT = 32;
    public static SIZE_HUD = 22;
    public static SIZE_BUTTON = 16;

    public static BORDER_OFFSET = 18;
    public static BORDER_OFFSET_BOTTOM = 120;
    public static BORDER_OFFSET_POPUP = 60;
    public static BORDER_OFFSET_HUD = 10;

    public static convertTime(secs: number): string {
        let m = Math.floor((secs % 3600) / 60);
        let s = Math.max(Math.floor((secs % 3600) % 60), 0);
        return (m.toString() + ":" + (s < 10 ? "0" + s.toString() : s.toString()));
    }
}
