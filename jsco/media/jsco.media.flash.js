(function($){

	$.extend({
		scoEmbed : function () {

		},
	});

	$.scoEmbed.extend({
		defaults : {
			params : {

			},
			object : {},
			embed : {},
		},
		prop : {
			params : {},
			object : {},
			embed : {},
		},
		getArgs : function (options) {
			var agv = $.extend(true, {}, $.scoEmbed.defaults.params, options);

			for(var _k in agv){
				var _v = agv[_k];

				agv[_k] = _v;
			}
		}

	});

})(jQuery);