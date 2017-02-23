package setzer.spaceinvaders.mediators
{
	import robotlegs.bender.extensions.palidor.starlingIntegration.starlingViewMap.impl.StarlingMediator;

	import setzer.spaceinvaders.services.FlowService;
	import setzer.spaceinvaders.services.GameService;

	import setzer.spaceinvaders.views.PausePopup;

	import starling.events.Event;

	public class PausePopupMediator extends StarlingMediator
	{
		[Inject]
		public var view:PausePopup;

		[Inject]
		public var gameService:GameService;

		[Inject]
		public var flowService:FlowService;

		override public function initialize():void
		{
			eventMap.mapListener( view.resumeButton, Event.TRIGGERED, closeButton_onTriggeredHandler );
			eventMap.mapListener( view.homeButton, Event.TRIGGERED, homeButton_onTriggeredHandler );
		}

		private function homeButton_onTriggeredHandler( e:Event ):void
		{
			flowService.setHomeView();
			view.removeFromParent();
		}
		private function closeButton_onTriggeredHandler( e:Event ):void
		{
			gameService.resume();
			view.removeFromParent();
		}

		override public function destroy():void
		{
			eventMap.unmapListeners();
		}
	}
}
