import { EventDispatcherSignalSet } from "./EventDispatcherSignalSet";
	import { NativeSignal } from "../NativeSignal";

	import { Event } from "../../../../../flash/events/Event";
	import { SoundChannel } from "../../../../../flash/media/SoundChannel";

	/**
	 * @author Jon Adams
	 */
	export class SoundChannelSignalSet extends EventDispatcherSignalSet {

		constructor(target:SoundChannel){
			super(target);
		}

		public get soundComplete():NativeSignal {
			return this.getNativeSignal(Event.SOUND_COMPLETE);
		}
	}

