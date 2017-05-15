package setzer.spaceinvaders.views
{
	import setzer.spaceinvaders.assets.AssetsInfo;
	import setzer.spaceinvaders.utils.Colors;
	import setzer.spaceinvaders.views.components.CustomButton;
	import setzer.spaceinvaders.utils.MagicValues;
	import setzer.spaceinvaders.utils.StarlingFactory;
	import setzer.spaceinvaders.utils.ViewPortSize;

	import starling.display.Image;
	import starling.display.Sprite;

	public class HomeView extends Sprite
	{
		private var _startButton:CustomButton;
		private var _configButton:CustomButton;

		public function HomeView()
		{
			addChild( StarlingFactory.getColorBackground() );

			var logo:Image = StarlingFactory.getImage( AssetsInfo.LOGO_SPACE_INVADERS );
			logo.x = ViewPortSize.HALF_WIDTH;
			logo.y = ViewPortSize.MAX_HEIGHT * .3;
			logo.color = Colors.GAME_ITEMS;
			logo.alignPivot();
			addChild( logo );

			_startButton = StarlingFactory.getButton( AssetsInfo.BUTTON_START );
			_startButton.x = ViewPortSize.HALF_WIDTH;
			_startButton.y = ViewPortSize.MAX_HEIGHT * .6;
			_startButton.alignPivot();
			addChild( _startButton );

			_configButton = StarlingFactory.getButton( AssetsInfo.BUTTON_CONFIG );
			_configButton.x = ViewPortSize.HALF_WIDTH;
			_configButton.y = _startButton.y + 10 + _configButton.height;
			_configButton.alignPivot();
			addChild( _configButton );

			var logoSetzer:Image = StarlingFactory.getImage( AssetsInfo.LOGO_SETZER );
			logoSetzer.x = MagicValues.BORDER_OFFSET;
			logoSetzer.y = ViewPortSize.MAX_HEIGHT - MagicValues.BORDER_OFFSET - logoSetzer.height;
			logoSetzer.color = Colors.GAME_ITEMS;
			addChild( logoSetzer );
		}

		public function get startButton():CustomButton
		{
			return _startButton;
		}

		public function get configButton():CustomButton
		{
			return _configButton;
		}
	}
}
