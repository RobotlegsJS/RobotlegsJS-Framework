import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";

	import { NativeSignal } from "../NativeSignal";

	import { DataEvent } from "../../../../../flash/events/DataEvent";
	import { Event } from "../../../../../flash/events/Event";
	import { IOErrorEvent } from "../../../../../flash/events/IOErrorEvent";
	import { SecurityErrorEvent } from "../../../../../flash/events/SecurityErrorEvent";
	import { XMLSocket } from "../../../../../flash/net/XMLSocket";

	/**
	 * @author Jon Adams
	 */
	export class XMLSocketSignalSet extends EventDispatcherSignalSet {

		constructor(target:XMLSocket){
			super(target);
		}

		public get close():NativeSignal {
			return this.getNativeSignal(Event.CLOSE);
		}
		public get connect():NativeSignal {
			return this.getNativeSignal(Event.CONNECT);
		}
		public get data():NativeSignal {
			return this.getNativeSignal(DataEvent.DATA, DataEvent);
		}
		public get ioError():NativeSignal {
			return this.getNativeSignal(IOErrorEvent.IO_ERROR, IOErrorEvent);
		}
		public get securityError():NativeSignal {
			return this.getNativeSignal(SecurityErrorEvent.SECURITY_ERROR, SecurityErrorEvent);
		}
	}

