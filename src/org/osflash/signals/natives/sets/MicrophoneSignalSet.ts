import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";

	import { NativeSignal } from "../NativeSignal";

	import { ActivityEvent } from "../../../../../flash/events/ActivityEvent";
	import { StatusEvent } from "../../../../../flash/events/StatusEvent";
	import { Microphone } from "../../../../../flash/media/Microphone";

	/**
	 * @author Jon Adams
	 */
	export class MicrophoneSignalSet extends EventDispatcherSignalSet {

		constructor(target:Microphone){
			super(target);
		}

		public get activity():NativeSignal {
			return this.getNativeSignal(ActivityEvent.ACTIVITY, ActivityEvent);
		}
		public get status():NativeSignal {
			return this.getNativeSignal(StatusEvent.STATUS, StatusEvent);
		}
	}

