	import { DisplayObjectSignalSet } from "../sets/DisplayObjectSignalSet";
	import { Bitmap } from "../../../../../flash/display/Bitmap";

	/**
	 * @author Simon Richardson - me@simonrichardson.info
	 */
	export class SignalBitmap extends Bitmap
	{
		private _signals:DisplayObjectSignalSet;

		public get signals():DisplayObjectSignalSet
		{
			return this._signals ||this.= new DisplayObjectSignalSet(this);
		}
	}

