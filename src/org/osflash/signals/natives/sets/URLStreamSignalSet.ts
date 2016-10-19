import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";

	import { NativeSignal } from "../NativeSignal";

	import { Event } from "../../../../../flash/events/Event";
	import { HTTPStatusEvent } from "../../../../../flash/events/HTTPStatusEvent";
	import { IOErrorEvent } from "../../../../../flash/events/IOErrorEvent";
	import { ProgressEvent } from "../../../../../flash/events/ProgressEvent";
	import { SecurityErrorEvent } from "../../../../../flash/events/SecurityErrorEvent";
	import { URLStream } from "../../../../../flash/net/URLStream";

	/**
	 * @author Jon Adams
	 */
	export class URLStreamSignalSet extends EventDispatcherSignalSet {

		constructor(target:URLStream){
			super(target);
		}

		public get complete():NativeSignal {
			return this.getNativeSignal(Event.COMPLETE);
		}
		public get httpStatus():NativeSignal {
			return this.getNativeSignal(HTTPStatusEvent.HTTP_STATUS, HTTPStatusEvent);
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
		public get securityError():NativeSignal {
			return this.getNativeSignal(SecurityErrorEvent.SECURITY_ERROR, SecurityErrorEvent);
		}
	}

