
	import { Timer } from "../../../../../flash/utils/Timer";
	import { TimerSignalSet } from "../sets/TimerSignalSet";
	
	export class SignalTimer extends Timer
	{
		private _signals:TimerSignalSet;
				
		public get signals():TimerSignalSet 
		{ 
			return this._signals ||this.= new TimerSignalSet(this);
		}
		
		constructor(delay:number, repeatCount:number = 0){
			super(delay, repeatCount);
		}
	}
