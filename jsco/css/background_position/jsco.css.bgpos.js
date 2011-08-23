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

	function get_coordinates(position) {
	    var coordinates = position.split(' ');

	    if (coordinates.length != 2) return;

	    return coordinates;
	}

	function get_position(coordinates) {
	    return coordinates.join(' ');
	}

	function get_coordinate(index, $element) {
	    var position = get_background_position($element);

	    if (position === 'auto') {
	        return 'auto';
	    }

	    var coordinates = get_coordinates(position);

	    if (!coordinates) return;

	    return coordinates[index - 1];
	}

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

		if (!$.support.backgroundPositionXY) {
			$.cssHooks[var_name_x] = {
			    get: function (element, computed, extra) {
			    	var $element = $(element);

			        var x = get_coordinate(1, $element);

			        if (!x) return;

			        return x;
			    },

			    set: function (element, x) {
			        var $element = $(element);

			        var y = get_coordinate(2, $element);

			        if (!y) return;

			        if (rnum.test(x)) x += 'px';

			        $element.css('background-position', get_position([x, y]));
			    }
			};

			$.cssHooks[var_name_y] = {
			    get: function (element, computed, extra) {
			    	var $element = $(element);

			        var y = get_coordinate(2, $element);

			        if (!y) return;

			        return y;
			    },

			    set: function (element, y) {
			        var $element = $(element);

			        var x = get_coordinate(1, $element);

			        if (!x) return;

			        if (rnum.test(y)) y += 'px';

			        $element.css('background-position', get_position([x, y]));
			    }
			};

			$.fx.step[var_name_x] = function (fx) {
			    $.cssHooks[var_name_x].set(fx.elem, fx.now + fx.unit);
			};

			$.fx.step[var_name_y] = function (fx) {
			    $.cssHooks[var_name_y].set(fx.elem, fx.now + fx.unit);
			};

		}

		function get_background_position($element) {
		    var position = $element.css('background-position');

			var coordinates = position.split(' ');
		    if (coordinates.length != 2) {
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

		var val2num = function (value) {
			value = value.toLowerCase();

			if (value == 'top' || value == 'left') {
				value = '0%';
			} else if (value == 'right' || value == 'bottom') {
				value = '100%';
			} else if (rnum.test(value)) {
				value += 'px';
			}

			return value;
		};

	}
})(jQuery);