import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";
	import { NativeSignal } from "../NativeSignal";

	import { Event } from "../../../../../flash/events/Event";
	import { FileReference } from "../../../../../flash/net/FileReference";

	/**
	 * @author Jon Adams
	 */
	export class FileReferenceListSignalSet extends EventDispatcherSignalSet {

		constructor(target:FileReference){
			super(target);
		}

		public get cancel():NativeSignal {
			return this.getNativeSignal(Event.CANCEL);
		}

		public get select():NativeSignal {
			return this.getNativeSignal(Event.SELECT);
		}
	}

