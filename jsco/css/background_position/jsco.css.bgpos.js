/**
 * @author bluelovers
 * @copyright 2011
 */
(function($){
	/**
	 * This script adds background-position-x and background-position-y Css properties to jQuery.
	 * Because FireFox fails to support these natively.
	 *
	 * Usage:
	 *
	 * this.$element.css
	 *	({
	 *		"background_position_x": 'left',
	 *		"background_position_y": 'top'
	 *	})
	 *
	 * Copyright (c) 2011 Nikolay Kuchumov
	 * Licensed under MIT (http://en.wikipedia.org/wiki/MIT_License)
	 *
	 * @author Kuchumov Nikolay
	 * @email kuchumovn@gmail.com
	 * @github kuchumovn
	 * @see http://forum.jquery.com/topic/jquery-css-background-position-firefox-opera-bug
	 *
	 * @author Tom Ellis
	 * @github brandonaaron
  	 * @see https://github.com/brandonaaron/jquery-cssHooks/blob/master/bgpos.js
	 *
	 * @author bluelovers
  	 * @github bluelovers
  	 * @see https://github.com/bluelovers/jquery-sco-plugins
	 **/

	var var_name = $.camelCase('background-position');
	var var_name_x = $.camelCase('background-position-x');
	var var_name_y = $.camelCase('background-position-y');

	var _div = $('<div style="background-position: 3px 5px"/>');
	$.support[var_name] = $div.css(var_name) === "3px 5px" ? true : false;
	$.support.backgroundPositionXY = $div.css(var_name_x) === "3px" ? true : false;
	try {
		_div = null;
		delete _div;
	} catch (e) {}

	/*
	var ralpha = /alpha\([^)]*\)/i,
		ropacity = /opacity=([^)]*)/,
		// fixed for IE9, see #8346
		rupper = /([A-Z]|^ms)/g,
		rnumpx = /^-?\d+(?:px)?$/i,
		rnum = /^[+\-]?\d+$/,
		rrelNum = /^[+\-]=/,
		rrelNumFilter = /[^+\-\.\de]+/g,

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssWidth = [ "Left", "Right" ],
		cssHeight = [ "Top", "Bottom" ],
		_u;
	*/

	if (!$.support.backgroundPositionXY || !$.support.backgroundPosition) {
		var rnum = /^[+\-]?\d+$/;

		if (!$.support.backgroundPosition && $.support.backgroundPositionXY) {
			$.cssHooks[var_name] = {
			    get: function (element, computed, extra) {
			    	var $element = $(element);

			        return get_position([
						$element.css(var_name_x)
						, $element.css(var_name_y)
					]);
			    },

			    set: function (element, value) {
			    	var $element = $(element);

			    	var ret = get_background_position(value + '', 1);
			        ret.x = val2num(ret.x);
			        ret.y = val2num(ret.y);

			        $element
						.css(var_name_x, ret.x)
						.css(var_name_y, ret.y)
					;
			    }
			};
		} else if ($.support.backgroundPosition && !$.support.backgroundPositionXY) {
			$.cssHooks[var_name_x] = {
			    get: function (element, computed, extra) {
			        return get_background_position($(element)).x;
			    },

			    set: function (element, x) {
			    	var $element = $(element);

			    	var ret = get_background_position($element);
			        x = val2num(x);

			        $element.css('background-position', get_position([x, ret.y]));
			    }
			};

			$.cssHooks[var_name_y] = {
			    get: function (element, computed, extra) {
			    	return get_background_position($(element)).y;
			    },

			    set: function (element, y) {
			        var $element = $(element);

			        var ret = get_background_position($element);
			        y = val2num(y);

			        $element.css('background-position', get_position([ret.x, y]));
			    }
			};

			$.fx.step[var_name_x] = function (fx) {
			    $.cssHooks[var_name_x].set(fx.elem, val2num(fx.now) + val2num(fx.unit));
			};

			$.fx.step[var_name_y] = function (fx) {
			    $.cssHooks[var_name_y].set(fx.elem, val2num(fx.now) + val2num(fx.unit));
			};

		}

		function get_background_position($element, notelem) {
			if (notelem) {
				var position = $element;
			} else {
		    	var position = $element.css('background-position');
		    }

			var coordinates = position.split(/\s/);
			if (position === '' || position === 'auto') {
				coordinates[0] = position;
				coordinates[1] = position;
		    } else if (coordinates.length != 2) {
		    	coordinates[0] = 'auto';
		    	coordinates[1] = 'auto';
		    }

		    var ret = {
		    	value : position,

		    	x : coordinates[0],
		    	y : coordinates[1],
		    };

		    return ret;
		}

		function get_position(coordinates) {
		    return coordinates.join(' ');
		}

		var val2num = function (value) {
			value = value.toLowerCase();

			if (value == 'top' || value == 'left') {
				value = '0px';
			} else if (value == 'right' || value == 'bottom') {
				value = '100%';
			} else if (rnum.test(value)) {
				value += 'px';
			}

			return value;
		};

	}
})(jQuery);