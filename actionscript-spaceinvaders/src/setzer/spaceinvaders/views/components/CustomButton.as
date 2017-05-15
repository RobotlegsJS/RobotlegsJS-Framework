package setzer.spaceinvaders.views.components
{
	import flash.geom.Rectangle;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	import flash.utils.Dictionary;

	import setzer.spaceinvaders.utils.Colors;

	import starling.display.ButtonState;
	import starling.display.DisplayObjectContainer;
	import starling.display.Image;
	import starling.display.Quad;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	import starling.styles.MeshStyle;
	import starling.text.TextField;
	import starling.text.TextFormat;
	import starling.textures.Texture;

	[Event(name="triggered", type="starling.events.Event")]
	public class CustomButton extends DisplayObjectContainer
	{
		private static const MAX_DRAG_DIST:Number = 50;

		private var _upState:Texture;
		private var _downState:Texture;
		private var _overState:Texture;
		private var _disabledState:Texture;

		private var _contents:Sprite;
		private var _body:Image;
		private var _bodyBackground:Quad;
		private var _textField:TextField;
		private var _textBounds:Rectangle;
		private var _overlay:Sprite;

		private var _scaleWhenDown:Number;
		private var _scaleWhenOver:Number;
		private var _alphaWhenDown:Number;
		private var _alphaWhenDisabled:Number;
		private var _useHandCursor:Boolean;
		private var _enabled:Boolean;
		private var _state:String;
		private var _triggerBounds:Rectangle;

		private var _colorsTextures:Dictionary;
		private var _colorsBGColor:Dictionary;

		public function CustomButton( upState:Texture, text:String = "", downState:Texture = null, overState:Texture = null, disabledState:Texture = null )
		{
			if ( upState == null ) throw new ArgumentError( "Texture 'upState' cannot be null" );

			_upState = upState;
			_downState = downState;
			_overState = overState;
			_disabledState = disabledState;

			_colorsTextures = new Dictionary();
			_colorsTextures[_upState] = Colors.STATIC_TEXT;
			_colorsTextures[_downState] = Colors.DYNAMIC_TEXT;
			_colorsTextures[_overState] = Colors.DYNAMIC_TEXT;
			_colorsTextures[_disabledState] = Colors.BACKGROUND_DARK;

			_colorsBGColor = new Dictionary();
			_colorsBGColor[_upState] = Colors.BACKGROUND_DARK;
			_colorsBGColor[_downState] = Colors.BACKGROUND;
			_colorsBGColor[_overState] = Colors.BACKGROUND;
			_colorsBGColor[_disabledState] = Colors.BACKGROUND_DARK;

			_state = ButtonState.UP;
			_body = new Image( upState );
			_body.pixelSnapping = true;
			_scaleWhenDown = downState ? 1.0 : 0.9;
			_scaleWhenOver = _alphaWhenDown = 1.0;
			_alphaWhenDisabled = disabledState ? 1.0 : 0.5;
			_enabled = true;
			_useHandCursor = true;
			_textBounds = new Rectangle( 0, 0, _body.width, _body.height );
			_triggerBounds = new Rectangle();

			_bodyBackground = new Quad( _body.width, _body.height, Colors.BACKGROUND_DARK );

			_contents = new Sprite();
			_contents.addChild( _bodyBackground );
			_contents.addChild( _body );
			addChild( _contents );
			addEventListener( TouchEvent.TOUCH, onTouch );

			this.touchGroup = true;
			this.text = text;

			_body.color = Colors.STATIC_TEXT;
		}

		public override function dispose():void
		{
			if ( _textField )
				_textField.dispose();

			super.dispose();
		}

		public function readjustSize():void
		{
			var prevWidth:Number = _body.width;
			var prevHeight:Number = _body.height;

			_body.readjustSize();

			var scaleX:Number = _body.width / prevWidth;
			var scaleY:Number = _body.height / prevHeight;

			_textBounds.x *= scaleX;
			_textBounds.y *= scaleY;
			_textBounds.width *= scaleX;
			_textBounds.height *= scaleY;

			if ( _textField ) createTextField();
		}

		private function createTextField():void
		{
			if ( _textField == null )
			{
				_textField = new TextField( _textBounds.width, _textBounds.height );
				_textField.pixelSnapping = _body.pixelSnapping;
				_textField.touchable = false;
				_textField.autoScale = true;
				_textField.batchable = true;
			}

			_textField.width = _textBounds.width;
			_textField.height = _textBounds.height;
			_textField.x = _textBounds.x;
			_textField.y = _textBounds.y;
		}

		private function onTouch( event:TouchEvent ):void
		{
			Mouse.cursor = (_useHandCursor && _enabled && event.interactsWith( this )) ? MouseCursor.BUTTON : MouseCursor.AUTO;

			var touch:Touch = event.getTouch( this );
			var isWithinBounds:Boolean;

			if ( !_enabled )
			{
				return;
			} else if ( touch == null )
			{
				state = ButtonState.UP;
			} else if ( touch.phase == TouchPhase.HOVER )
			{
				state = ButtonState.OVER;
			} else if ( touch.phase == TouchPhase.BEGAN && _state != ButtonState.DOWN )
			{
				_triggerBounds = getBounds( stage, _triggerBounds );
				_triggerBounds.inflate( MAX_DRAG_DIST, MAX_DRAG_DIST );

				state = ButtonState.DOWN;
			} else if ( touch.phase == TouchPhase.MOVED )
			{
				isWithinBounds = _triggerBounds.contains( touch.globalX, touch.globalY );

				if ( _state == ButtonState.DOWN && !isWithinBounds )
				{
					state = ButtonState.UP;
				} else if ( _state == ButtonState.UP && isWithinBounds )
				{
					state = ButtonState.DOWN;
				}
			} else if ( touch.phase == TouchPhase.ENDED && _state == ButtonState.DOWN )
			{
				state = ButtonState.UP;
				if ( !touch.cancelled ) dispatchEventWith( Event.TRIGGERED, true );
			}
		}

		public function get state():String
		{
			return _state;
		}

		public function set state( value:String ):void
		{
			_state = value;
			_contents.x = _contents.y = 0;
			_contents.scaleX = _contents.scaleY = _contents.alpha = 1.0;

			switch ( _state )
			{
				case ButtonState.DOWN:
					setStateTexture( _downState );
					_contents.alpha = _alphaWhenDown;
					_contents.scaleX = _contents.scaleY = _scaleWhenDown;
					_contents.x = (1.0 - _scaleWhenDown) / 2.0 * _body.width;
					_contents.y = (1.0 - _scaleWhenDown) / 2.0 * _body.height;
					break;
				case ButtonState.UP:
					setStateTexture( _upState );
					break;
				case ButtonState.OVER:
					setStateTexture( _overState );
					_contents.scaleX = _contents.scaleY = _scaleWhenOver;
					_contents.x = (1.0 - _scaleWhenOver) / 2.0 * _body.width;
					_contents.y = (1.0 - _scaleWhenOver) / 2.0 * _body.height;
					break;
				case ButtonState.DISABLED:
					setStateTexture( _disabledState );
					_contents.alpha = _alphaWhenDisabled;
					break;
				default:
					throw new ArgumentError( "Invalid button state: " + _state );
			}
		}

		private function setStateTexture( texture:Texture ):void
		{
			_body.texture = texture ? texture : _upState;
			_body.color = _colorsTextures[_body.texture];
			_bodyBackground.color = _colorsBGColor[_body.texture];
		}

		public function get scaleWhenDown():Number
		{
			return _scaleWhenDown;
		}

		public function set scaleWhenDown( value:Number ):void
		{
			_scaleWhenDown = value;
		}

		public function get scaleWhenOver():Number
		{
			return _scaleWhenOver;
		}

		public function set scaleWhenOver( value:Number ):void
		{
			_scaleWhenOver = value;
		}

		public function get alphaWhenDown():Number
		{
			return _alphaWhenDown;
		}

		public function set alphaWhenDown( value:Number ):void
		{
			_alphaWhenDown = value;
		}

		public function get alphaWhenDisabled():Number
		{
			return _alphaWhenDisabled;
		}

		public function set alphaWhenDisabled( value:Number ):void
		{
			_alphaWhenDisabled = value;
		}

		public function get enabled():Boolean
		{
			return _enabled;
		}

		public function set enabled( value:Boolean ):void
		{
			if ( _enabled != value )
			{
				_enabled = value;
				state = value ? ButtonState.UP : ButtonState.DISABLED;
			}
		}

		public function get text():String
		{
			return _textField ? _textField.text : "";
		}

		public function set text( value:String ):void
		{
			if ( value.length == 0 )
			{
				if ( _textField )
				{
					_textField.text = value;
					_textField.removeFromParent();
				}
			} else
			{
				createTextField();
				_textField.text = value;

				if ( _textField.parent == null )
					_contents.addChild( _textField );
			}
		}

		public function get textFormat():TextFormat
		{
			if ( _textField == null ) createTextField();
			return _textField.format;
		}

		public function set textFormat( value:TextFormat ):void
		{
			if ( _textField == null ) createTextField();
			_textField.format = value;
		}

		public function get textStyle():MeshStyle
		{
			if ( _textField == null ) createTextField();
			return _textField.style;
		}

		public function set textStyle( value:MeshStyle ):void
		{
			if ( _textField == null ) createTextField();
			_textField.style = value;
		}

		public function get style():MeshStyle
		{
			return _body.style;
		}

		public function set style( value:MeshStyle ):void
		{
			_body.style = value;
		}

		public function get upState():Texture
		{
			return _upState;
		}

		public function set upState( value:Texture ):void
		{
			if ( value == null )
				throw new ArgumentError( "Texture 'upState' cannot be null" );

			if ( _upState != value )
			{
				_upState = value;
				if ( _state == ButtonState.UP || (_state == ButtonState.DISABLED && _disabledState == null) || (_state == ButtonState.DOWN && _downState == null) || (_state == ButtonState.OVER && _overState == null) )
				{
					setStateTexture( value );
				}
			}
		}

		public function get downState():Texture
		{
			return _downState;
		}

		public function set downState( value:Texture ):void
		{
			if ( _downState != value )
			{
				_downState = value;
				if ( _state == ButtonState.DOWN ) setStateTexture( value );
			}
		}

		public function get overState():Texture
		{
			return _overState;
		}

		public function set overState( value:Texture ):void
		{
			if ( _overState != value )
			{
				_overState = value;
				if ( _state == ButtonState.OVER ) setStateTexture( value );
			}
		}

		public function get disabledState():Texture
		{
			return _disabledState;
		}

		public function set disabledState( value:Texture ):void
		{
			if ( _disabledState != value )
			{
				_disabledState = value;
				if ( _state == ButtonState.DISABLED ) setStateTexture( value );
			}
		}

		public function get textBounds():Rectangle
		{
			return _textBounds;
		}

		public function set textBounds( value:Rectangle ):void
		{
			_textBounds.copyFrom( value );
			createTextField();
		}

		public function get color():uint
		{
			return _body.color;
		}

		public function set color( value:uint ):void
		{
			_body.color = value;
		}

		public function get textureSmoothing():String
		{
			return _body.textureSmoothing;
		}

		public function set textureSmoothing( value:String ):void
		{
			_body.textureSmoothing = value;
		}

		public function get overlay():Sprite
		{
			if ( _overlay == null )
				_overlay = new Sprite();

			_contents.addChild( _overlay ); // make sure it's always on top
			return _overlay;
		}

		public override function get useHandCursor():Boolean
		{
			return _useHandCursor;
		}

		public override function set useHandCursor( value:Boolean ):void
		{
			_useHandCursor = value;
		}

		public function get pixelSnapping():Boolean
		{
			return _body.pixelSnapping;
		}

		public function set pixelSnapping( value:Boolean ):void
		{
			_body.pixelSnapping = value;
			if ( _textField ) _textField.pixelSnapping = value;
		}

		override public function set width( value:Number ):void
		{
			var newWidth:Number = value / (this.scaleX || 1.0);
			var scale:Number = newWidth / (_body.width || 1.0);

			_body.width = newWidth;
			_textBounds.x *= scale;
			_textBounds.width *= scale;

			if ( _textField ) _textField.width = newWidth;
		}

		override public function set height( value:Number ):void
		{
			var newHeight:Number = value / (this.scaleY || 1.0);
			var scale:Number = newHeight / (_body.height || 1.0);

			_body.height = newHeight;
			_textBounds.y *= scale;
			_textBounds.height *= scale;

			if ( _textField ) _textField.height = newHeight;
		}

		public function get scale9Grid():Rectangle
		{
			return _body.scale9Grid;
		}

		public function set scale9Grid( value:Rectangle ):void
		{
			_body.scale9Grid = value;
		}
	}
}