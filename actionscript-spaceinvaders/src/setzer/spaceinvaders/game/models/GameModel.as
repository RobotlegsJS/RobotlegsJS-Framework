package setzer.spaceinvaders.game.models
{
	public class GameModel
	{
		public var hiScore:int;
		public var score:int;
		public var lives:uint;
		public var level:uint;

		public var status:String;

		public function GameModel()
		{
			hiScore = 0;
			clear();
		}

		public function clear():void
		{
			score = 0;
			lives = 3;
			level = 1;
		}
	}
}
