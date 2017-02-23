package setzer.spaceinvaders.game.displays
{
	import setzer.spaceinvaders.assets.Assets;
	import setzer.spaceinvaders.assets.AssetsInfo;
	import setzer.spaceinvaders.game.entities.Entity;
	import setzer.spaceinvaders.utils.Colors;

	import starling.display.Image;
	import starling.textures.TextureSmoothing;

	public class BulletDisplay extends Image
	{
		public function BulletDisplay( typeId:int = Entity.BULLET )
		{
			super( Assets.getTexture( AssetsInfo.BULLET ) );

			scaleX = 2;
			scaleY = 2;
			alignPivot();

			textureSmoothing = TextureSmoothing.NONE;
			color = Colors.GAME_ITEMS;
		}
	}
}
