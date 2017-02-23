package setzer.spaceinvaders.game.entities
{
	import starling.display.DisplayObject;

	public class Entity
	{
		public static const ENEMY_1:int = 1;
		public static const ENEMY_2:int = 2;
		public static const ENEMY_3:int = 3;
		public static const CANNON:int = 10;
		public static const BULLET:int = 11;
		public static const EXPLOSION:int = 12;

		private var _typeID:int;

		public var x:int;
		public var y:int;
		public var display:DisplayObject;

		public function Entity( typeID:int )
		{
			_typeID = typeID;
		}

		public function applyPosition():void
		{
			display.x = x;
			display.y = y;
		}

		public function get typeID():int
		{
			return _typeID;
		}
	}
}
