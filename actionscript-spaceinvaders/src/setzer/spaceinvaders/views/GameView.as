package setzer.spaceinvaders.views
{
	import setzer.spaceinvaders.utils.Colors;
	import setzer.spaceinvaders.utils.StarlingFactory;
	import setzer.spaceinvaders.utils.MagicValues;
	import setzer.spaceinvaders.views.components.BattleFieldComponent;
	import setzer.spaceinvaders.views.components.HUDGameComponent;

	import starling.display.Sprite;

	public class GameView extends Sprite
	{
		private var _battleField:BattleFieldComponent;
		private var _hudComponent:HUDGameComponent;

		public function GameView()
		{
			createBackground();
		}

		private function createBackground():void
		{
			addChild( StarlingFactory.getColorBackground(Colors.BACKGROUND) );
		}

		public function destroy():void
		{
			removeChild( _battleField );
			removeChild( _hudComponent );

			_battleField = null;
			_hudComponent = null;
		}

		public function createComponents():void
		{
			_battleField = new BattleFieldComponent();
			addChild( _battleField );

			_hudComponent = new HUDGameComponent();
			addChild( _hudComponent );
		}
	}
}
