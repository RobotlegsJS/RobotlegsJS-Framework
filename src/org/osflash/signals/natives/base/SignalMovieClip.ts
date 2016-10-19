	import { InteractiveObjectSignalSet } from "../sets/InteractiveObjectSignalSet";
	import { MovieClip } from "../../../../../flash/display/MovieClip";

	export class SignalMovieClip extends MovieClip
	{
		private _signals:InteractiveObjectSignalSet;

		public get signals():InteractiveObjectSignalSet
		{
			return this._signals ||this.= new InteractiveObjectSignalSet(this);
		}
	}
