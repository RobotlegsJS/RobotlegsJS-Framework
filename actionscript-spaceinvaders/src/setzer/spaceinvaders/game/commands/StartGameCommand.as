package setzer.spaceinvaders.game.commands
{
	import robotlegs.bender.extensions.commandCenter.api.ICommand;

	import setzer.spaceinvaders.utils.SharedObjectManager;
	import setzer.spaceinvaders.game.models.GameModel;
	import setzer.spaceinvaders.services.FlowService;
	import setzer.spaceinvaders.services.GameService;

	public class StartGameCommand implements ICommand
	{
		[Inject]
		public var gameModel:GameModel;

		[Inject]
		public var gameService:GameService;

		[Inject]
		public var flowService:FlowService;

		[Inject]
		public var sharedObjectManager:SharedObjectManager;

		public function execute():void
		{
			sharedObjectManager.getExternalData();

			gameModel.clear();

			gameService.clearBattleField();
			gameService.updateHUDData();
			gameService.createLevel();
		}
	}
}
