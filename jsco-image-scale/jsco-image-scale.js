(function($) {

	$.fn.scoScale = function (options) {
		var agv = $.extend({}, $.fn.scoScale.defaults, options);

//		alert($(this).length);

		var elems = this.filter('img');
		elems.each(function(){

//			alert(1);

			var _this = $(this);
//			var _this = $._this;

			var _o_height		= _this.height();
			var _o_width		= _this.width();

			var _p				= agv.scale;

			var _e = {
				height: _o_height * _p,
				width: _o_width * _p,
			};

			var _is_height		= (_o_height >= _o_width) ? 1 : 0;

			if (agv.mode == 'fill') {
				_is_height = !_is_height;
			} else if (!agv.height && _is_height && agv.width) {
				_is_height = 0;
			} else if (agv.height && !_is_height && !agv.width) {
				_is_height = 1;
			}

			if (_is_height) {
				if (agv.height && _o_height > agv.height) {
					_p = (agv.height / _o_height);
				}

				_e = _scale_size(_e, _p);
			} else {
				if (agv.width && _o_width > agv.width) {
					_p = (agv.width / _o_width);
				}

				_e = _scale_size(_e, _p);
			}

			_this.height(_e.height);
			_this.width(_e.width);

//			_this.after(', <b>mode: ' + agv.mode + '</b>');
//			_this.after(', <b>agv: ' + agv.width + ' x ' + agv.height + '</b>');
//			_this.after('<br><b>p: ' + _p + ', ' + _e.width + ' x ' + _e.height + '</b>');

			if (agv.mode == 'fill') {
				var _cm = _pos(_e, agv, agv.pos);

				_this.after(
					$('<div></div>').height(agv.height).width(agv.width)
						.css({'background-color': 'red', 'display': _this.css('display') == 'inline' ? 'inline-block' : 'block', 'overflow': 'hidden'})
						.append(
							$('<img/>').attr('src', _this.attr('src'))
							.css(_e).css({'margin-top': 0 - _cm.top, 'margin-left': 0 - _cm.left})
						)
				);

				_this.hide();
			}

		});
	};

	$.fn.scoScale.defaults = {
		mode: 'default',
		scale: 1,
		mode_replace: 'self',
		pos: 5
	};

	function _pos(_e, agv, options) {
		var _p = {
			top: 0,
			left: 0,
			bottom: 0,
			right: 0
		};

		if ($.type(options) == 'array') {

			_p.top = options[0];
			_p.left = options[1];
			_p.bottom = options[2];
			_p.right = options[3];

		} else if ($.type(options) == 'object') {

			_p = $.extend(_p, options);

		} else {
			var w = _e.width - agv.width;
			var h = _e.height - agv.height;

			switch(options) {
				case 7:
					break;
				case 8:
					_p.left = w / 2;
					break;
				case 9:
					_p.left = w;
					break;

				case 1:
					_p.top = h;
					break;
				case 2:
					_p.top = h;
					_p.left = w / 2;
					break;
				case 3:
					_p.top = h;
					_p.left = w;
					break;

				case 4:
					_p.top = h / 2;
					break;
				case 6:
					_p.top = h / 2;
					_p.left = w;
					break;

				case 5:
				default:
					_p.top = h / 2;
					_p.left = w / 2;

					break;
			}
		}

		return _p;
	}

	function _scale_size(attr, p) {
		if (!p) p = 1;

		attr.height = Math.floor(attr.height * p);
		attr.width = Math.floor(attr.width * p);

		return attr;
	};

})(jQuery);