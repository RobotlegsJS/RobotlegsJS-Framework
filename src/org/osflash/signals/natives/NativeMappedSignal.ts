import { NativeRelaySignal } from "./NativeRelaySignal";
	import { SlotList } from "../SlotList";

	import { Event } from "../../../../flash/events/Event";
	import { IEventDispatcher } from "../../../../flash/events/IEventDispatcher";
	import { getQualifiedClassName } from "../../../../flash/utils/getQualifiedClassName";

	/**
	 * <p>
	 * The NativeMappedSignal class is used to map/transform a native Event, 
	 * relayed from an IEventDispatcher, into other forms of data, 
	 * which are dispatched to all listeners.
	 * </p>
	 * <p>This can be used to form a border where native flash Events do not cross.</p>
	 */
	export class NativeMappedSignal extends NativeRelaySignal
	{
		/**
		 * @default is null, no mapping will occur 
		 */		
		private _mappingFunction:Function = null;
		
		/*open for extension but closed for modifications*/
		protected get mappingFunction ():Function 
		{
			return this._mappingFunction;
		}
		
		/**
		 * Creates a new NativeMappedSignal instance to map/transform a native Event, 
	 	 * relayed from an IEventDispatcher, into other forms of data, 
	 	 * which are dispatched to all listeners.
		 * 
		 * @param	target	An object that implements the flash.events.IEventDispatcher interface.
		 * @param	eventType The event string name that would normally be passed to IEventDispatcher.addEventListener().
		 * @param 	eventClass An optional class reference that enables an event type check in dispatch().
		 * @param	mappedTypes an optional list of types that enables the checking of the types mapped from an Event. 
		 */
		constructor(target:IEventDispatcher, eventType:string, eventClass:Object=null, ... mappedTypes){
			super(target, eventType, eventClass);
			this.valueClasses = mappedTypes;
		}

		/**
		 * @inheritDoc
		 */
		/*override*/ public get eventClass():Object { return this._eventClass; }

		/*override*/ public set eventClass(value:Object) { this._eventClass = value; }

		/**
		 * @inheritDoc
		 * @throws ArgumentError <code>ArgumentError</code>: Invalid valueClasses argument: item at index should be a Class but was not.
		 */
		/*override*/ public set valueClasses(value:any[])
		{
			this._valueClasses = value ? value.slice() : [];
			
			for (var i:number = this._valueClasses.length; i--; )
			{
				if (!(this._valueClasses[i] instanceof Class))
				{
					throw new Error('Invalid valueClasses argument: ' +
						'item at index ' + i + ' should be a Class but was:<' +
						this._valueClasses[i] + '>.' + getQualifiedClassName(this._valueClasses[i]));
				}
			}
		}
		
		/**
		 * Sets the mapping function or literal object list.
		 * If the argument is a list of object literals then this list is dispatched to listeners.
		 * 
		 * <listing version="3.0">
		 *  signal = new NativeMappedSignal(button, MouseEvent.CLICK, MouseEvent, String).mapTo("ping")
		 *  signal.add(function(arg:String):void { trace(arg) }) // prints "ping"
		 * </listing>
		 * 
		 * And an example passing a list of literals:
		 * 
		 * <listing version="3.0">
		 *  signal = new NativeMappedSignal(button, MouseEvent.CLICK, MouseEvent, String, int, Number).mapTo("ping", 3, 3.1415)
		 *  signal.add(function(arg1:String, arg2:int, arg3:Number):void { trace(arg1, arg2, arg3) }) // prints "ping", 3, 3.1415
		 * </listing>
		 * 
		 * If the argument is a function then it is called when the event this NativeMappedSignal is listening for is dispatched.
		 * The function should return an Array or a single object. The data returned from the function is passed along as arguments in the Signal dispatch.
		 * Lets look at some examples of mapping functions and the function that is called back:
		 * 
		 * <listing version="3.0">
		 *  signal = new NativeMappedSignal(button, MouseEvent.CLICK, MouseEvent, String).mapTo(function():void { 
		 *    return "ping"
		 *  })
		 *  signal.add(function(arg:String):void { trace(arg) }) // prints "ping"
		 * </listing>
		 * 
		 * and here's an example using a list of arguments:
		 * 
		 * <listing version="3.0">
		 *  signal = new NativeMappedSignal(button, MouseEvent.CLICK, MouseEvent, String, int, Number).mapTo(function():void { 
		 *    return ["ping", 3, 3.1415] 
		 *  })
		 * 	signal.add(function(arg1:String, arg2:int, arg3:Number):void { trace(arg1, arg2, arg3) }) // prints "ping", 3, 3.1415
		 * </listing>
		 * 
		 * You can also state your wish to receive the native Event in th mapping function by simply including an argument of type Event:
		 * 
		 * <listing version="3.0">
		 *  signal = new NativeMappedSignal(button, MouseEvent.CLICK, MouseEvent, Point).mapTo(function(event:MouseEvent):void { 
		 *    return new Point(event.localX, event.localY)
		 *  })
		 *  signal.add(function(arg:Point):void { trace(arg) }) // prints "(x=128, y=256)"
		 * </listing> 
		 * 
		 * @param objectListOrFunction This can either be a list of object literals or a function that returns list of objects. 
		 * @return The NativeMappedSignal object this method was called on. This allows the Signal to be defined and mapped in one statement.
		 * @throws ArgumentError <code>ArgumentError</code>: Mapping function needs zero or one arguments of type Event
		 */		
		public mapTo(...objectListOrFunction):NativeMappedSignal
		{
			if (objectListOrFunction.length == 1 && objectListOrFunction[0] instanceof Function)
			{
				this._mappingFunction = (<Function>objectListOrFunction[0] );
				
				if (this._mappingFunction.length > 1)
				{	
					throw new Error('Mapping function has ' + this._mappingFunction.length 
						+ ' arguments but it needs zero or one of type Event');
				}
			}
			else
			{
				this._mappingFunction = function ():Object { return objectListOrFunction; };
			}
			
			return this;
		}


		/**
		 * For usage without extension, instances of <code>NativeMappedSignal</code> that are dispatching any values ( <code>valueClasses.length > 0</code> ),
		 * needs to be provided with a either a mapping function or a list of object literals.
		 * See <code>mapTo</code> for more info.
		 * 
		 * Subclasses could override this one instead of letting the environment set the mapTo,
		 * MAKE SURE to also override <code>mapTo(...)</code> if it should not be allowed.
		 *
		 * @parameter eventFromTarget the event that was dispatched from target.
		 * @return An object or Array of objects mapped from an Event. The mapping of Event to data will be performed by the mapping function
		 * if it is set. A list of object literals can also be supplied in place of the mapping function.
		 * If no mapping function or object literals are supplied then an empty Array is returned or
		 * if <code>valueClasses.length > 0</code> an ArgumentError is thrown.
		 *
		 * @see #mapTo()
		 */
		protected mapEvent(eventFromTarget:Event):Object
		{
			if (this.mappingFunction != null)
			{
				if (this.mappingFunction.length == 1)//todo invariant
				{
					return (this.mappingFunction)(eventFromTarget);
				}
				else
				{
					return this.mappingFunction();
				}
			} 
			else if (this.valueClasses.length == 0) 
			{
				return [];
			}
			
			throw new Error("There are valueClasses set to be dispatched <" + this.valueClasses 
				+ "> but mappingFunction is null.");
		}

		/*override*/ public dispatchEvent(event:Event):boolean
		{
			//TODO: this is only required for backwards compatibility
			var mappedData:Object = this.mapEvent(event);
			var numValueClasses:number = this.valueClasses.length;

			if (mappedData instanceof Array)
			{
				var valueObjects:any[] = (<Array>mappedData );

				var valueObject:Object;
				var valueClass:Object;

				for (var i:number = 0; i < numValueClasses; i++)
				{
					valueObject = valueObjects[i];
					valueClass = this.valueClasses[i];

					if (valueObject === null || valueObject instanceof valueClass) continue;

					throw new Error('Value object <'+valueObject
						+'> is not an instance of <'+valueClass+'>.');
				}
			}
			else if (numValueClasses > 1)
			{
				throw new Error('Expected more than one value.');
			}
			else if (!(mappedData instanceof this.valueClasses[0]))
			{
				throw new Error('Mapping returned '+
						getQualifiedClassName(mappedData)+', expected '+
						this.valueClasses[0]+'.');
			}

			return super.dispatchEvent(event);
		}

		/*override*/ protected onNativeEvent(event:Event):void
		{
			var mappedData:Object = this.mapEvent(event);
			var slotsToProcess:SlotList = this.slots;

			if (mappedData instanceof Array)
			{
				if (this.valueClasses.length == 1 && this.valueClasses[0] == Array)//TODO invariant
				{
					while (slotsToProcess.nonEmpty)
					{
						slotsToProcess.head.execute1(mappedData);
						slotsToProcess = slotsToProcess.tail;
					}
				}
				else
				{
					var mappedDataArray:any[] = (<Array>mappedData );

					while (slotsToProcess.nonEmpty)
					{
						slotsToProcess.head.execute(mappedDataArray);
						slotsToProcess = slotsToProcess.tail;
					}
				}
			}
			else
			{				
				while (slotsToProcess.nonEmpty)
				{
					slotsToProcess.head.execute1(mappedData);
					slotsToProcess = slotsToProcess.tail;
				}
			}
		}
	}
