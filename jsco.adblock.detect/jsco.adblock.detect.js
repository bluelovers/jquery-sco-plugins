(function($){

	/**
	 * MozBinding style property
	 * -moz-binding property
	 *
	 * @see http://help.dottoro.com/ljxlpaqh.php
	 * @see http://help.dottoro.com/lcxlpaqh.php
	 * @see http://www.w3.org/TR/2007/WD-becss-20070205/#the-binding
	 * @see https://developer.mozilla.org/En/CSS:-moz-binding
	 **/

	/**
	 * return check if this by adblock hide
	 *
	 * @example jQuery('.inline-ad').adblocked()
	 * @return bool
	 **/
	$.fn.adblocked = function(){
		return _ishide(this);
	};

	/**
	 * get all by adblock hide elem
	 *
	 * @example jQuery('*').filter_adblocked()
	 * @return [div.inline-ad, div#AdSense1.widget]
	 **/
	$.fn.filter_adblocked = function(){
		return $(this).filter(function(){
			return $(this).adblocked();
		});
	};

	function _ishide(elem) {
		return jQuery(elem).css('-moz-binding').match(/url\s*\(\s*[\"\']?(about:abp-elemhidehit|chrome:\/\/global\/content\/bindings\/general\.xml#foobarbazdummy)/i);
	}

})(jQuery);