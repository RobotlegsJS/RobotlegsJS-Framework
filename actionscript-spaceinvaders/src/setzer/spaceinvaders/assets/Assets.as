package setzer.spaceinvaders.assets
{
	import starling.text.BitmapFont;
	import starling.text.TextField;
	import starling.textures.Texture;
	import starling.textures.TextureAtlas;
	import starling.textures.TextureSmoothing;

	public class Assets
	{
		private static var _atlas:TextureAtlas;

		public static function init():void
		{
			var atlasTexture:Texture = Texture.fromEmbeddedAsset( Embeds.ATLAS_IMAGE );
			var atlasXML:XML = XML( new Embeds.ATLAS_XML() );
			_atlas = new TextureAtlas( atlasTexture, atlasXML );

			var fontTexture:Texture = Texture.fromEmbeddedAsset( Embeds.FONT_IMAGE );
			var font:BitmapFont = new BitmapFont( fontTexture, XML( new Embeds.FONT_XML() ) );
			font.smoothing = TextureSmoothing.NONE;

			TextField.registerBitmapFont( font );
		}

		public static function getTexture( preFix:String ):Texture
		{
			return _atlas.getTexture( preFix );
		}
	}
}
