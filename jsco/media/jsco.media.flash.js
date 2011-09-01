/**
 * @link http://jquery.lukelutman.com/plugins/flash/jquery.flash.js
 */
(function($, undefined){

	$.extend({
		scoEmbed : function (setting, conf) {
			/*
			var _this = $('<span/>');
			*/
			var setting = $.scoEmbed.getArgs(setting);
			var html = $.scoEmbed.toHtml(setting);

			$.scoEmbed.setup(conf);

			var conf = $.scoEmbed.data.conf;

			$.scoEmbed.log([
				conf,
				setting,
			]);

			var ret;

			if (conf
				&& conf['format']
				&& $.inArray(conf['format'], ['all', 'embed', 'object']) != -1
			) {
				ret = html[conf['format']];
			} else {
				if ($.browser.mozilla) {
					ret = html.embed;
				} else if ($.browser.msie) {
					ret = html.object;
				} else {
					ret = html.all;
				}
			}

			return ret;
		},
	});

	$.extend($.scoEmbed, {
		log : function(a){
			if (!$.scoEmbed.data.conf['debug']) return;
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

				menu : false,

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
				debug : false,
				init_conf : true,
			},
		},
		data : {
			conf : {
				init_conf : false,
			},
		},
		setup : function (conf) {
			if (!$.scoEmbed.data.conf.init_conf) {
				$.extend($.scoEmbed.data.conf, {},
					$.scoEmbed.defaults.conf,
					conf
				);
			} else if ($.type(conf) != 'undefined') {
				$.extend($.scoEmbed.data.conf, {},
					conf
				);
			}

			return this;
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
		isValidValue : function (value) {
			if (
				value === null
				|| $.inArray($.type(value), ['function', 'undefined']) != -1
			) {
				return false;
			}

			return true;
		},
		toStringValue : function (value) {
			if ($.isArray(value)) {
				value = value.join(',');
			}
			return value;
		},
		toParamString : function (attr) {
			var s = '';
			for (var key in attr) {
				var _v = attr[key];
				if($.scoEmbed.isValidValue(_v)) {
					_v = $.scoEmbed.toStringValue(_v);

					s += '<param name="' + key + '" value="'+_v+'"/>';
				}
			}
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
			for (var key in attr) {
				var _v = attr[key];
				if ($.scoEmbed.isValidValue(_v)) {
					_v = $.scoEmbed.toStringValue(_v);

					s += key+'="'+_v+'" ';
				}
			}
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
			for (var key in attr) {
				var _v = attr[key];
				if($.scoEmbed.isValidValue(_v)) {
					_v = $.scoEmbed.toStringValue(_v);

					s += key+'='+encodeURIComponent(_v)+'&';
				}
			}
			return s.replace(/&+$/, '');
		},
		toHtml : function (attr) {
			var html = {
				embed : '',
				object : '',
			};

			/*
			if (attr.options.id) {
				try {
					attr.params.id = '';
					attr.embed.id = '';

					delete attr.params.id;
					delete attr.embed.id;
				} catch (e) {}
			}
			*/

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
				try {
					attr.params.flashvars = '';
					attr.embed.flashvars = '';

					delete attr.params.flashvars;
					delete attr.embed.flashvars;
				} catch (e) {}
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
			;
			html.all = html.object.clone()
				.append(html.embed)
			;

			$.scoEmbed.log(html);

			return html;
		},

	});

})(jQuery);