/**
 * @link http://jquery.lukelutman.com/plugins/flash/jquery.flash.js
 */
(function($){

	$.extend({
		scoEmbed : function (setting) {
			var _this = $('<span/>');

			setting = $.scoEmbed.getArgs(setting);
			var html = $.scoEmbed.toHtml(setting);

			return html.object;
		},
	});

	$.extend($.scoEmbed, {
		log : function(a){
			console.log(a);
		},
		defaults : {
			setting : {
				classid : 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
				type : 'application/x-shockwave-flash',

				codebase : 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',
				pluginspage : 'http://www.macromedia.com/go/getflashplayer',

				autostart : 0,

				allowNetworking : 'internal',
				allowScriptAccess : 'never',
				quality : 'high',
				allowfullscreen : true,

				width : 500,
				height : 375,
			},
			attr : {
				params : {},
				object : {},
				embed : {},
				options : {},
			},
			conf : {
				format : '',
			},
		},
		getArgs : function (options, old_attr) {
			var agv = $.extend(true, {}, $.scoEmbed.defaults.setting, options);
			var attr = $.extend(true, {}, $.scoEmbed.defaults.attr, old_attr);

			for(var _k in agv){
				var _v = agv[_k];

				switch (_k) {
					case "classid":
						attr.object[_k] = _v;
						break;
					case "pluginspage":
						attr.embed[_k] = _v;
						break;
					case "movie":
					case "src":
						attr.params["movie"] = _v;
						attr.embed["src"] = _v;
						break;
					case "onafterupdate":
					case "onbeforeupdate":
					case "onblur":
					case "oncellchange":
					case "onclick":
					case "ondblclick":
					case "ondrag":
					case "ondragend":
					case "ondragenter":
					case "ondragleave":
					case "ondragover":
					case "ondrop":
					case "onfinish":
					case "onfocus":
					case "onhelp":
					case "onmousedown":
					case "onmouseup":
					case "onmouseover":
					case "onmousemove":
					case "onmouseout":
					case "onkeypress":
					case "onkeydown":
					case "onkeyup":
					case "onload":
					case "onlosecapture":
					case "onpropertychange":
					case "onreadystatechange":
					case "onrowsdelete":
					case "onrowenter":
					case "onrowexit":
					case "onrowsinserted":
					case "onstart":
					case "onscroll":
					case "onbeforeeditfocus":
					case "onactivate":
					case "onbeforedeactivate":
					case "ondeactivate":
					case "codebase":
						attr.object[_k] = _v;
						break;
					case "width":
					case "height":
					case "align":
					case "vspace":
					case "hspace":
					case "class":
					case "title":
					case "accesskey":
					case "name":
					case "id":
					case "tabindex":
						attr.embed[_k] = attr.object[_k] = _v;
						break;
					case "type":
						attr.embed[_k] = attr.object[_k] = _v;
						break;
					case "flashvars":
					default:
						attr.embed[_k] = attr.params[_k] = _v;
						break;
				};

				attr.options[_k] = _v;
			}

			return attr;
		},
		getMimeType : function (mode) {
			var attr = {};

			switch (mode) {
				case 'flash':
					attr = {
						classid : 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
						type : 'application/x-shockwave-flash',

						codebase : 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',
						pluginspage : 'http://www.macromedia.com/go/getflashplayer',
					};
					break;
			}

			return $.extend(true, {}, attr);
		},
		getMimeTypeByExt : function (ext) {
			var attr = {};
			var mod = '';

			switch (ext) {
				case 'swf':
				default:
					mod = 'flash';
					break;
			}

			return $.scoEmbed.getMimeType(mod);
		},
		toParamString : function (attr) {
			var s = '';
			for(var key in attr)
				if(typeof attr[key] != 'function')
					s += '<param name="' + key + '" value="'+attr[key]+'"/>';
			return s;
		},
		/**
		 *
		 * @desc Convert a hash of html options to a string of attributes, using Function.apply().
		 * @example toAttributeString.apply(htmlOptions)
		 * @result foo="bar" foo="bar"
		 *
		 */
		toAttributeString : function (attr) {
			var s = '';
			for(var key in attr)
				if(typeof attr[key] != 'function')
					s += key+'="'+attr[key]+'" ';
			return s;
		},
		/**
		 *
		 * @desc Convert a hash of flashvars to a url-encoded string, using Function.apply().
		 * @example toFlashvarsString.apply(flashvarsObject)
		 * @result foo=bar&foo=bar
		 *
		 */
		toFlashvarsString : function (attr) {
			var s = '';
			for(var key in attr)
				if(typeof attr[key] != 'function')
					s += key+'='+encodeURIComponent(attr[key])+'&';
			return s.replace(/&$/, '');
		},
		toHtml : function (attr) {
			var html = {
				embed : '',
				object : '',
			};

			var flashvars;
			if (typeof attr.options.flashvars == 'object') {
				flashvars = attr.options.flashvars;
				flashvars = $.scoEmbed.toFlashvarsString(flashvars);
			} else if (!$.isUndefined(attr.options.flashvars)) {
				flashvars = $.scoEmbed.attr.options.flashvars;
			}

			if (flashvars) {
				attr.params.flashvars = flashvars;
				attr.embed.flashvars = flashvars;

				attr.embed.src += ((/\?/.test(attr.embed.src)) ? '&' : '?') + flashvars;

			} else {
				attr.params.flashvars = '';
				attr.embed.flashvars = '';
			}

			html.embed =
				'<embed '
				+ $.scoEmbed.toAttributeString(attr.embed)
				+ '>'
				+ '</embed>'
			;
			html.embed = $(html.embed)
				.width(attr.options.width)
				.height(attr.options.height)
			;

			$.scoEmbed.log(html.embed);

			html.object =
				'<object '
				+ $.scoEmbed.toAttributeString(attr.object)
				+ '>'
				+ $.scoEmbed.toParamString(attr.params)
				+ '</object>'
			;
			html.object = $(html.object)
				.width(attr.options.width)
				.height(attr.options.height)
				.append(html.embed)
			;

			$.scoEmbed.log(html.object);

			return html;
		},

	});

})(jQuery);