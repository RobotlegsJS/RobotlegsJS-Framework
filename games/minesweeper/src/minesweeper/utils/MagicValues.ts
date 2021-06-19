export class MagicValues {
    /* FONT */
    public static FONT_FAMILY: string = "SimpleSmallPixel7";

    public static TILE_WIDTH: number = 28;
    public static TILE_HEIGHT: number = 28;

    public static FONT_SIZE_TITLE: number = 38;
    public static FONT_SIZE_DEFAULT: number = 32;
    public static FONT_SIZE_HUD: number = 42;
    public static FONT_SIZE_BUTTON: number = 16;

    public static convertTime(secs: number): string {
        if (secs === Number.MAX_SAFE_INTEGER) {
            return "--:--";
        }

        let m = Math.floor((secs % 3600) / 60);
        let s = Math.max(Math.floor((secs % 3600) % 60), 0);

        return m.toString() + ":" + (s < 10 ? "0" + s.toString() : s.toString());
    }
}
