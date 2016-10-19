import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";
	import { NativeSignal } from "../NativeSignal";

	import { AsyncErrorEvent } from "../../../../../flash/events/AsyncErrorEvent";
	import { IOErrorEvent } from "../../../../../flash/events/IOErrorEvent";
	import { NetStatusEvent } from "../../../../../flash/events/NetStatusEvent";
	import { SecurityErrorEvent } from "../../../../../flash/events/SecurityErrorEvent";
	import { NetConnection } from "../../../../../flash/net/NetConnection";

	/**
	 * @author Jon Adams
	 */
	export class NetConnectionSignalSet extends EventDispatcherSignalSet {

		constructor(target:NetConnection){
			super(target);
		}

		public get asyncError():NativeSignal {
			return this.getNativeSignal(AsyncErrorEvent.ASYNC_ERROR, AsyncErrorEvent);
		}

		public get ioError():NativeSignal {
			return this.getNativeSignal(IOErrorEvent.IO_ERROR, IOErrorEvent);
		}

		public get netStatus():NativeSignal {
			return this.getNativeSignal(NetStatusEvent.NET_STATUS, NetStatusEvent);
		}

		public get securityError():NativeSignal {
			return this.getNativeSignal(SecurityErrorEvent.SECURITY_ERROR, SecurityErrorEvent);
		}
	}

