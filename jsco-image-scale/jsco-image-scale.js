(function($) {

	$.fn.scoScale = function (options) {
		var agv = $.extend(true, {}, $.fn.scoScale.defaults, options);

//		alert($(this).length);

		var elems = this.filter('img');
		elems.each(function(){
			var _this = $(this);
			var _p = agv.scale;

			var _o = _this.scoRealsize();
			var _e = {
				height: _o.height * _p,
				width: _o.width * _p,
			};

			if (!_e.height || !_e.width) {
				return;
			}

			var _is_height		= (_o.height >= _o.width) ? 1 : 0;

			if (agv.mode == 'fill' || /^fill/.test(agv.mode)) {
				_is_height = !_is_height;
			} else if (!agv.height && _is_height && agv.width) {
				_is_height = 0;
			} else if (agv.height && !_is_height && !agv.width) {
				_is_height = 1;
			}

			if (_is_height) {
				if (agv.height && _e.height > agv.height) {
					_p = (agv.height / _e.height);
				} else if (agv.mode == 'fit' && _e.height < agv.height) {
					_p = (agv.height / _e.height);
				}
			} else {
				if (agv.width && _e.width > agv.width) {
					_p = (agv.width / _e.width);
				} else if (agv.mode == 'fit' && _e.width < agv.width) {
					_p = (agv.width / _e.width);
				}
			}

			_e = _scale_size(_e, _p);

//			_this.after(', <b>mode: ' + agv.mode + '</b>');
//			_this.after(', <b>agv: ' + agv.width + ' x ' + agv.height + '</b>');
//			_this.after('<br><b>p: ' + _p + ', ' + _e.width + ' x ' + _e.height + '</b>');

			if (agv.mode == 'fill') {
				var _cm = _pos(_e, agv, agv.pos);

				var newimg = _this.clone()
//					$('<img/>').attr('src', _this.attr('src'))
					.css(_e).css(agv.img.css).attr(agv.img.attr).css({'margin-top': 0 - _cm.top, 'margin-left': 0 - _cm.left});

				var newdiv = $('<div></div>').height(agv.height).width(agv.width)
					.css(agv.div.css).attr(agv.div.attr).css({'display': _this.css('display') == 'inline' ? 'inline-block' : 'block', 'overflow': 'hidden'})
					.append(
						newimg
					);

				_this.after(
					newdiv
				);

				_this.hide();
			}

			_this.height(_e.height).width(_e.width).css(agv.img.css).attr(agv.img.attr);
		});
	};

	$.fn.scoScale.defaults = {
		mode: 'default',
		scale: 1,
		mode_replace: 'self',
		pos: 5,
		div: {attr:{},css:{}},
		img: {attr:{},css:{}}
	};

	$.fn.scoRealsize = function() {
		var _this = this;
		var img = $('<img/>').attr('src', _this.attr('src'));

		var _o = {
			height: _this.height(),
			width: _this.width()
		};

		var _oo = img.ready(function(){
			return {
				height: img.height(),
				width: img.width()
			};
		});

		_o = $.extend(_o, _oo[0]);

		return _o;
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

		_p.top = Math.floor(_p.top);
		_p.left = Math.floor(_p.left);
		_p.bottom = Math.floor(_p.bottom);
		_p.right = Math.floor(_p.right);

		return _p;
	};

	function _scale_size(attr, p) {
		if (!p) p = 1;

		attr.height = Math.floor(attr.height * p);
		attr.width = Math.floor(attr.width * p);

		return attr;
	};

})(jQuery);