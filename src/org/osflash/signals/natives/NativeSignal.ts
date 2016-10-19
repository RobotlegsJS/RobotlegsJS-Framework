import { INativeDispatcher } from "./INativeDispatcher";
	import { ISlot } from "../ISlot";
	import { Slot } from "../Slot";
	import { SlotList } from "../SlotList";

	import { IllegalOperationError } from "../../../../flash/errors/IllegalOperationError";
	import { Event } from "../../../../flash/events/Event";
	import { IEventDispatcher } from "../../../../flash/events/IEventDispatcher";

	/** 
	 * Allows the eventClass to be set in MXML, e.g.
	 * <natives:NativeSignal id="clicked" eventType="click" target="{this}">{MouseEvent}</natives:NativeSignal>
	 */
	/*[DefaultProperty("eventClass")]*/	
	
	/**
	 * The NativeSignal class provides a strongly-typed facade for an IEventDispatcher.
	 * A NativeSignal is essentially a mini-dispatcher locked to a specific event type and class.
	 * It can become part of an interface.
	 */
	export class NativeSignal implements INativeDispatcher
	{
		protected _target:IEventDispatcher;
		protected _eventType:string;
		protected _eventClass:Object;
		protected _valueClasses:any[];
		protected slots:SlotList;
		
		/**
		 * Creates a NativeSignal instance to dispatch events on behalf of a target object.
		 * @param	target The object on whose behalf the signal is dispatching events.
		 * @param	eventType The type of Event permitted to be dispatched from this signal. Corresponds to Event.type.
		 * @param	eventClass An optional class reference that enables an event type check in dispatch(). Defaults to flash.events.Event if omitted.
		 */
		constructor(target:IEventDispatcher = null, eventType:string = "", eventClass:Object = null){
			this.slots = SlotList.NIL;
			this.target = target;
			this.eventType = eventType;
			this.eventClass = eventClass;
		}
		
		/** @inheritDoc */
		public get eventType():string { return this._eventType; }

		public set eventType(value:string) { this._eventType = value; }
		
		/** @inheritDoc */
		public get eventClass():Object { return this._eventClass; }

		public set eventClass(value:Object)
		{
			this._eventClass = value || Event;
			this._valueClasses = [this._eventClass];
		}
		
		/** @inheritDoc */
		/*[ArrayElementType("Class")]*/
		public get valueClasses():any[] { return this._valueClasses; }

		public set valueClasses(value:any[])
		{
			this.eventClass = value && value.length > 0 ? value[0] : null;
		}
		
		/** @inheritDoc */
		public get numListeners():number { return this.slots.length; }
		
		/** @inheritDoc */
		public get target():IEventDispatcher { return this._target; }
		
		public set target(value:IEventDispatcher)
		{
			if (value == this._target) return;
			if (this._target) this.removeAll();
			this._target = value;
		}
		
		/**
		 * @inheritDoc
		 * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
		 * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
		 * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
		 */
		public add(listener:Function):ISlot
		{
			return this.addWithPriority(listener);
		}
		
		/**
		 * @inheritDoc
		 * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
		 * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
		 * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
		 */
		public addWithPriority(listener:Function, priority:number = 0):ISlot
		{
			return this.registerListenerWithPriority(listener, false, priority);
		}
		
		/**
		 * @inheritDoc
		 * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
		 * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
		 * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
		 */
		public addOnce(listener:Function):ISlot
		{
			return this.addOnceWithPriority(listener);
		}
		
		/**
		 * @inheritDoc
		 * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
		 * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
		 * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
		 */
		public addOnceWithPriority(listener:Function, priority:number = 0):ISlot
		{
			return this.registerListenerWithPriority(listener, true, priority);
		}
		
		/** @inheritDoc */
		public remove(listener:Function):ISlot
		{
			var slot:ISlot = this.slots.find(listener);
			if (!slot) return null;
			this._target.removeEventListener(this._eventType, slot.execute1);
			this.slots = this.slots.filterNot(listener);
			return slot;
		}
		
		/** @inheritDoc */
		public removeAll():void
		{
			var slotsToProcess:SlotList = this.slots;
			while (slotsToProcess.nonEmpty)
			{
				this.target.removeEventListener(this._eventType, slotsToProcess.head.execute1);
				slotsToProcess = slotsToProcess.tail;
			}
			this.slots = SlotList.NIL;
		}

		/**
		 * @inheritDoc
		 * @throws ArgumentError <code>ArgumentError</code>: Event object expected.
		 * @throws ArgumentError <code>ArgumentError</code>: No more than one Event object expected.
		 * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
		 * @throws ArgumentError <code>ArgumentError</code>: Event object cannot be <code>null</code>.
		 * @throws ArgumentError <code>ArgumentError</code>: Event object [event] is not an instance of [eventClass].
		 * @throws ArgumentError <code>ArgumentError</code>: Event object has incorrect type. Expected [eventType] but was [event.type].
		 */
		public dispatch(...valueObjects):void
		{
			//TODO: check if ...valueObjects can ever be null.
			if (null == valueObjects) throw new Error('Event object expected.');

			if (valueObjects.length != 1) throw new Error('No more than one Event object expected.');

			this.dispatchEvent((<Event>valueObjects[0] ));
		}

		/**
		 * Unlike other signals, NativeSignal does not dispatch null
		 * because it causes an exception in EventDispatcher.
		 * @inheritDoc
		 * @throws ArgumentError <code>ArgumentError</code>: Target object cannot be <code>null</code>.
		 * @throws ArgumentError <code>ArgumentError</code>: Event object cannot be <code>null</code>.
		 * @throws ArgumentError <code>ArgumentError</code>: Event object [event] is not an instance of [eventClass].
		 * @throws ArgumentError <code>ArgumentError</code>: Event object has incorrect type. Expected [eventType] but was [event.type].
		 */
		public dispatchEvent(event:Event):boolean
		{
			if (!this.target) throw new Error('Target object cannot be null.');
			if (!event)  throw new Error('Event object cannot be null.');
			
			if (!(event instanceof this.eventClass))
				throw new Error('Event object '+event+' is not an instance of '+this.eventClass+'.');
				
			if (event.type != this.eventType)
				throw new Error('Event object has incorrect type. Expected <'+this.eventType+'> but was <'+event.type+'>.');
			
			return this.target.dispatchEvent(event);
		}
		
		protected registerListenerWithPriority(listener:Function, once:boolean = false, priority:number = 0):ISlot
		{
			if (!this.target) throw new Error('Target object cannot be null.');

			if (this.registrationPossible(listener, once))
			{
				var slot:ISlot = new Slot(listener, this, once, priority);
				// Not necessary to insertWithPriority() because the target takes care of ordering.
				this.slots = this.slots.prepend(slot);
				this._target.addEventListener(this._eventType, slot.execute1, false, priority);
				return slot;
			}
			
			return this.slots.find(listener);
		}

		protected registrationPossible(listener:Function, once:boolean):boolean
		{
			if (!this.slots.nonEmpty) return true;

			var existingSlot:ISlot = this.slots.find(listener);
			if (existingSlot)
			{
				if (existingSlot.once != once)
				{
					// If the listener was previously added, definitely don't add it again.
					// But throw an exception if their once value differs.
					throw new IllegalOperationError('You cannot addOnce() then add() the same listener without removing the relationship first.');
				}

				// Listener was already added.
				return false;
			}

			// This listener has not been added before.
			return true;
		}

	}

