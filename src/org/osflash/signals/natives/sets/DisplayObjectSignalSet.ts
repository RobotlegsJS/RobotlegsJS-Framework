import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";
{
	import { NativeSignal } from "../NativeSignal";

	import { DisplayObject } from "../../../../../flash/display/DisplayObject";
	import { Event } from "../../../../../flash/events/Event";

	/**
	 * @author Jon Adams
	 */
	export class DisplayObjectSignalSet extends EventDispatcherSignalSet 
	{
		
		constructor(target:DisplayObject){
			super(target);
		}

		public get added():NativeSignal 
		{
			return this.getNativeSignal(Event.ADDED);
		}
		public get addedToStage():NativeSignal 
		{
			return this.getNativeSignal(Event.ADDED_TO_STAGE);
		}
		public get enterFrame():NativeSignal 
		{
			return this.getNativeSignal(Event.ENTER_FRAME);
		}
		public get exitFrame():NativeSignal 
		{
			// Using a string here because we need to target FP9
			return this.getNativeSignal("exitFrame");
		}
		
		public get frameConstructed():NativeSignal 
		{
			// Using a string here because we need to target FP9
			return this.getNativeSignal("frameConstructed");
		}

		public get removed():NativeSignal 
		{
			return this.getNativeSignal(Event.REMOVED);
		}
		public get removedFromStage():NativeSignal 
		{
			return this.getNativeSignal(Event.REMOVED_FROM_STAGE);
		}
		public get render():NativeSignal 
		{
			return this.getNativeSignal(Event.RENDER);
		}
	}

