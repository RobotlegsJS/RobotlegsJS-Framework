export class MagicValues {
    /* FONT */
    public static FONT_FAMILY = "SimpleSmallPixel7";

    public static TILE_WIDTH = 28;
    public static TILE_HEIGHT = 28;

    public static FONT_SIZE_TITLE = 38;
    public static FONT_SIZE_DEFAULT = 32;
    public static FONT_SIZE_HUD = 42;
    public static FONT_SIZE_BUTTON = 16;

    public static convertTime(secs: number): string {
        if (secs === Number.MAX_SAFE_INTEGER) {
            return "--:--";
        }
        let m = Math.floor((secs % 3600) / 60);
        let s = Math.max(Math.floor((secs % 3600) % 60), 0);
        return m.toString() + ":" + (s < 10 ? "0" + s.toString() : s.toString());
    }
}
