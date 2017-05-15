package setzer.spaceinvaders.views
{
	import setzer.spaceinvaders.assets.AssetsInfo;
	import setzer.spaceinvaders.utils.Colors;
	import setzer.spaceinvaders.utils.MagicValues;
	import setzer.spaceinvaders.utils.StarlingFactory;
	import setzer.spaceinvaders.utils.Texts;
	import setzer.spaceinvaders.utils.ViewPortSize;
	import setzer.spaceinvaders.views.components.CustomButton;

	import starling.display.Sprite;
	import starling.text.TextField;

	public class ConfigView extends Sprite
	{
		private var _homeButton:CustomButton;
		private var _resetButton:CustomButton;

		public function ConfigView()
		{

			addChild( StarlingFactory.getColorBackground() );

			var title:TextField = StarlingFactory.getTextField( 100, Texts.CONFIG, Colors.STATIC_TEXT, "left" );
			title.x = MagicValues.BORDER_OFFSET;
			title.y = 24;
			addChild( title );

			var hiScore:TextField = StarlingFactory.getTextField( 150, Texts.HI_SCORE + ":", Colors.STATIC_TEXT, "left" );
			hiScore.x = MagicValues.BORDER_OFFSET;
			hiScore.y = 108;
			addChild( hiScore );

			_resetButton = StarlingFactory.getButton( AssetsInfo.BUTTON_RESET );
			_resetButton.pivotX = _resetButton.width;
			_resetButton.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET;
			_resetButton.y = 100;
			addChild( _resetButton );

			_homeButton = StarlingFactory.getButton( AssetsInfo.BUTTON_HOME );
			_homeButton.pivotX = _homeButton.width;
			_homeButton.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET;
			_homeButton.y = MagicValues.BORDER_OFFSET;
			addChild( _homeButton );
		}

		public function get resetButton():CustomButton
		{
			return _resetButton;
		}

		public function get homeButton():CustomButton
		{
			return _homeButton;
		}
	}
}
