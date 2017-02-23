package setzer.spaceinvaders.game.models
{
	public class LevelData
	{
		public var cols:int;
		public var rows:int;
		public var map:Vector.<Vector.<int>>;

		public function LevelData( cols:int, rows:int )
		{
			this.cols = cols;
			this.rows = rows;
		}
	}
}
