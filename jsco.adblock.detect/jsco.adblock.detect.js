(function($){

	/**
	 * get all by adblock hide elem
	 *
	 * @return [div.inline-ad, div#AdSense1.widget]
	 **/
	jQuery('*').filter(function(){
		return _ishide(this);
	});

	function _ishide(elem) {
		return jQuery(elem).css('-moz-binding').match(/url\s*\(\s*[\"\']?(about:abp-elemhidehit|chrome:\/\/global\/content\/bindings\/general\.xml#foobarbazdummy)/i);
	}

})(jQuery);