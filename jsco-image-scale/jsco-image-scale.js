(function($) {

	function _scale_size(attr, p) {
		if (!p) p = 1;

		attr.height = Math.floor(attr.height * p);
		attr.width = Math.floor(attr.width * p);

		return attr;
	};

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
			}

			if (_is_height) {
				if (_o_height > agv.height) {
					_p = (agv.height / _o_height);
				}

				_e = _scale_size(_e, _p);

//				if (agv.mode == 'fill') _e.height = 'auto';

			} else {
				if (_o_width > agv.width) {
					_p = (agv.width / _o_width);
				}

				_e = _scale_size(_e, _p);

//				if (agv.mode == 'fill') _e.height = '250';
			}

			_this.height(_e.height);
			_this.width(_e.width);

			_this.after(', <b>mode: ' + agv.mode + '</b>');
			_this.after(', <b>agv: ' + agv.width + ' x ' + agv.height + '</b>');
			_this.after('<br><b>p: ' + _p + ', ' + _e.width + ' x ' + _e.height + '</b>');

			_this.after($('<div></div>').height(agv.height).width(agv.width).css({'background-color': 'red', 'display': _this.css('display') == 'inline' ? 'inline-block' : 'block', 'overflow': 'hidden'}).append($('<img/>').attr('src', _this.attr('src')).css(_e).css({'margin-top': 0 - (_e.height - agv.height) / 2, 'margin-left': 0 - (_e.width - agv.width) / 2})));

		});
	};

	$.fn.scoScale.defaults = {
		mode: 'default',
		scale: 1,
		mode_replace: 'self'
	};

})(jQuery);