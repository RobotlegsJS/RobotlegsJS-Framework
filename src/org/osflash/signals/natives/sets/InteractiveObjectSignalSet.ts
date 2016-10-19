import { DisplayObjectSignalSet } from "./DisplayObjectSignalSet";
{
	import { NativeSignal } from "../NativeSignal";

	import { InteractiveObject } from "../../../../../flash/display/InteractiveObject";
	import { Event } from "../../../../../flash/events/Event";
	import { FocusEvent } from "../../../../../flash/events/FocusEvent";
	import { KeyboardEvent } from "../../../../../flash/events/KeyboardEvent";
	import { MouseEvent } from "../../../../../flash/events/MouseEvent";
	import { TextEvent } from "../../../../../flash/events/TextEvent";

	/**
	 * @author Jon Adams
	 */
	export class InteractiveObjectSignalSet extends DisplayObjectSignalSet 
	{
		
		constructor(target:InteractiveObject){
			super(target);
		}

		public get click():NativeSignal 
		{
			return this.getNativeSignal(MouseEvent.CLICK, MouseEvent);
		}

		public get doubleClick():NativeSignal 
		{
			return this.getNativeSignal(MouseEvent.DOUBLE_CLICK, MouseEvent);
		}

		public get focusIn():NativeSignal 
		{
			return this.getNativeSignal(FocusEvent.FOCUS_IN, FocusEvent);
		}

		public get focusOut():NativeSignal 
		{
			return this.getNativeSignal(FocusEvent.FOCUS_OUT, FocusEvent);
		}

		public get keyDown():NativeSignal 
		{
			return this.getNativeSignal(KeyboardEvent.KEY_DOWN, KeyboardEvent);
		}

		public get keyFocusChange():NativeSignal 
		{
			return this.getNativeSignal(FocusEvent.KEY_FOCUS_CHANGE, FocusEvent);
		}

		public get keyUp():NativeSignal 
		{
			return this.getNativeSignal(KeyboardEvent.KEY_UP, KeyboardEvent);
		}

		public get mouseDown():NativeSignal 
		{
			return this.getNativeSignal(MouseEvent.MOUSE_DOWN, MouseEvent);
		}

		public get mouseFocusChange():NativeSignal 
		{
			return this.getNativeSignal(FocusEvent.MOUSE_FOCUS_CHANGE, FocusEvent);
		}

		public get mouseMove():NativeSignal 
		{
			return this.getNativeSignal(MouseEvent.MOUSE_MOVE, MouseEvent);
		}

		public get mouseOut():NativeSignal 
		{
			return this.getNativeSignal(MouseEvent.MOUSE_OUT, MouseEvent);
		}

		public get mouseOver():NativeSignal 
		{
			return this.getNativeSignal(MouseEvent.MOUSE_OVER, MouseEvent);
		}

		public get mouseUp():NativeSignal 
		{
			return this.getNativeSignal(MouseEvent.MOUSE_UP, MouseEvent);
		}

		public get mouseWheel():NativeSignal 
		{
			return this.getNativeSignal(MouseEvent.MOUSE_WHEEL, MouseEvent);
		}

		public get rollOut():NativeSignal 
		{
			return this.getNativeSignal(MouseEvent.ROLL_OUT, MouseEvent);
		}

		public get rollOver():NativeSignal 
		{
			return this.getNativeSignal(MouseEvent.ROLL_OVER, MouseEvent);
		}

		public get tabChildrenChange():NativeSignal 
		{
			return this.getNativeSignal(Event.TAB_CHILDREN_CHANGE);
		}

		public get tabEnabledChange():NativeSignal 
		{
			return this.getNativeSignal(Event.TAB_ENABLED_CHANGE);
		}

		public get tabIndexChange():NativeSignal 
		{
			return this.getNativeSignal(Event.TAB_INDEX_CHANGE);
		}

		public get textInput():NativeSignal 
		{
			return this.getNativeSignal(TextEvent.TEXT_INPUT, TextEvent);
		}
	}

