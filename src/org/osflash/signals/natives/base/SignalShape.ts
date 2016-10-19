	import { DisplayObjectSignalSet } from "../sets/DisplayObjectSignalSet";

	import { Shape } from "../../../../../flash/display/Shape";

	/**
	 * @author Simon Richardson - me@simonrichardson.info
	 */
	export class SignalShape extends Shape
	{

		private _signals:DisplayObjectSignalSet;

		public get signals():DisplayObjectSignalSet
		{
			return this._signals ||this.= new DisplayObjectSignalSet(this);
		}
	}

