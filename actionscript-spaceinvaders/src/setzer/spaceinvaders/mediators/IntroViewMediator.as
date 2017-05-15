package setzer.spaceinvaders.mediators
{
	import flash.utils.setTimeout;

	import robotlegs.bender.extensions.palidor.starlingIntegration.starlingViewMap.impl.StarlingMediator;

	import setzer.spaceinvaders.services.FlowService;
	import setzer.spaceinvaders.views.IntroView;

	public class IntroViewMediator extends StarlingMediator
	{
		[Inject]
		public var flowService:FlowService;

		[Inject]
		public var view:IntroView;

		override public function initialize():void
		{
			view.playAnimation();
			setTimeout( onTimerOutHandler, 3500 );
		}

		private function onTimerOutHandler():void
		{
			flowService.setHomeView();
		}
	}
}