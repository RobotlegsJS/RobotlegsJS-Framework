package setzer.spaceinvaders.game.entities
{
	import setzer.spaceinvaders.game.displays.ExplosionDisplay;

	public class Explosion extends Entity
	{
		public var count:int = 0;
		public var remove:Boolean;

		public function Explosion( typeID:int = Entity.EXPLOSION )
		{
			super( typeID );
		}

		public function update():void
		{
			if (count == 1)
			{
				remove = true;
				return;
			}
			count++;
			ExplosionDisplay(display).nextFrame();
		}

		public function reset():void
		{
			count = 0;
			remove = false;
			ExplosionDisplay(display).firstFrame();
		}
	}
}
