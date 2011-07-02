/**
 * AdBlock Detection with jQuery
 *
 * @url https://github.com/bluelovers/jquery-sco-plugins
 **/
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

	/**
	 * browser default hander function
	 **/
	$.fn.adblocked.defaults = {
		mozilla: function (elem) {
			return $(elem).css('-moz-binding').match(/url\s*\(\s*[\"\']?(about:abp-elemhidehit|chrome:\/\/global\/content\/bindings\/general\.xml#foobarbazdummy)/i);
		},
	};

	/**
	 * browser hander function for hack/addon
	 **/
	$.fn.adblocked.options = {};

	/**
	 * cache browser name
	 * @example $.fn.adblocked.browser
	 **/
	$.each($.browser, function(i, val) {
		if (i != 'version' && val == true) {
			$.fn.adblocked.browser = i;
			return false;
		}
	};

	// try check empty function
	var _emp_func = function(){};

	function _ishide(elem) {
		var ret = null;

		var _list = $.extend({}, $.fn.adblocked.defaults, $.fn.adblocked.options);
		var _func = _list.mozilla;

		_func = _list[$.fn.adblocked.browser];

		if (!_func || _func == null || _func == _emp_func || _func = 'undefined' || _func == undefined) {
			_func = _list.mozilla;
		}

		return _func(elem);
	}

})(jQuery);