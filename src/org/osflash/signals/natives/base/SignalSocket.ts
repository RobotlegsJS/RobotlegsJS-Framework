
	import { Socket } from "../../../../../flash/net/Socket";
	import { SocketSignalSet } from "../sets/SocketSignalSet";
	
	export class SignalSocket extends Socket
	{
		private _signals:SocketSignalSet;
				
		public get signals():SocketSignalSet 
		{ 
			return this._signals ||this.= new SocketSignalSet(this);
		}
	}
