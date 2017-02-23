package setzer.spaceinvaders.game.commands
{
	import robotlegs.bender.extensions.commandCenter.api.ICommand;

	import setzer.spaceinvaders.events.GameEvent;
	import setzer.spaceinvaders.game.models.GameModel;
	import setzer.spaceinvaders.services.GameService;

	public class DecreaseLivesCommand implements ICommand
	{

		[Inject]
		public var model:GameModel;

		[Inject]
		public var event:GameEvent;

		[Inject]
		public var gameService:GameService;

		public function execute():void
		{
			model.lives -= 1;
			gameService.updateHUDData();

			if ( model.lives == 0 )
				gameService.gameOver();
		}
	}
}
