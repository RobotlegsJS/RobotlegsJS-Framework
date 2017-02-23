package setzer.spaceinvaders.views.components
{
	import setzer.spaceinvaders.assets.AssetsInfo;
	import setzer.spaceinvaders.game.models.GameModel;
	import setzer.spaceinvaders.utils.Colors;
	import setzer.spaceinvaders.views.components.CustomButton;
	import setzer.spaceinvaders.utils.MagicValues;
	import setzer.spaceinvaders.utils.StarlingFactory;
	import setzer.spaceinvaders.utils.Texts;
	import setzer.spaceinvaders.utils.ViewPortSize;

	import starling.display.Quad;
	import starling.display.Sprite;
	import starling.text.TextField;

	public class HUDGameComponent extends Sprite
	{
		private var _pauseButton:CustomButton;
		private var _scoreText:TextField;
		private var _hiScoreText:TextField;
		private var _levelText:TextField;
		private var _livesComponent:LivesComponent;

		public function HUDGameComponent()
		{
			createBackgrounds();
			createTextFields();
			createButtons();
			createComponents();
		}

		private function createBackgrounds():void
		{
			addChild( StarlingFactory.getQuad( ViewPortSize.MAX_WIDTH, 70, Colors.BACKGROUND_DARK ) );

			var bottomBackground:Quad = StarlingFactory.getQuad( ViewPortSize.MAX_WIDTH, 100, Colors.BACKGROUND_DARK );
			bottomBackground.y = ViewPortSize.MAX_HEIGHT - 80;
			addChild( bottomBackground );
		}

		private function createTextFields():void
		{

			var scoreLabel:TextField = StarlingFactory.getTextField( 120, Texts.SCORE, Colors.STATIC_TEXT, "left", AssetsInfo.SIZE_HUD );
			scoreLabel.x = MagicValues.BORDER_OFFSET;
			scoreLabel.y = MagicValues.BORDER_OFFSET;
			addChild( scoreLabel );

			_scoreText = StarlingFactory.getTextField( 80, "0", Colors.DYNAMIC_TEXT, "right", AssetsInfo.SIZE_HUD );
			_scoreText.pivotX = _scoreText.width;
			_scoreText.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET - 58;
			_scoreText.y = scoreLabel.y;
			addChild( _scoreText );

			var hiScoreLabel:TextField = StarlingFactory.getTextField( 120, Texts.HI_SCORE, Colors.STATIC_TEXT, "left", AssetsInfo.SIZE_HUD );
			hiScoreLabel.x = MagicValues.BORDER_OFFSET;
			hiScoreLabel.y = _scoreText.y + 18;
			addChild( hiScoreLabel );

			_hiScoreText = StarlingFactory.getTextField( 80, "0", Colors.DYNAMIC_TEXT, "right", AssetsInfo.SIZE_HUD );
			_hiScoreText.pivotX = _hiScoreText.width;
			_hiScoreText.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET - 58;
			_hiScoreText.y = hiScoreLabel.y;
			addChild( _hiScoreText );

			var levelLabel:TextField = StarlingFactory.getTextField( 120, Texts.LEVEL, Colors.STATIC_TEXT, "left", AssetsInfo.SIZE_HUD );
			levelLabel.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET - 80;
			levelLabel.y = ViewPortSize.MAX_HEIGHT - 70;
			addChild( levelLabel );

			_levelText = StarlingFactory.getTextField( 80, "0", Colors.DYNAMIC_TEXT, "right", AssetsInfo.SIZE_HUD );
			_levelText.pivotX = _levelText.width;
			_levelText.x = levelLabel.x + 80;
			_levelText.y = levelLabel.y;
			addChild( _levelText );

		}

		private function createButtons():void
		{
			_pauseButton = StarlingFactory.getButton( AssetsInfo.BUTTON_PAUSE );
			_pauseButton.pivotX = _pauseButton.width;
			_pauseButton.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET;
			_pauseButton.y = MagicValues.BORDER_OFFSET;
			addChild( _pauseButton );
		}

		private function createComponents():void
		{
			_livesComponent = new LivesComponent();
			_livesComponent.x = MagicValues.BORDER_OFFSET;
			_livesComponent.y = ViewPortSize.MAX_HEIGHT - 70;
			addChild( _livesComponent )
		}

		public function get pauseButton():CustomButton
		{
			return _pauseButton;
		}

		public function updateData( model:GameModel ):void
		{
			_livesComponent.updateLives( model.lives );
			_scoreText.text = String( model.score );
			_hiScoreText.text = String( model.hiScore );
			_levelText.text = String( model.level );
		}
	}
}