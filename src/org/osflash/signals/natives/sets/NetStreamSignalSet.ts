import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";

	import { NativeSignal } from "../NativeSignal";

	import { AsyncErrorEvent } from "../../../../../flash/events/AsyncErrorEvent";
	import { IOErrorEvent } from "../../../../../flash/events/IOErrorEvent";
	import { NetStatusEvent } from "../../../../../flash/events/NetStatusEvent";
	import { NetStream } from "../../../../../flash/net/NetStream";

	/**
	 * @author Jon Adams
	 */
	export class NetStreamSignalSet extends EventDispatcherSignalSet {

		constructor(target:NetStream){
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
	}

