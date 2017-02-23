package setzer.spaceinvaders.game.displays
{
	import setzer.spaceinvaders.assets.Assets;
	import setzer.spaceinvaders.assets.AssetsInfo;
	import setzer.spaceinvaders.game.entities.Entity;
	import setzer.spaceinvaders.utils.Colors;

	import starling.display.Image;
	import starling.textures.TextureSmoothing;

	public class ExplosionDisplay extends Image
	{
		public function ExplosionDisplay( typeId:int = Entity.EXPLOSION )
		{
			super( Assets.getTexture( AssetsInfo.EXPLOSION + "_01" ) );

			scaleX = 2;
			scaleY = 2;
			alignPivot();

			textureSmoothing = TextureSmoothing.NONE;
			color = Colors.GAME_ITEMS;
		}

		public function firstFrame():void
		{
			texture = Assets.getTexture( AssetsInfo.EXPLOSION + "_01" );
			readjustSize();
		}

		public function nextFrame():void
		{
			texture = Assets.getTexture( AssetsInfo.EXPLOSION + "_02" );
			readjustSize();
		}
	}
}
