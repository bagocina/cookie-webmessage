/*!
* Dependancy:
* jQuery Cookie WebMessage
* https://github.com/bagocina/cookie-webmessage
*
* Copyright 2016, Jan Neurocny - neurocny.com
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/GPL-2.0
*/

(function($){

	$.fn.cookieWebmessage = function(options) {
		// defualt settings
		var config = $.extend({
			'webPath': '/',
			'webDomain': '',
			'webSecure': false,
			'webExpire': '30',
			'bootstrap': false,
			'bootstrapClass': 'danger',
			'styleBgColor': '#b3b3b3',
			'styleTextColor': 'black',
			'textcloseBtn': 'auto',
			'manualContent': 'auto',
			'closeBtn': 'auto',
			'cookieInfo': 'popup',
			'position': 'bottom',
			'language': 'sk'
		}, options);

		return this.each(function() {

			// load language file
			var language = {};
			$.ajax({
				async: false,
				url: 'lang/'+config.language+'.txt',
			}).done(function(data) {
				$(data).filter('text').each(function(){
					language[$(this).attr('id')] = $(this).html();
				});
			});

			var cookieWebmessage = $(this);

			var cwmDefaultMessage = language.default_message;
			var cwmMoreInfo = language.more_info;
			var cwmCookieInfo = language.cookie_info;
			var cwmCookieInfoTitle = language.cookie_info_title;
			var cwmAccept = language.accept;
			var cwmClose = language.close;

			cookieWebmessage.hide();

			// general css
			cookieWebmessage.css('position', 'fixed');
			if (config.position == 'bottom') {
				cookieWebmessage.css('bottom', '0');
			} else if (config.position == 'top') {
				cookieWebmessage.css('top', '0');
			}
			cookieWebmessage.css('left', '0');
			cookieWebmessage.css('right', '0');
			cookieWebmessage.css('padding', '8px 85px 8px 20px');
			cookieWebmessage.css('border-bottom', '1px solid #ccc');
			cookieWebmessage.css('box-shadow', '0px 0px 3px #ccc');
			cookieWebmessage.css('z-index', '99');

			if (config.bootstrap) {
				cookieWebmessage.addClass('alert alert-'+config.bootstrapClass+' cookieWebmessage-bootstrap');
				$('.cookieWebmessage-bootstrap').css('margin-bottom', '0px');
			} else {
				if (config.styleBgColor !== '') {
					cookieWebmessage.css('background-color', config.styleBgColor);
				}
				if (config.styleTextColor !== '') {
					cookieWebmessage.css('color', config.styleTextColor);
				}
			}

			// default content
			if (config.manualContent == 'auto') {
				cookieWebmessage.find('p').css('margin', '0.6em 0');
				cookieWebmessage.append(cwmDefaultMessage);
			} else {
				cookieWebmessage.append(config.manualContent);
			}

			// cookies info link
			if (config.cookieInfo == "popup") {
				if (config.bootstrap) {
					cookieWebmessage.append(' <a data-toggle="modal" data-target="#cookie-webmessage-btstrp" style="cursor: pointer;">'+cwmMoreInfo+'</a>');
				} else {
					cookieWebmessage.append(' <a id="cookie-webmessage-jq-a" style="cursor: pointer;">'+cwmMoreInfo+'</a>');
					$( document ).ready(function() {
						$("#cookie-webmessage-jq-a").click(function() {
							$("#cookie-webmessage-jq").toggle();
						});
					});
				}
			} else if (config.cookieInfo == 'none') {
				cookieWebmessage.append('');
			} else {
				cookieWebmessage.append(' <a href="'+config.cookieInfo+'">'+cwmMoreInfo+'</a>');
			}

			// popup html
			if (config.cookieInfo == "popup") {
				if (config.bootstrap) {
					var modal_html = '<div id="cookie-webmessage-btstrp" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">'+cwmCookieInfoTitle+'</h4></div><div class="modal-body"><p>'+cwmCookieInfo+'</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">'+cwmClose+'</button></div></div></div></div>';
					$('body').prepend(modal_html);
				} else {
					var dialog_html = '<div id="cookie-webmessage-jq" style="display: none; overflow-y: auto; max-height: 120px; margin-top: 5px;"><br /><h2 style="margin: 0px;">'+cwmCookieInfoTitle+'</h2> <br /> '+cwmCookieInfo+'</div>';
					cookieWebmessage.append(dialog_html);
				}
			}

			// default submit button
			if (config.closeBtn == 'auto') {
				if (config.textcloseBtn == 'auto') {
					textcloseBtn = cwmAccept;
				} else {
					textcloseBtn = config.textcloseBtn;
				}
				if (config.bootstrap) {
					cookieWebmessage.append('<a class="cookieWebmessage-close btn btn-xs btn-success">'+textcloseBtn+'</a>');
				} else {
					cookieWebmessage.append('<a class="cookieWebmessage-close">'+textcloseBtn+'</a>');
				}
				config = $.extend( {
					'closeBtn' : '.cookieWebmessage-close'
				}, options);

				$('.cookieWebmessage-close').css('cursor', 'pointer');
				$('.cookieWebmessage-close').css('position', 'absolute');
				$('.cookieWebmessage-close').css('right', '20px');
				$('.cookieWebmessage-close').css('top', '0');
				cookieWebmessage.find('a').css('margin', '0.6em 0');
			}

			// submit button was clicked in past
			if ($.cookie('cookieWebmessage') != 'hide') {
			  cookieWebmessage.show();
			}

			// set cookies
			cookieWebmessage.find(config.closeBtn).click(function() {
				cookieWebmessage.hide();
				$.cookie('cookieWebmessage', 'hide', {
					path: config.webPath,
					secure: config.webSecure,
					domain: config.webDomain,
					expires: config.webExpire
				});
				return false;
			});
		});
	};

	// auto load
	$.cookieWebmessage = function(options) {
		$('body').prepend('<div style="display: none;" class="cookieWebmessage"></div>');
		$('.cookieWebmessage').cookieWebmessage(options);
	};
})(jQuery);

/*!
* Dependancy:
* jQuery Cookie Plugin
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2011, Klaus Hartl
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/GPL-2.0
*/

(function($) {
    $.cookie = function(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
            if (decode(pair[0]) === key) return decode(pair[1] || '');
        }
        return null;
    };
})(jQuery);
