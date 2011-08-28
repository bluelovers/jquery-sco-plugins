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
		rcamelCase: function( string ) {
			return string.replace( rrmsPrefix, "-ms" ).replace( rrdashAlpha, rfcamelCase );
		},
	});
})(jQuery);