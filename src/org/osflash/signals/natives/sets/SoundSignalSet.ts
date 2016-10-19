import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";
	import { NativeSignal } from "../NativeSignal";

	import { Event } from "../../../../../flash/events/Event";
	import { IOErrorEvent } from "../../../../../flash/events/IOErrorEvent";
	import { ProgressEvent } from "../../../../../flash/events/ProgressEvent";
	import { Sound } from "../../../../../flash/media/Sound";

	/**
	 * @author Jon Adams
	 */
	export class SoundSignalSet extends EventDispatcherSignalSet {

		constructor(target:Sound){
			super(target);
		}

		public get complete():NativeSignal {
			return this.getNativeSignal(Event.COMPLETE);
		}

		public get id3():NativeSignal {
			return this.getNativeSignal(Event.ID3);
		}

		public get ioError():NativeSignal {
			return this.getNativeSignal(IOErrorEvent.IO_ERROR, IOErrorEvent);
		}

		public get open():NativeSignal {
			return this.getNativeSignal(Event.OPEN);
		}

		public get progress():NativeSignal {
			return this.getNativeSignal(ProgressEvent.PROGRESS, ProgressEvent);
		}
	}

