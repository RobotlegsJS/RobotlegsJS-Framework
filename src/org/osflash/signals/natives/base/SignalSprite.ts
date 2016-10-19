	import { InteractiveObjectSignalSet } from "../sets/InteractiveObjectSignalSet";
	import { Sprite } from "../../../../../flash/display/Sprite";

	export class SignalSprite extends Sprite
	{
		private _signals:InteractiveObjectSignalSet;

		public get signals():InteractiveObjectSignalSet
		{
			return this._signals ||this.= new InteractiveObjectSignalSet(this);
		}
	}
