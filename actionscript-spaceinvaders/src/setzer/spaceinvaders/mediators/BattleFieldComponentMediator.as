package setzer.spaceinvaders.mediators
{
	import flash.utils.Dictionary;

	import robotlegs.bender.extensions.palidor.starlingIntegration.starlingViewMap.impl.StarlingMediator;

	import setzer.spaceinvaders.events.GameEvent;
	import setzer.spaceinvaders.game.entities.Entity;
	import setzer.spaceinvaders.game.managers.GameManager;
	import setzer.spaceinvaders.game.models.LevelModel;
	import setzer.spaceinvaders.game.utils.EntityPool;
	import setzer.spaceinvaders.views.components.BattleFieldComponent;

	import starling.events.Event;
	import starling.events.KeyboardEvent;

	public class BattleFieldComponentMediator extends StarlingMediator
	{
		[Inject]
		public var levelModel:LevelModel;

		[Inject]
		public var view:BattleFieldComponent;

		[Inject]
		public var gameManager:GameManager;

		private var _displays:Dictionary;

		override public function initialize():void
		{
			_displays = new Dictionary();

			eventMap.mapListener( eventDispatcher, GameEvent.CLEAR_BATTLE_FIELD, game_onClearBattleFieldHandler );
			eventMap.mapListener( eventDispatcher, GameEvent.UPDATE_BATTLE_FIELD, game_onUpdateBattleFieldHandler );
			eventMap.mapListener( eventDispatcher, GameEvent.RESUME, game_onResumeGameHandler );
			eventMap.mapListener( eventDispatcher, GameEvent.PAUSE, game_onPauseGameHandler );
			eventMap.mapListener( eventDispatcher, GameEvent.GAME_OVER, game_onGameOVerHandler );
		}

		private function game_onGameOVerHandler( e:Event ):void
		{
			eventMap.unmapListener( view, Event.ENTER_FRAME, enterFrame_Handler );
			eventMap.unmapListener( view.stage, KeyboardEvent.KEY_DOWN, keyDown_onMovementHandler );
			eventMap.unmapListener( view.stage, KeyboardEvent.KEY_UP, keyUp_onMovementHandler );
		}

		private function game_onPauseGameHandler( e:Event ):void
		{
			eventMap.unmapListener( view, Event.ENTER_FRAME, enterFrame_Handler );
			eventMap.unmapListener( view.stage, KeyboardEvent.KEY_DOWN, keyDown_onMovementHandler );
			eventMap.unmapListener( view.stage, KeyboardEvent.KEY_UP, keyUp_onMovementHandler );
		}

		private function game_onResumeGameHandler( e:Event ):void
		{
			gameManager.resume();
			eventMap.mapListener( view.stage, KeyboardEvent.KEY_DOWN, keyDown_onMovementHandler );
			eventMap.mapListener( view.stage, KeyboardEvent.KEY_UP, keyUp_onMovementHandler );
			eventMap.mapListener( view, Event.ENTER_FRAME, enterFrame_Handler );
		}

		private function keyDown_onMovementHandler( e:KeyboardEvent ):void
		{
			e.stopImmediatePropagation();
			if ( e.keyCode == 37 ) gameManager.cannonMovement( -3 );
			if ( e.keyCode == 39 ) gameManager.cannonMovement( 3 );
			if ( e.keyCode == 32 ) gameManager.startShooting();

		}

		private function keyUp_onMovementHandler( e:KeyboardEvent ):void
		{
			e.stopImmediatePropagation();

			if ( e.keyCode == 37 || e.keyCode == 39 )  gameManager.cannonMovement( 0 );
			if ( e.keyCode == 32 ) gameManager.stopShooting();
		}

		private function enterFrame_Handler( e:Event ):void
		{
			gameManager.update();
			if ( levelModel.toAdd.length > 0 || levelModel.toRemove.length > 0 ) updateDisplays();
		}

		private function game_onUpdateBattleFieldHandler( e:Event ):void
		{
			updateDisplays();
		}

		private function game_onClearBattleFieldHandler( e:Event ):void
		{
			for ( var entity:Entity in _displays )
			{
				removeDisplayFromStage( Entity( entity ) );
			}
		}

		public function updateDisplays():void
		{
			var entity:Entity;
			while ( levelModel.toAdd.length > 0 )
			{
				entity = levelModel.toAdd.pop();
				if ( _displays[entity] ) continue;

				addDisplayToStage( entity );
			}

			while ( levelModel.toRemove.length > 0 )
			{
				entity = levelModel.toRemove.pop();
				levelModel.removeEntity( entity );
				removeDisplayFromStage( entity );
			}
		}

		public function addDisplayToStage( entity:Entity ):void
		{
			view.addChild( entity.display );
			_displays[entity] = entity.display;
		}

		public function removeDisplayFromStage( entity:Entity ):void
		{
			EntityPool.back( entity );
			entity.display.removeFromParent();
			delete  _displays[entity];
		}

		override public function destroy():void
		{
			eventMap.unmapListeners();
		}
	}
}
