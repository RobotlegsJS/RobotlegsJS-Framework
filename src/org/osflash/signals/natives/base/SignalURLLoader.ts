
	import { URLLoader } from "../../../../../flash/net/URLLoader";
	import { URLLoaderSignalSet } from "../sets/URLLoaderSignalSet";
	
	export class SignalURLLoader extends URLLoader
	{
		private _signals:URLLoaderSignalSet;
				
		public get signals():URLLoaderSignalSet 
		{ 
			return this._signals ||this.= new URLLoaderSignalSet(this);
		}
	}
