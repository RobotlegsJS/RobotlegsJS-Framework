import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";

	import { NativeSignal } from "../NativeSignal";

	import { DataEvent } from "../../../../../flash/events/DataEvent";
	import { Event } from "../../../../../flash/events/Event";
	import { HTTPStatusEvent } from "../../../../../flash/events/HTTPStatusEvent";
	import { IOErrorEvent } from "../../../../../flash/events/IOErrorEvent";
	import { ProgressEvent } from "../../../../../flash/events/ProgressEvent";
	import { SecurityErrorEvent } from "../../../../../flash/events/SecurityErrorEvent";
	import { FileReference } from "../../../../../flash/net/FileReference";

	/**
	 * @author Jon Adams
	 */
	export class FileReferenceSignalSet extends EventDispatcherSignalSet {

		constructor(target:FileReference){
			super(target);
		}

		public get cancel():NativeSignal {
			return this.getNativeSignal(Event.CANCEL);
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
		public get select():NativeSignal {
			return this.getNativeSignal(Event.SELECT);
		}
		public get uploadCompleteData():NativeSignal {
			return this.getNativeSignal(DataEvent.UPLOAD_COMPLETE_DATA, DataEvent);
		}
	}

