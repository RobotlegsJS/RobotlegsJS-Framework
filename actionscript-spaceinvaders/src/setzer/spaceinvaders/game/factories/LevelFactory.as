package setzer.spaceinvaders.game.factories
{
	import flash.utils.Dictionary;

	import setzer.spaceinvaders.game.displays.CannonDisplay;
	import setzer.spaceinvaders.game.displays.EnemyDisplay;
	import setzer.spaceinvaders.game.entities.Entity;
	import setzer.spaceinvaders.game.models.LevelData;
	import setzer.spaceinvaders.game.models.LevelModel;
	import setzer.spaceinvaders.game.utils.EntityPool;
	import setzer.spaceinvaders.utils.ViewPortSize;

	public class LevelFactory
	{
		private static var maps:Dictionary;

		public static function setupLevels():void
		{
			maps = new Dictionary();
			maps[0] = new LevelData( 7, 5 );
			maps[1] = new LevelData( 3, 1 );
			maps[2] = new LevelData( 3, 2 );
			maps[3] = new LevelData( 4, 2 );
			maps[4] = new LevelData( 4, 3 );
			maps[5] = new LevelData( 5, 2 );
			maps[6] = new LevelData( 5, 3 );
			maps[7] = new LevelData( 6, 3 );
			maps[8] = new LevelData( 6, 4 );
			maps[9] = new LevelData( 7, 4 );
		}

		public static function getEmptyMap( numCols:int = 5, numRows:int = 3 ):Vector.<Vector.<int>>
		{
			var result:Vector.<Vector.<int>> = new Vector.<Vector.<int>>();
			var vectorRow:Vector.<int>;
			var ids:Array = [Entity.ENEMY_1, Entity.ENEMY_2, Entity.ENEMY_3];

			for ( var row:int = 0; row < numRows; row++ )
			{
				vectorRow = new Vector.<int>();

				for ( var col:int = 0; col < numCols; col++ )
				{
					vectorRow.push( ids[Math.floor( row * 3 / numRows )] );
				}
				result.push( vectorRow );
			}
			return result;
		}

		public static function generateLevel( levelModel:LevelModel, level:uint ):void
		{
			levelModel.reset();

			var map:Vector.<Vector.<int>> = getLevelMapByLevel( level );
			var enemy:Entity;

			for ( var row:int = 0; row < map.length; row++ )
			{
				for ( var col:int = 0; col < map[row].length; col++ )
				{
					if ( map[row][col] == 0 ) continue;

					enemy = EntityPool.getEntity(map[row][col]);
					enemy.x = ViewPortSize.HALF_WIDTH + (30 * col) - ((map[row].length - 1 ) * 15);
					enemy.y = 20 * row + 120;
					enemy.applyPosition();
					levelModel.addEnemy( enemy );
				}
			}

			var cannon:Entity = EntityPool.getEntity(Entity.CANNON);
			cannon.x = ViewPortSize.HALF_WIDTH;
			cannon.y = ViewPortSize.MAX_HEIGHT - 100;
			cannon.display = new CannonDisplay();
			cannon.applyPosition();
			levelModel.setCannon( cannon );
		}

		private static function getLevelMapByLevel( level:int ):Vector.<Vector.<int>>
		{

			var levelData:LevelData = maps[level] || maps[0];
			levelData.map = getEmptyMap( levelData.cols, levelData.rows );

			return levelData.map;
		}
	}
}
