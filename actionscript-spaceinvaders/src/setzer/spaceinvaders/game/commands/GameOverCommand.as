package setzer.spaceinvaders.game.commands
{
	import robotlegs.bender.extensions.commandCenter.api.ICommand;

	import setzer.spaceinvaders.utils.SharedObjectManager;
	import setzer.spaceinvaders.game.models.GameModel;
	import setzer.spaceinvaders.game.models.GameStatus;
	import setzer.spaceinvaders.services.FlowService;

	public class GameOverCommand implements ICommand
	{
		[Inject]
		public var model:GameModel;

		[Inject]
		public var flowService:FlowService;

		[Inject]
		public var sharedObjectManager:SharedObjectManager;

		public function execute():void
		{
			model.status = GameStatus.GAMEOVER;

			sharedObjectManager.updateHighScore();

			flowService.showGameOverPopup();
		}
	}
}
