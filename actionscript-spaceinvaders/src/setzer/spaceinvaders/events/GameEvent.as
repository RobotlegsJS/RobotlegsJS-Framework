package setzer.spaceinvaders.events
{
	import starling.events.Event;

	public class GameEvent extends Event
	{
		public static const START_GAME_COMMAND:String = "startGameCommand";
		public static const RETRY_GAME_COMMAND:String = "retryGameCommand";
		public static const CREATE_LEVEL_COMMAND:String = "createLevelCommand";
		public static const INCREASE_LEVEL_COMMAND:String = "increaseLevelCommand";

		public static const GAME_OVER:String = "gameOver";

		public static const RESUME:String = "resume";
		public static const PAUSE:String = "pause";

		public static const INCREASE_POINTS:String = "increasePoints";
		public static const DECREASE_LIVES:String = "decreaseLives";

		public static const UPDATE_HUD_DATA:String = "updateData";
		public static const CLEAR_BATTLE_FIELD:String = "clearBattleField";
		public static const UPDATE_BATTLE_FIELD:String = "updateBattleField";

		public function GameEvent( type:String, bubbles:Boolean = false, data:Object = null )
		{
			super( type, bubbles, data );
		}
	}
}
