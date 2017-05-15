package setzer.spaceinvaders.views.components
{
	import setzer.spaceinvaders.assets.AssetsInfo;
	import setzer.spaceinvaders.utils.Colors;
	import setzer.spaceinvaders.utils.StarlingFactory;

	import starling.display.DisplayObject;
	import starling.display.Image;
	import starling.display.Sprite;

	public class LivesComponent extends Sprite
	{
		private var _cannons:Vector.<DisplayObject>

		public function LivesComponent()
		{
			createCannons();
		}

		private function createCannons():void
		{
			_cannons = new Vector.<DisplayObject>();
			for ( var i:int = 0; i < 3; i++ )
			{
				var cannon:Image = StarlingFactory.getImage( AssetsInfo.CANNON );
				cannon.scaleX = 1.5;
				cannon.scaleY = 1.5;
				cannon.x = i * (cannon.width + 3);
				cannon.y = 3;
				cannon.color = Colors.GAME_ITEMS;
				addChild( cannon );
				_cannons.push( cannon );
			}
		}

		public function updateLives( value:uint ):void
		{
			for ( var i:int = 0; i < _cannons.length; i++ )
			{
				_cannons[i].visible = (i < value);
			}
		}
	}
}
