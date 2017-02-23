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

	public class InfoPopup extends Sprite
	{
		private var _closeButton:CustomButton;

		public function InfoPopup()
		{
			addChild( StarlingFactory.getShadowBackground() );

			var boardBackground:Sprite = StarlingFactory.getBoardBackground();
			boardBackground.x = ViewPortSize.HALF_WIDTH;
			boardBackground.y = ViewPortSize.HALF_HEIGHT;
			addChild( boardBackground );

			_closeButton = StarlingFactory.getButton( AssetsInfo.BUTTON_CANCEL );
			_closeButton.pivotX = _closeButton.width;
			_closeButton.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET;
			_closeButton.y = MagicValues.BORDER_OFFSET;
			addChild( _closeButton );

			var commands:TextField = StarlingFactory.getTextField( 300, Texts.COMMANDS, Colors.DYNAMIC_TEXT );
			commands.x = ViewPortSize.HALF_WIDTH;
			commands.y = ViewPortSize.HALF_HEIGHT;
			commands.height = 300;
			commands.alignPivot();
			addChild( commands );
		}

		public function get closeButton():CustomButton
		{
			return _closeButton;
		}
	}
}
