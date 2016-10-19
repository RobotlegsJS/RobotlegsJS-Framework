
	import { XMLSocket } from "../../../../../flash/net/XMLSocket";
	import { XMLSocketSignalSet } from "../sets/XMLSocketSignalSet";
	
	export class SignalXMLSocket extends XMLSocket
	{
		private _signals:XMLSocketSignalSet;
				
		public get signals():XMLSocketSignalSet 
		{ 
			return this._signals ||this.= new XMLSocketSignalSet(this);
		}
	}
