/**
 * @author bluelovers
 * @copyright 2011
 *
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1975348127
 * @see https://developer.mozilla.org/En/DOM:document.createTextNode
 */
(function($){

	$.extend({
		text : function (data) {
			return document.createTextNode(data);
		},
	});

})(jQuery);