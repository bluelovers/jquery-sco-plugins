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
	if (typeof _elem.style.setProperty == 'function')) {
		setProperty = function(elem, propertyName, propertyValue, priority) {
			return elem.style.setProperty(propertyName, propertyValue, priority);
		};
	}

	// hack jQuery.style
	(function(_jQueryStyle){
		$.style = function(elem, name, value, extra) {
			return _jQueryStyle(elem, name, value, extra);
		};
	})($.style);
})(jQuery);