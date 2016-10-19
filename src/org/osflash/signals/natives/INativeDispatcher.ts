	import { IPrioritySignal } from "../IPrioritySignal";

	import { Event } from "../../../../flash/events/Event";
	import { IEventDispatcher } from "../../../../flash/events/IEventDispatcher";

	/**
	 * Similar to IDispatcher but using strong types specific to Flash's native event system.
	 */
	export interface INativeDispatcher extends IPrioritySignal
	{
		/**
		 * The type of event permitted to be dispatched. Corresponds to flash.events.Event.type.
		 */
		eventType:string;
		
		/**
		 * The class of event permitted to be dispatched. Will be flash.events.Event or a subclass.
		 */
		eventClass:Object;
		
		/**
		 * The object considered the source of the dispatched events.
		 */
		target:IEventDispatcher;

		/*function set target(value:IEventDispatcher):void;*/

		/**
		 * Dispatches an event to listeners.
		 * @param	event			An instance of a class that is or extends flash.events.Event.
		 * @throws	ArgumentError	<code>ArgumentError</code>: Event object is <code>null</code>.
		 * @throws	ArgumentError	<code>ArgumentError</code>:	Event object [event] is not an instance of [eventClass].
		 * @throws	ArgumentError	<code>ArgumentError</code>:	Event object has incorrect type. Expected [eventType] but was [event.type].
		 * @throws  ArgumentError   <code>ArgumentError</code>:  Target object cannot be <code>null</code>.
		 */
		dispatchEvent(event:Event):boolean;
	}

