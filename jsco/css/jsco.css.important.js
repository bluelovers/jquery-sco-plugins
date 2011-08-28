/**
 * @author bluelovers
 * @copyright 2011
 */
(function($){
	var
		rrdashAlpha = /([A-Z]|[0-9])/ig,
		rrmsPrefix = /^ms-/,

		rfcamelCase = function( all, letter ) {
			return ( "-" + letter ).toLowerCase();
		},

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

			return elem.style.setProperty(propertyName, propertyValue, priority);
		};

		console.log('style.setProperty');
	} else if (typeof _elem.style.setAttribute == 'function') {
		setProperty = function(elem, propertyName, propertyValue, priority) {
			// button.style.setAttribute ("backgroundColor", "green");
			propertyName = $.camelCase(propertyName);

			var caseSens;

			return elem.style.setAttribute(propertyName, propertyValue, caseSens);
		};

		console.log('style.setAttribute');
	}

	// hack jQuery.style
	(function(_jQueryStyle){
		$.style = function(elem, name, value, extra) {
			return _jQueryStyle(elem, name, value, extra);
		};
	})($.style);

	$.style.setProperty = setProperty;
})(jQuery);