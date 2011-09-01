(function($){

	$.extend({
		scoEmbed : function () {

		},
	});

	$.scoEmbed.extend({
		defaults : {
			params : {
				classid : 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
				type : 'application/x-shockwave-flash',

				codebase : 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',
				pluginspage : 'http://www.macromedia.com/go/getflashplayer',
			},
			object : {},
			embed : {},
		},
		defaults_empty : {
			params : {},
			object : {},
			embed : {},
		},
		getArgs : function (options) {
			var agv = $.extend(true, {}, $.scoEmbed.defaults.params, options);
			var attr = $.extend(true, {}, $.scoEmbed.defaults_empty);

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
						attr.object["movie"] = _v;
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
					default:
						attr.embed[_k] = _v;
						break;
				};
			}
		}

	});

})(jQuery);