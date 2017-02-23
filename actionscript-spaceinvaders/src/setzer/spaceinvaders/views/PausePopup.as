package setzer.spaceinvaders.views
{
	import setzer.spaceinvaders.assets.AssetsInfo;
	import setzer.spaceinvaders.utils.Colors;
	import setzer.spaceinvaders.views.components.CustomButton;
	import setzer.spaceinvaders.utils.MagicValues;
	import setzer.spaceinvaders.utils.StarlingFactory;
	import setzer.spaceinvaders.utils.Texts;
	import setzer.spaceinvaders.utils.ViewPortSize;

	import starling.display.Sprite;
	import starling.text.TextField;

	public class PausePopup extends Sprite
	{
		private var _resumeButton:CustomButton;
		private var _homeButton:CustomButton;

		public function PausePopup()
		{
			addChild( StarlingFactory.getShadowBackground() );

			var boardBackground:Sprite = StarlingFactory.getBoardBackground();
			boardBackground.x = ViewPortSize.HALF_WIDTH;
			boardBackground.y = ViewPortSize.HALF_HEIGHT;
			addChild( boardBackground );

			_resumeButton = StarlingFactory.getButton( AssetsInfo.BUTTON_RESUME );
			_resumeButton.pivotX = _resumeButton.width;
			_resumeButton.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET;
			_resumeButton.y = MagicValues.BORDER_OFFSET;
			addChild( _resumeButton );

			_homeButton = StarlingFactory.getButton( AssetsInfo.BUTTON_HOME );
			_homeButton.pivotX = _homeButton.width;
			_homeButton.x = ViewPortSize.MAX_WIDTH - _resumeButton.width - MagicValues.BORDER_OFFSET - 4;
			_homeButton.y = MagicValues.BORDER_OFFSET;
			addChild( _homeButton );

			var pause:TextField = StarlingFactory.getTextField( 300, Texts.PAUSED, Colors.DYNAMIC_TEXT );
			pause.x = ViewPortSize.HALF_WIDTH;
			pause.y = ViewPortSize.HALF_HEIGHT;
			pause.scaleX = 1.2;
			pause.scaleY = 1.2;
			pause.alignPivot();
			addChild( pause );
		}

		public function get resumeButton():CustomButton
		{
			return _resumeButton;
		}

		public function get homeButton():CustomButton
		{
			return _homeButton;
		}
	}
}