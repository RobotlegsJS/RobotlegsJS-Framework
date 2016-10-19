import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";

	import { NativeSignal } from "../NativeSignal";

	import { TimerEvent } from "../../../../../flash/events/TimerEvent";
	import { Timer } from "../../../../../flash/utils/Timer";

	/**
	 * @author Jon Adams
	 */
	export class TimerSignalSet extends EventDispatcherSignalSet {

		constructor(target:Timer){
			super(target);
		}

		public get timer():NativeSignal {
			return this.getNativeSignal(TimerEvent.TIMER, TimerEvent);
		}
		public get timerComplete():NativeSignal {
			return this.getNativeSignal(TimerEvent.TIMER_COMPLETE, TimerEvent);
		}
	}

