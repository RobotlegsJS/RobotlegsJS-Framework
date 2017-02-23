package setzer.spaceinvaders.config
{
	import robotlegs.bender.extensions.palidor.starlingCommandMap.api.IStarlingCommandMap;
	import robotlegs.bender.framework.api.IConfig;
	import robotlegs.bender.framework.api.IContext;

	import setzer.spaceinvaders.assets.Assets;
	import setzer.spaceinvaders.game.commands.CreateLevelCommand;
	import setzer.spaceinvaders.game.commands.DecreaseLivesCommand;
	import setzer.spaceinvaders.game.commands.GameOverCommand;
	import setzer.spaceinvaders.game.commands.IncreaseLevelCommand;
	import setzer.spaceinvaders.game.commands.IncreasePointsCommand;
	import setzer.spaceinvaders.game.commands.RetryGameCommand;
	import setzer.spaceinvaders.game.commands.StartGameCommand;
	import setzer.spaceinvaders.events.GameEvent;
	import setzer.spaceinvaders.game.factories.LevelFactory;
	import setzer.spaceinvaders.game.managers.GameManager;
	import setzer.spaceinvaders.game.utils.EntityPool;
	import setzer.spaceinvaders.utils.Colors;
	import setzer.spaceinvaders.utils.SharedObjectManager;
	import setzer.spaceinvaders.game.models.GameModel;
	import setzer.spaceinvaders.game.models.LevelModel;
	import setzer.spaceinvaders.services.GameService;

	import starling.events.EventDispatcher;

	public class GameConfig implements IConfig
	{
		[Inject]
		public var eventDispatcher:EventDispatcher;

		[Inject]
		public var context:IContext;

		[Inject]
		public var commandMap:IStarlingCommandMap;

		public function configure():void
		{
			Assets.init();
			EntityPool.init();
			LevelFactory.setupLevels();
			context.afterInitializing( init );
		}

		private function init():void
		{
			mapModels();
			mapServices();
			mapCommands();
			mapManager();
		}

		private function mapModels():void
		{
			context.injector.map( GameModel ).asSingleton();
			context.injector.map( LevelModel ).asSingleton();
		}

		private function mapManager():void
		{
			context.injector.map( GameManager ).asSingleton();
			context.injector.map( SharedObjectManager ).asSingleton();
		}

		private function mapCommands():void
		{
			commandMap.map( GameEvent.START_GAME_COMMAND ).toCommand( StartGameCommand );
			commandMap.map( GameEvent.RETRY_GAME_COMMAND ).toCommand( RetryGameCommand );
			commandMap.map( GameEvent.CREATE_LEVEL_COMMAND ).toCommand( CreateLevelCommand );
			commandMap.map( GameEvent.INCREASE_LEVEL_COMMAND ).toCommand( IncreaseLevelCommand );
			commandMap.map( GameEvent.INCREASE_POINTS ).toCommand( IncreasePointsCommand );
			commandMap.map( GameEvent.DECREASE_LIVES ).toCommand( DecreaseLivesCommand );
			commandMap.map( GameEvent.GAME_OVER ).toCommand( GameOverCommand );
		}

		private function mapServices():void
		{
			context.injector.map( GameService ).asSingleton();
		}
	}
}
