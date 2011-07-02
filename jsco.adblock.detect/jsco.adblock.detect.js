(function($){

	// get all by adblock hide elem
	$('*').filter(function(){
		return jQuery(this).css('-moz-binding').match(/url\s*\(\s*"about:abp-elemhidehit\?/is);
	});

})(jQuery);