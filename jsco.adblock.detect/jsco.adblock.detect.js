(function($){

	// get all by adblock hide elem
	jQuery('*').filter(function(){
		return jQuery(this).css('-moz-binding').match(/url\s*\(\s*"(about:abp-elemhidehit|chrome:\/\/global\/content\/bindings\/general\.xml#foobarbazdummy)/i);
	});

})(jQuery);