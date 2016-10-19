import { InteractiveObjectSignalSet } from "./InteractiveObjectSignalSet";

	import { NativeSignal } from "../NativeSignal";

	import { Stage } from "../../../../../flash/display/Stage";
	import { Event } from "../../../../../flash/events/Event";

	/**
	 * @author Jon Adams
	 */
	export class StageSignalSet extends InteractiveObjectSignalSet
	{

		constructor(target:Stage){
			super(target);
		}

		public get fullScreen():NativeSignal
		{
			return this.getNativeSignal(Event.FULLSCREEN);
		}

		public get mouseLeave():NativeSignal
		{
			return this.getNativeSignal(Event.MOUSE_LEAVE);
		}

		public get resize():NativeSignal
		{
			return this.getNativeSignal(Event.RESIZE);
		}
	}

