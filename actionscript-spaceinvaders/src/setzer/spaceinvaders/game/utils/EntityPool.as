package setzer.spaceinvaders.game.utils
{
	import flash.utils.Dictionary;

	import setzer.spaceinvaders.game.displays.BulletDisplay;
	import setzer.spaceinvaders.game.displays.CannonDisplay;
	import setzer.spaceinvaders.game.displays.EnemyDisplay;
	import setzer.spaceinvaders.game.displays.ExplosionDisplay;
	import setzer.spaceinvaders.game.entities.Bullet;
	import setzer.spaceinvaders.game.entities.Entity;
	import setzer.spaceinvaders.game.entities.Explosion;

	public class EntityPool
	{
		public static var dictionary:Dictionary;

		public static function init():void
		{
			dictionary = new Dictionary();
		}

		public static function getEntity( typeId:int ):Entity
		{
			if ( dictionary[typeId] == null ) dictionary[typeId] = new Vector.<Entity>();

			var list:Vector.<Entity> = dictionary[typeId];
			var entity:Entity = list.shift() || createEntityByType( typeId );

			if ( entity.display )
				entity.display.visible = true; else
			{
				entity.display = createDisplayByType( typeId );
			}

			return entity;
		}

		private static function createDisplayByType( typeId:int ):*
		{
			var typesDisplay:Object = {};
			typesDisplay[Entity.BULLET] = BulletDisplay;
			typesDisplay[Entity.ENEMY_1] = EnemyDisplay;
			typesDisplay[Entity.ENEMY_2] = EnemyDisplay;
			typesDisplay[Entity.ENEMY_3] = EnemyDisplay;
			typesDisplay[Entity.CANNON] = CannonDisplay;
			typesDisplay[Entity.EXPLOSION] = ExplosionDisplay;
			return new typesDisplay[typeId]( typeId );
		}

		private static function createEntityByType( typeId:int ):Entity
		{
			var entity:Entity;

			if ( typeId == Entity.BULLET )
				entity = new Bullet( typeId );
			else if ( typeId == Entity.EXPLOSION )
				entity = new Explosion( typeId );
			else
				entity = new Entity( typeId );
			return entity;
		}

		public static function back( entity:Entity ):void
		{
			var list:Vector.<Entity> = dictionary[entity.typeID];
			entity.display.visible = false;

			if ( list.indexOf( entity ) == -1 )
				list.push( entity );
		}
	}
}
