package setzer.spaceinvaders.config
{
	import robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;
	import robotlegs.bender.extensions.palidor.starlingCommandMap.api.IStarlingCommandMap;
	import robotlegs.bender.extensions.palidor.starlingIntegration.flowManager.api.IFlowManager;
	import robotlegs.bender.framework.api.IConfig;
	import robotlegs.bender.framework.api.IContext;

	import setzer.spaceinvaders.events.FlowEvent;
	import setzer.spaceinvaders.mediators.BattleFieldComponentMediator;
	import setzer.spaceinvaders.mediators.ConfigViewMediator;
	import setzer.spaceinvaders.mediators.GameOverPopupMediator;
	import setzer.spaceinvaders.mediators.GameViewMediator;
	import setzer.spaceinvaders.mediators.HUDGameComponentMediator;
	import setzer.spaceinvaders.mediators.HomeViewMediator;
	import setzer.spaceinvaders.mediators.InfoPopupMediator;
	import setzer.spaceinvaders.mediators.IntroViewMediator;
	import setzer.spaceinvaders.mediators.PausePopupMediator;
	import setzer.spaceinvaders.mediators.ResetConfirmPopupMediator;
	import setzer.spaceinvaders.mediators.StartingPopupMediator;
	import setzer.spaceinvaders.services.FlowService;
	import setzer.spaceinvaders.views.ConfigView;
	import setzer.spaceinvaders.views.GameOverPopup;
	import setzer.spaceinvaders.views.GameView;
	import setzer.spaceinvaders.views.HomeView;
	import setzer.spaceinvaders.views.InfoPopup;
	import setzer.spaceinvaders.views.IntroView;
	import setzer.spaceinvaders.views.PausePopup;
	import setzer.spaceinvaders.views.ResetConfimPopup;
	import setzer.spaceinvaders.views.StartingPopup;
	import setzer.spaceinvaders.views.components.BattleFieldComponent;
	import setzer.spaceinvaders.views.components.HUDGameComponent;

	import starling.events.EventDispatcher;

	public class MVCConfig implements IConfig
	{
		[Inject]
		public var eventDispatcher:EventDispatcher;

		[Inject]
		public var mediatorMap:IMediatorMap;

		[Inject]
		public var context:IContext;

		[Inject]
		public var flowManager:IFlowManager;

		[Inject]
		public var commandMap:IStarlingCommandMap;

		public function configure():void
		{
			context.afterInitializing( init );
		}

		private function init():void
		{
			mapServices();
			mapMediators();
			mapFlowManager();

			eventDispatcher.dispatchEvent( new FlowEvent( FlowEvent.SHOW_INTRO_VIEW ) );
		}

		private function mapServices():void
		{
			context.injector.map( FlowService ).asSingleton();
		}

		private function mapMediators():void
		{
			mediatorMap.map( IntroView ).toMediator( IntroViewMediator );
			mediatorMap.map( HomeView ).toMediator( HomeViewMediator );
			mediatorMap.map( ConfigView ).toMediator( ConfigViewMediator );
			mediatorMap.map( GameView ).toMediator( GameViewMediator );

			mediatorMap.map( HUDGameComponent ).toMediator( HUDGameComponentMediator );
			mediatorMap.map( BattleFieldComponent ).toMediator( BattleFieldComponentMediator );

			mediatorMap.map( StartingPopup ).toMediator( StartingPopupMediator );
			mediatorMap.map( PausePopup ).toMediator( PausePopupMediator );
			mediatorMap.map( GameOverPopup ).toMediator( GameOverPopupMediator );
			mediatorMap.map( ResetConfimPopup ).toMediator( ResetConfirmPopupMediator );
			mediatorMap.map( InfoPopup ).toMediator( InfoPopupMediator );
		}

		private function mapFlowManager():void
		{
			flowManager.map( FlowEvent.SHOW_INTRO_VIEW ).toView( IntroView );
			flowManager.map( FlowEvent.SHOW_HOME_VIEW ).toView( HomeView );
			flowManager.map( FlowEvent.SHOW_GAME_VIEW ).toView( GameView );
			flowManager.map( FlowEvent.SHOW_CONIFG_VIEW ).toView( ConfigView );

			flowManager.map( FlowEvent.SHOW_STARTING_POPUP ).toFloatingView( StartingPopup );
			flowManager.map( FlowEvent.SHOW_PAUSE_POPUP ).toFloatingView( PausePopup );
			flowManager.map( FlowEvent.SHOW_GAME_OVER_POPUP ).toFloatingView( GameOverPopup );
			flowManager.map( FlowEvent.SHOW_RESET_CONFIRM_POPUP ).toFloatingView( ResetConfimPopup );
			flowManager.map( FlowEvent.SHOW_INFO_POPUP ).toFloatingView( InfoPopup );
		}
	}
}
