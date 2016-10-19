
	import { TextField } from "../../../../../flash/text/TextField";
	import { TextFieldSignalSet } from "../sets/TextFieldSignalSet";
	
	export class SignalTextField extends TextField
	{
		private _signals:TextFieldSignalSet;
				
		public get signals():TextFieldSignalSet 
		{ 
			return this._signals ||this.= new TextFieldSignalSet(this);
		}
	}
