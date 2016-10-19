import { InteractiveObjectSignalSet } from "./InteractiveObjectSignalSet";

	import { NativeSignal } from "../NativeSignal";

	import { Event } from "../../../../../flash/events/Event";
	import { TextEvent } from "../../../../../flash/events/TextEvent";
	import { TextField } from "../../../../../flash/text/TextField";

	/**
	 * @author Jon Adams
	 */
	export class TextFieldSignalSet extends InteractiveObjectSignalSet {

		constructor(target:TextField){
			super(target);
		}

		public get change():NativeSignal {
			return this.getNativeSignal(Event.CHANGE);
		}
		public get link():NativeSignal {
			return this.getNativeSignal(TextEvent.LINK, TextEvent);
		}
	}

