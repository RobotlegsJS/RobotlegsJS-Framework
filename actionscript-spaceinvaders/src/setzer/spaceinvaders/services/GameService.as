package setzer.spaceinvaders.services
{
	import setzer.spaceinvaders.events.GameEvent;

	import starling.events.EventDispatcher;

	public class GameService
	{
		[Inject]
		public var dispatcher:EventDispatcher;

		//Commands
		public function createLevel():void
		{
			dispatcher.dispatchEventWith( GameEvent.CREATE_LEVEL_COMMAND );
		}

		public function startCommand():void
		{
			dispatcher.dispatchEventWith( GameEvent.START_GAME_COMMAND );
		}

		public function retryCommand():void
		{
			dispatcher.dispatchEventWith( GameEvent.RETRY_GAME_COMMAND );
		}

		public function increaseLevel():void
		{
			dispatcher.dispatchEvent( new GameEvent( GameEvent.INCREASE_LEVEL_COMMAND ) );
		}

		public function increasePoints():void
		{
			dispatcher.dispatchEvent( new GameEvent( GameEvent.INCREASE_POINTS ) );
		}

		public function decreaseLives():void
		{
			dispatcher.dispatchEvent( new GameEvent( GameEvent.DECREASE_LIVES ) );
		}
		//Game
		public function pause():void
		{
			dispatcher.dispatchEventWith( GameEvent.PAUSE );
		}

		public function resume():void
		{
			dispatcher.dispatchEventWith( GameEvent.RESUME );
		}

		public function gameOver():void
		{
			dispatcher.dispatchEventWith( GameEvent.GAME_OVER );
		}

		//UPDATE
		public function updateHUDData():void
		{
			dispatcher.dispatchEvent( new GameEvent( GameEvent.UPDATE_HUD_DATA ) );
		}

		public function clearBattleField():void
		{
			dispatcher.dispatchEvent( new GameEvent( GameEvent.CLEAR_BATTLE_FIELD ) );
		}

		public function updateBattleField():void
		{
			dispatcher.dispatchEvent( new GameEvent( GameEvent.UPDATE_BATTLE_FIELD ) );
		}

	}
}
