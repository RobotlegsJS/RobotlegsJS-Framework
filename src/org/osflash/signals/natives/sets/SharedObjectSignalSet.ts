import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";

	import { NativeSignal } from "../NativeSignal";

	import { AsyncErrorEvent } from "../../../../../flash/events/AsyncErrorEvent";
	import { NetStatusEvent } from "../../../../../flash/events/NetStatusEvent";
	import { SyncEvent } from "../../../../../flash/events/SyncEvent";
	import { SharedObject } from "../../../../../flash/net/SharedObject";

	/**
	 * @author Jon Adams
	 */
	export class SharedObjectSignalSet extends EventDispatcherSignalSet {

		constructor(target:SharedObject){
			super(target);
		}

		public get asyncError():NativeSignal {
			return this.getNativeSignal(AsyncErrorEvent.ASYNC_ERROR, AsyncErrorEvent);
		}
		public get netStatus():NativeSignal {
			return this.getNativeSignal(NetStatusEvent.NET_STATUS, NetStatusEvent);
		}
		public get sync():NativeSignal {
			return this.getNativeSignal(SyncEvent.SYNC, SyncEvent);
		}
	}

