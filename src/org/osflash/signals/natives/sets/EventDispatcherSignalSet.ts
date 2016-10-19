import { NativeSignalSet } from "./NativeSignalSet";
{
	import { NativeSignal } from "../NativeSignal";

	import { Event } from "../../../../../flash/events/Event";
	import { EventDispatcher } from "../../../../../flash/events/EventDispatcher";

	/**
	 * @author Jon Adams
	 */
	export class EventDispatcherSignalSet extends NativeSignalSet 
	{
		constructor(target:EventDispatcher){
			super(target);
		}

		public get activate():NativeSignal 
		{
			return this.getNativeSignal(Event.ACTIVATE);
		}

		public get deactivate():NativeSignal 
		{	
			return this.getNativeSignal(Event.DEACTIVATE);
		}
	}

