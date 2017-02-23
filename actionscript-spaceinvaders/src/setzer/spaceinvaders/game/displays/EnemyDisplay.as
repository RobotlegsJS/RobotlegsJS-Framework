package setzer.spaceinvaders.game.displays
{
	import flash.utils.Dictionary;

	import setzer.spaceinvaders.assets.Assets;
	import setzer.spaceinvaders.assets.AssetsInfo;
	import setzer.spaceinvaders.utils.Colors;

	import starling.display.Image;
	import starling.textures.Texture;
	import starling.textures.TextureSmoothing;

	public class EnemyDisplay extends Image
	{
		private var movementTexture01:Texture;
		private var movementTexture02:Texture;

		public function EnemyDisplay( enemyTypeId:int )
		{
			var assets:Dictionary = new Dictionary();
			assets[1] = AssetsInfo.ENEMY_01;
			assets[2] = AssetsInfo.ENEMY_02;
			assets[3] = AssetsInfo.ENEMY_03;

			movementTexture01 = Assets.getTexture( assets[enemyTypeId] + "_01" );
			movementTexture02 = Assets.getTexture( assets[enemyTypeId] + "_02" );

			super( movementTexture01 );

			scaleX = 2;
			scaleY = 2;
			alignPivot();

			textureSmoothing = TextureSmoothing.NONE;
			color = Colors.GAME_ITEMS;
		}

		public function tick():void
		{
			if ( texture == movementTexture01 )
				texture = movementTexture02;
			else
				texture = movementTexture01;

			readjustSize();
		}
	}
}
