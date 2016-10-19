import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";

	import { NativeSignal } from "../NativeSignal";

	import { LoaderInfo } from "../../../../../flash/display/LoaderInfo";
	import { Event } from "../../../../../flash/events/Event";
	import { HTTPStatusEvent } from "../../../../../flash/events/HTTPStatusEvent";
	import { IOErrorEvent } from "../../../../../flash/events/IOErrorEvent";
	import { ProgressEvent } from "../../../../../flash/events/ProgressEvent";

	/**
	 * @author Jon Adams
	 */
	export class LoaderInfoSignalSet extends EventDispatcherSignalSet {

		constructor(target:LoaderInfo){
			super(target);
		}

		public get complete():NativeSignal {
			return this.getNativeSignal(Event.COMPLETE);
		}

		public get httpStatus():NativeSignal {
			return this.getNativeSignal(HTTPStatusEvent.HTTP_STATUS, HTTPStatusEvent);
		}

		public get init():NativeSignal {
			return this.getNativeSignal(Event.INIT);
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

		public get unload():NativeSignal {
			return this.getNativeSignal(Event.UNLOAD);
		}
	}

