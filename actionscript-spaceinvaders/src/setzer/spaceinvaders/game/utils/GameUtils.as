package setzer.spaceinvaders.game.utils
{
	import flash.geom.Point;
	import flash.geom.Rectangle;

	import setzer.spaceinvaders.game.entities.Bullet;
	import setzer.spaceinvaders.game.entities.Entity;

	public class GameUtils
	{
		public static function getCurrentSpeed( level:int ):int
		{
			return Math.max( 4, 19 - level );
		}

		public static function getEnemyPath():Vector.<Point>
		{
			var enemyPath:Vector.<Point> = new Vector.<Point>();
			enemyPath.push( new Point( -10, 0 ) );
			enemyPath.push( new Point( -10, 0 ) );
			enemyPath.push( new Point( 0, 5 ) );
			enemyPath.push( new Point( 10, 0 ) );
			enemyPath.push( new Point( 10, 0 ) );
			enemyPath.push( new Point( 10, 0 ) );
			enemyPath.push( new Point( 10, 0 ) );
			enemyPath.push( new Point( 0, 5 ) );
			enemyPath.push( new Point( -10, 0 ) );
			enemyPath.push( new Point( -10, 0 ) );
			return enemyPath
		}

		public static function isCollision( bullet:Bullet, entity:Entity ):Boolean
		{
			var bulletRec:Rectangle = new Rectangle( bullet.x - 3, bullet.y - 5, 6, 10 );
			var entityRec:Rectangle = new Rectangle( entity.x - 9, entity.y - 9, 18, 18 );

			return bulletRec.intersects(entityRec);
		}
	}
}
