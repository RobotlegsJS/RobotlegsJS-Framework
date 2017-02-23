package setzer.spaceinvaders.game.managers
{
	import flash.geom.Point;

	import setzer.spaceinvaders.game.displays.EnemyDisplay;
	import setzer.spaceinvaders.game.entities.Bullet;
	import setzer.spaceinvaders.game.entities.Entity;
	import setzer.spaceinvaders.game.entities.Explosion;
	import setzer.spaceinvaders.game.models.GameModel;
	import setzer.spaceinvaders.game.models.LevelModel;
	import setzer.spaceinvaders.game.utils.EntityPool;
	import setzer.spaceinvaders.game.utils.GameUtils;
	import setzer.spaceinvaders.services.GameService;
	import setzer.spaceinvaders.utils.ViewPortSize;

	public class GameManager
	{

		[Inject]
		public var gameModel:GameModel;

		[Inject]
		public var model:LevelModel;

		[Inject]
		public var service:GameService;

		private var _cannonDirection:int;

		private var _enemyPath:Vector.<Point>;
		private var _enemyPathIndex:int;

		private var _tickMovement:int;
		private var _tickShot:int;

		private var _shooting:Boolean;


		public function GameManager()
		{
			_enemyPath = GameUtils.getEnemyPath();
			_enemyPathIndex = 0;
		}

		public function cannonMovement( direction:int = 0 ):void
		{
			_cannonDirection = direction
		}

		public function update():void
		{
			_tickMovement++;
			_tickShot++;

			if ( _tickMovement > GameUtils.getCurrentSpeed( gameModel.level ) )
			{
				moveEnemies();
				updateExplosions();

				if ( Math.random() * 10 < 1 ) createEnemyBullet();

				_tickMovement = 0;
			}

			if ( _tickShot > 16 && _shooting ) createBullets();


			moveCannon();
			moveBullets();

			solveCollisions();
			validateNextLevel();
		}

		private function updateExplosions():void
		{
			for each ( var explosion:Explosion in model.exposions )
			{
				explosion.update();
				if ( explosion.remove ) model.toRemove.push( explosion );
			}
		}

		private function solveCollisions():void
		{
			for each ( var bullet:Bullet in model.bullets )
			{
				if ( bullet.target == Bullet.TARGET_PlAYER )
				{
					if ( GameUtils.isCollision( bullet, model.cannon ) )
					{
						createExplosion( model.cannon );
						model.cannon.x = ViewPortSize.HALF_WIDTH;
						model.toRemove.push( bullet );
						service.decreaseLives();
						break;
					}
				} else
					for each ( var entity:Entity in model.enemies )
					{
						if ( GameUtils.isCollision( bullet, entity ) )
						{
							createExplosion( entity );
							model.toRemove.push( entity );
							model.toRemove.push( bullet );
							service.increasePoints();
							break;
						}
					}
			}
		}

		private function validateNextLevel():void
		{
			if ( model.enemies.length > 0 ) return;

			service.pause();
			service.increaseLevel();
		}

		private function moveCannon():void
		{
			var newCannonXPosition:int = model.cannon.x + _cannonDirection;
			newCannonXPosition = Math.min( ViewPortSize.MAX_WIDTH, newCannonXPosition );
			newCannonXPosition = Math.max( 0, newCannonXPosition );

			model.cannon.x = newCannonXPosition;
			model.cannon.applyPosition();
		}

		public function moveEnemies():void
		{
			var nearEnemyY:int = 0;
			for each ( var enemy:Entity in model.enemies )
			{
				enemy.x += _enemyPath[_enemyPathIndex].x;
				enemy.y += _enemyPath[_enemyPathIndex].y;
				enemy.applyPosition();
				EnemyDisplay( enemy.display ).tick();

				nearEnemyY = Math.max( enemy.y, nearEnemyY );
			}

			_enemyPathIndex++;
			if ( _enemyPathIndex == _enemyPath.length )_enemyPathIndex = 0;

			if ( nearEnemyY > ViewPortSize.MAX_HEIGHT - 120 ) service.gameOver();
		}

		private function createExplosion( entity:Entity ):void
		{
			var explosion:Explosion = Explosion( EntityPool.getEntity( Entity.EXPLOSION ) );
			explosion.x = entity.x;
			explosion.y = entity.y;
			explosion.reset();
			explosion.applyPosition();
			model.addExplosion( explosion );
		}

		public function startShooting():void
		{
			if ( _shooting == false && _tickShot > 8 ) createBullets();

			_tickShot = 0;
			_shooting = true;
		}

		public function stopShooting():void
		{
			_shooting = false;
		}

		private function createBullets():void
		{
			shootBullets();
			_tickShot = 0;
		}

		private function shootBullets():void
		{
			var bullet:Bullet = Bullet( EntityPool.getEntity( Entity.BULLET ) );
			bullet.x = model.cannon.x;
			bullet.y = model.cannon.y - 10;
			bullet.target = Bullet.TARGET_ENEMY;
			bullet.applyPosition();
			model.addBullet( bullet );
		}

		private function moveBullets():void
		{
			var speedY:int;

			for each ( var bullet:Bullet in model.bullets )
			{
				if ( bullet.target == Bullet.TARGET_PlAYER )
					speedY = 3; else
					speedY = -3;

				bullet.y += speedY;
				bullet.applyPosition();
				if ( bullet.y >= ViewPortSize.MAX_HEIGHT - 100 || bullet.y <= 0 )
					model.toRemove.push( bullet );
			}
		}

		public function createEnemyBullet():void
		{
			var enemyIndex:int = Math.floor( Math.random() * (model.enemies.length - 1) );

			if ( enemyIndex == 0 ) return;

			var bullet:Bullet = Bullet( EntityPool.getEntity( Entity.BULLET ) );
			bullet.x = model.enemies[enemyIndex].x;
			bullet.y = model.enemies[enemyIndex].y + 10;
			bullet.target = Bullet.TARGET_PlAYER;
			bullet.applyPosition();
			model.addBullet( bullet );
		}

		public function resume():void
		{
			_cannonDirection = 0;
			_tickShot = 0;
			_shooting = false;
		}
	}
}
