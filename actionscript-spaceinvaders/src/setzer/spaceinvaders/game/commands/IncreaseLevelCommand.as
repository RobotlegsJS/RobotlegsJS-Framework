package setzer.spaceinvaders.game.commands
{
	import robotlegs.bender.extensions.commandCenter.api.ICommand;

	import setzer.spaceinvaders.events.GameEvent;
	import setzer.spaceinvaders.game.models.GameModel;
	import setzer.spaceinvaders.services.GameService;

	public class IncreaseLevelCommand implements ICommand
	{

		[Inject]
		public var model:GameModel;

		[Inject]
		public var event:GameEvent;

		[Inject]
		public var gameService:GameService;

		public function execute():void
		{
			model.level+=1;
			gameService.clearBattleField();
			gameService.updateHUDData();
			gameService.createLevel();
		}
	}
}
