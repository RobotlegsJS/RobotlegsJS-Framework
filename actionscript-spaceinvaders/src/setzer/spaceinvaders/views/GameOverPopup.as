package setzer.spaceinvaders.views
{
	import setzer.spaceinvaders.assets.AssetsInfo;
	import setzer.spaceinvaders.utils.Colors;
	import setzer.spaceinvaders.views.components.CustomButton;
	import setzer.spaceinvaders.utils.StarlingFactory;
	import setzer.spaceinvaders.utils.Texts;
	import setzer.spaceinvaders.utils.ViewPortSize;

	import starling.display.Sprite;
	import starling.text.TextField;

	public class GameOverPopup extends Sprite
	{
		private var _homeButton:CustomButton;
		private var _retryButton:CustomButton;

		public function GameOverPopup()
		{
			addChild( StarlingFactory.getShadowBackground() );

			var boardBackground:Sprite = StarlingFactory.getBoardBackground();
			boardBackground.x = ViewPortSize.HALF_WIDTH;
			boardBackground.y = ViewPortSize.HALF_HEIGHT;
			addChild( boardBackground );

			var commands:TextField = StarlingFactory.getTextField( 150, Texts.GAME_OVER, Colors.DYNAMIC_TEXT );
			commands.x = ViewPortSize.HALF_WIDTH;
			commands.y = ViewPortSize.HALF_HEIGHT - 30;
			commands.scaleX = 1.2;
			commands.scaleY = 1.2;
			commands.height = 50;
			commands.alignPivot();
			addChild( commands );

			_retryButton = StarlingFactory.getButton( AssetsInfo.BUTTON_RETRY );
			_retryButton.alignPivot();
			_retryButton.x = ViewPortSize.HALF_WIDTH - _retryButton.width * .5 - 4;
			_retryButton.y = ViewPortSize.HALF_HEIGHT + 25;
			addChild( _retryButton );

			_homeButton = StarlingFactory.getButton( AssetsInfo.BUTTON_HOME );
			_homeButton.alignPivot();
			_homeButton.x = ViewPortSize.HALF_WIDTH + _homeButton.width * .5 + 4;
			_homeButton.y = ViewPortSize.HALF_HEIGHT + 25;
			addChild( _homeButton );
		}

		public function get retryButton():CustomButton
		{
			return _retryButton;
		}

		public function get homeButton():CustomButton
		{
			return _homeButton;
		}
	}
}
