package setzer.spaceinvaders.mediators
{
	import robotlegs.bender.extensions.palidor.starlingIntegration.starlingViewMap.impl.StarlingMediator;

	import setzer.spaceinvaders.services.GameService;

	import setzer.spaceinvaders.views.StartingPopup;

	import starling.events.Event;

	public class StartingPopupMediator extends StarlingMediator
	{
		[Inject]
		public var view:StartingPopup;

		[Inject]
		public var gameService:GameService;

		override public function initialize():void
		{
			eventMap.mapListener( view, Event.COMPLETE, view_completeHandler );
			view.start();
		}

		private function view_completeHandler( e:Event ):void
		{
			view.destroy();
			gameService.resume();
		}

		override public function destroy():void
		{
			eventMap.unmapListeners();
		}
	}
}
