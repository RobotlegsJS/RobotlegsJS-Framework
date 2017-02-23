package setzer.spaceinvaders.game.entities
{
	public class Bullet extends Entity
	{
		public static const TARGET_ENEMY:int = 0;
		public static const TARGET_PlAYER:int = 1;

		public var target:int = TARGET_ENEMY;

		public function Bullet( typeID:int = Entity.BULLET )
		{
			super( typeID );
		}
	}
}
