package setzer.spaceinvaders.game.models
{
	import setzer.spaceinvaders.game.entities.Bullet;
	import setzer.spaceinvaders.game.entities.Entity;

	public class LevelModel
	{
		private var _enemies:Vector.<Entity>;
		private var _bullets:Vector.<Bullet>;
		private var _exposions:Vector.<Entity>;
		private var _cannon:Entity;

		private var _toAdd:Vector.<Entity>;
		private var _toRemove:Vector.<Entity>;

		public function reset():void
		{
			_enemies = new Vector.<Entity>();
			_bullets = new Vector.<Bullet>();
			_exposions = new Vector.<Entity>();
			_cannon = new Entity( Entity.CANNON );

			_toAdd = new Vector.<Entity>();
			_toRemove = new Vector.<Entity>();
		}

		public function addEnemy( entity:Entity ):void
		{
			_enemies.push( entity );
			_toAdd.push( entity );
		}

		public function addBullet( entity:Bullet ):void
		{
			_bullets.push( entity );
			_toAdd.push( entity );
		}

		public function addExplosion( entity:Entity ):void
		{
			_exposions.push( entity );
			_toAdd.push( entity );
		}

		public function setCannon( entity:Entity ):void
		{
			_cannon = entity;
			_toAdd.push( entity );
		}

		public function get toAdd():Vector.<Entity>
		{
			return _toAdd;
		}

		public function get toRemove():Vector.<Entity>
		{
			return _toRemove;
		}

		public function get enemies():Vector.<Entity>
		{
			return _enemies;
		}

		public function get bullets():Vector.<Bullet>
		{
			return _bullets;
		}

		public function get cannon():Entity
		{
			return _cannon;
		}

		public function get exposions():Vector.<Entity>
		{
			return _exposions;
		}

		public function removeEntity( entity:Entity ):void
		{
			var index:int = enemies.indexOf( entity );
			if ( index > -1 ) enemies.splice( index, 1 );

			if ( entity is Bullet == false ) return;

			index = bullets.indexOf( Bullet( entity ) );
			if ( index > -1 ) bullets.splice( index, 1 );
		}

	}
}
