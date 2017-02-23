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

	public class ResetConfimPopup extends Sprite
	{
		private var _cancelButton:CustomButton;
		private var _confirmButton:CustomButton;

		public function ResetConfimPopup()
		{
			addChild( StarlingFactory.getShadowBackground() );

			var boardBackground:Sprite = StarlingFactory.getBoardBackground();
			boardBackground.x = ViewPortSize.HALF_WIDTH;
			boardBackground.y = ViewPortSize.HALF_HEIGHT;
			addChild( boardBackground );

			var question:TextField = StarlingFactory.getTextField( 400, Texts.CONFIRM_RESET, Colors.DYNAMIC_TEXT );
			question.x = ViewPortSize.HALF_WIDTH;
			question.y = ViewPortSize.HALF_HEIGHT - 25;
			question.height = 150;
			question.scaleX = .9;
			question.scaleY = .9;
			question.alignPivot();
			addChild( question );

			_confirmButton = StarlingFactory.getButton( AssetsInfo.BUTTON_CONFIRM );
			_confirmButton.alignPivot();
			_confirmButton.x = ViewPortSize.HALF_WIDTH - _confirmButton.width * .5 - 4;
			_confirmButton.y = ViewPortSize.HALF_HEIGHT + 25;
			addChild( _confirmButton );

			_cancelButton = StarlingFactory.getButton( AssetsInfo.BUTTON_CANCEL );
			_cancelButton.alignPivot();
			_cancelButton.x = ViewPortSize.HALF_WIDTH + _cancelButton.width * .5 + 4;
			_cancelButton.y = ViewPortSize.HALF_HEIGHT + 25;
			addChild( _cancelButton );
		}

		public function get confirmButton():CustomButton
		{
			return _confirmButton;
		}

		public function get cancelButton():CustomButton
		{
			return _cancelButton;
		}
	}
}
