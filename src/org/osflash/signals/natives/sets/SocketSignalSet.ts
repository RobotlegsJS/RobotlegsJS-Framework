import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";
	import { NativeSignal } from "../NativeSignal";

	import { Event } from "../../../../../flash/events/Event";
	import { IOErrorEvent } from "../../../../../flash/events/IOErrorEvent";
	import { ProgressEvent } from "../../../../../flash/events/ProgressEvent";
	import { SecurityErrorEvent } from "../../../../../flash/events/SecurityErrorEvent";
	import { Socket } from "../../../../../flash/net/Socket";

	/**
	 * @author Jon Adams
	 */
	export class SocketSignalSet extends EventDispatcherSignalSet {

		constructor(target:Socket){
			super(target);
		}

		public get close():NativeSignal {
			return this.getNativeSignal(Event.CLOSE);
		}

		public get connect():NativeSignal {
			return this.getNativeSignal(Event.CONNECT);
		}

		public get ioError():NativeSignal {
			return this.getNativeSignal(IOErrorEvent.IO_ERROR, IOErrorEvent);
		}

		public get securityError():NativeSignal {
			return this.getNativeSignal(SecurityErrorEvent.SECURITY_ERROR, SecurityErrorEvent);
		}

		public get socketData():NativeSignal {
			return this.getNativeSignal(ProgressEvent.SOCKET_DATA, ProgressEvent);
		}
	}

