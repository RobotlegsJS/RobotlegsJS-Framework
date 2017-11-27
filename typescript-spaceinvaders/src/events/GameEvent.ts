export class GameEvent extends Event {
    public static START_GAME_COMMAND = "startGameCommand";
    public static RETRY_GAME_COMMAND = "retryGameCommand";
    public static CREATE_LEVEL_COMMAND = "createLevelCommand";
    public static INCREASE_LEVEL_COMMAND = "increaseLevelCommand";

    public static GAME_OVER = "gameOver";

    public static RESUME = "resume";
    public static PAUSE = "pause";

    public static INCREASE_POINTS = "increasePoints";
    public static DECREASE_LIVES = "decreaseLives";

    public static UPDATE_HUD_DATA = "updateData";
    public static CLEAR_BATTLE_FIELD = "clearBattleField";
    public static UPDATE_BATTLE_FIELD = "updateBattleField";

    constructor(type: string) {
        super(type);
    }
}
