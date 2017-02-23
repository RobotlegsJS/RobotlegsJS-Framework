package setzer.spaceinvaders.game.commands
{
	import robotlegs.bender.extensions.commandCenter.api.ICommand;

	import setzer.spaceinvaders.game.factories.LevelFactory;
	import setzer.spaceinvaders.game.models.GameModel;
	import setzer.spaceinvaders.game.models.GameStatus;
	import setzer.spaceinvaders.game.models.LevelModel;
	import setzer.spaceinvaders.services.FlowService;
	import setzer.spaceinvaders.services.GameService;

	public class CreateLevelCommand implements ICommand
	{
		[Inject]
		public var gameModel:GameModel;

		[Inject]
		public var levelModel:LevelModel;

		[Inject]
		public var gameService:GameService;

		[Inject]
		public var flowService:FlowService;

		public function execute():void
		{
			LevelFactory.generateLevel( levelModel, gameModel.level );

			gameService.updateBattleField();
			gameService.updateHUDData();


			if ( gameModel.status )
				flowService.showStartingPopup(); else
				flowService.showInfoPopup();

			gameModel.status = GameStatus.GAME;
		}
	}
}
