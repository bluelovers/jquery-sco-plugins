/**
 * @author bluelovers
 * @copyright 2011
 */
(function($){
	var
		rrdashAlpha = /([A-Z]|[0-9])/g,
		rrmsPrefix = /^ms-/i,

		rfcamelCase = function( all, letter ) {
			return ( "-" + letter ).toLowerCase();
		},

		rimportant = /\s*\!important\s*;?\s*$/i,
		simportant = 'important',

		undefined
	;

	$.extend({
		rcssProps: {
			// normalize float css property
			'cssFloat' : 'float',
			'styleFloat' : 'float',
		},
		rcamelCase: function( string, iscss ) {

			if (iscss && $.rcssProps[ string ]) {
				return $.rcssProps[ string ];
			}

			return string.replace( rrmsPrefix, "-ms" ).replace( rrdashAlpha, rfcamelCase );
		},
	});

	var _elem = $('<div style="color: red;"/>')[0];
	/**
	 * Adds a property with the specified name and value to the current style object.
	 *
	 * @see http://help.dottoro.com/ljdpsdnb.php
	 */
	var setProperty;
	if (
		//BUG: unknow bug in ie.9, support setProperty but can't work
		!$.browser.msie
		&& typeof _elem.style.setProperty == 'function'
	) {
		setProperty = function(elem, propertyName, propertyValue, priority) {
			// button.style.setProperty ("background-color", "green", null);
			propertyName = $.rcamelCase(propertyName);

			//console.log(propertyName);

			return elem.style.setProperty(propertyName, propertyValue, priority);
		};

		//console.log('style.setProperty');
	} else if (0 && typeof _elem.style.setAttribute == 'function') {
		setProperty = function(elem, propertyName, propertyValue, priority) {
			// button.style.setAttribute ("backgroundColor", "green");
			propertyName = $.camelCase(propertyName);

			var caseSens;
			//console.log(propertyName);

			return elem.style.setAttribute(propertyName, propertyValue, caseSens);
		};

		//console.log('style.setAttribute');
	} else {
		setProperty = function(elem, propertyName, propertyValue, priority) {
			propertyName = $.rcamelCase(propertyName);

			if (priority == simportant) {
				propertyValue = propertyValue.replace(/[;\s]+$/g, '') + ' !' + priority;
			}

			elem.style.cssText += ';' + propertyName + ':' + propertyValue + ';';
		}
	}

	try {
		_elem = null;
		delete _elem;
	} catch (e) {}

	// hack jQuery.style
	(function(_jQueryStyle){
		$.style = function(elem, name, value, extra) {
			var ret;

			if ( value !== undefined ) {
				if (typeof $.style.setProperty != 'function') {
					_jQueryStyle(elem, name, value, extra);
				} else {

					var important;
					if (rimportant.test(value)) {
						important = 'important';
						value = value.replace(rimportant, '');
					}

					//console.log('important = ' + important);

					_jQueryStyle(elem, name, value, extra);

					if (important) {
						ret = $.style(elem, name, undefined, extra);
						//console.log(ret);

						//console.log([elem, name, value, important, ret]);
						$.style.setProperty(elem, name, ret, important);
					}
				}
			} else {
				ret = _jQueryStyle(elem, name, value, extra);

				return ret;
			}
		};
	})($.style);

	$.style.setProperty = setProperty;
	//console.log('jQuery.style.setProperty = ' + $.style.setProperty);
})(jQuery);