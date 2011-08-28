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

	jQuery.extend({
		rcssProps: {
			// normalize float css property
			'cssFloat' : 'float',
			'styleFloat' : 'float',
		},
		rcamelCase: function( string, iscss ) {

			if (iscss && jQuery.rcssProps[ string ]) {
				return jQuery.rcssProps[ string ];
			}

			return string.replace( rrmsPrefix, "-ms" ).replace( rrdashAlpha, rfcamelCase );
		},
	});

	// hack jQuery.style
	(function(_jQueryStyle){
		$.style = function(elem, name, value, extra) {
			return _jQueryStyle(elem, name, value, extra);
		};
	})($.style);
})(jQuery);