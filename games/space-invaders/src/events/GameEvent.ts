export class GameEvent extends Event {
    public static START_GAME_COMMAND: string = "startGameCommand";
    public static RETRY_GAME_COMMAND: string = "retryGameCommand";
    public static CREATE_LEVEL_COMMAND: string = "createLevelCommand";
    public static INCREASE_LEVEL_COMMAND: string = "increaseLevelCommand";

    public static GAME_OVER: string = "gameOver";

    public static RESUME: string = "resume";
    public static PAUSE: string = "pause";

    public static INCREASE_POINTS: string = "increasePoints";
    public static DECREASE_LIVES: string = "decreaseLives";

    public static UPDATE_HUD_DATA: string = "updateData";
    public static CLEAR_BATTLE_FIELD: string = "clearBattleField";
    public static UPDATE_BATTLE_FIELD: string = "updateBattleField";

    public constructor(type: string) {
        super(type);
    }
}
