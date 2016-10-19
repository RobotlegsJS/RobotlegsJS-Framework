
	import { INativeDispatcher } from "../INativeDispatcher";
	import { NativeSignal } from "../NativeSignal";

	import { Event } from "../../../../../flash/events/Event";
	import { IEventDispatcher } from "../../../../../flash/events/IEventDispatcher";
	import { Dictionary } from "../../../../../flash/utils/Dictionary";

	/**
	 * A convenient way to access a logical set of signals.
	 * 
	 * @author Jon Adams
	 * 
	 * @example SignalSets allow you to get predefined signals for many built in events
	 * <listing version="3.0" >
		package {
			import org.osflash.signals.natives.sets.InteractiveObjectSignalSet;
		
			import flash.display.Sprite;
			import flash.events.Event;
		
			public class Example extends Sprite {
		
				private var button:Sprite;
				private var buttonSignals:InteractiveObjectSignalSet;
		
				public function Main() {
					button = new Sprite();
					button.graphics.beginFill(0xff0000);
					button.graphics.drawRect(0, 0, 100, 100);
					button.graphics.endFill();
					
					buttonSignals = new InteractiveObjectSignalSet(button);
					buttonSignals.click.add(handler);
					buttonSignals.addedToStage.add(handler);
					buttonSignals.enterFrame.addOnce(handler);
					
					addChild(button);
				}
		
				private function handler(event:Event):void {
					trace(event.target, "fired", event.type);
				}
			}
		}
	 * </listing>
	 */
	export class NativeSignalSet 
	{
		protected target:IEventDispatcher;
		
		protected _signals:Map<any, any> = new Map<any, any>();

		constructor(target:IEventDispatcher){
			this.target = target;
		}

		/**
		 * Lazily instantiates a NativeSignal
		 * @throws ArgumentError <code>ArgumentError</code>: eventType must not be null.
		 */
		public getNativeSignal(eventType:string, eventClass:Object = null):NativeSignal 
		{
			if(null == eventType) throw new Error('eventType must not be null.');
			
			return this._signals[eventType] ||this.= new NativeSignal(this.target, eventType, eventClass || Event);
		}

		/**
		 * The current number of listeners for the signal.
		 */
		public get numListeners():number 
		{
			// TODO : This is horrid, it's very expensive to call this if there is a lot of signals.
			var count:number = 0;
			for  (let signal of this._signals) 
			{
				count += signal.numListeners;
			}
			return count;
		}
		
		/**
		 * The signals in the SignalSet as an Array.
		 */
		public get signals():any[] 
		{
			// TODO : This is horrid, it's very expensive to call this if there is a lot of signals.
			var result:any[] = [];
			for  (let signal of this._signals) 
			{
				result[result.length] = signal;
			}
			return result;
		}
		
		/**
		 * Unsubscribes all listeners from all signals in the set.
		 */
		public removeAll():void 
		{
			for  (let signal of this._signals) 
			{
				signal.removeAll();
				delete this._signals[signal.eventType];
			}
		}
	}

