package setzer.spaceinvaders.mediators
{
	import robotlegs.bender.extensions.palidor.starlingIntegration.starlingViewMap.impl.StarlingMediator;

	import setzer.spaceinvaders.services.FlowService;
	import setzer.spaceinvaders.services.GameService;
	import setzer.spaceinvaders.views.GameView;

	public class GameViewMediator extends StarlingMediator
	{
		[Inject]
		public var view:GameView;

		[Inject]
		public var gameService:GameService;

		[Inject]
		public var flowService:FlowService;

		override public function initialize():void
		{
			view.createComponents();

			gameService.startCommand();
		}

		override public function destroy():void
		{
			view.destroy();
		}
	}
}
