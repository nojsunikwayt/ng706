function enableSubmenu(boxId, itemId) {
	jQuery('#' + boxId + ' > div').hide();
	jQuery('#' + boxId + itemId).show();
	jQuery('#li' + boxId + itemId).parent().children('li').removeClass('menuSelected');
	jQuery('#li' + boxId + itemId).addClass('menuSelected');
}

function resetSubmenu(boxId) {
	enableSubmenu(boxId, '1');
}


//	Function for cookies. Added by Kostas Sidiras at 19-03-2015.


(function($){
	$.cookieBar = function(options,val){
		if(options=='cookies'){
			var doReturn = 'cookies';
		}else if(options=='set'){
			var doReturn = 'set';
		}else{
			var doReturn = false;
		}
		var defaults = {
			message: 'This site uses cookies to give you the best experience. Cookies are files stored in your browser and are used to help personalised web experience. By continuing to use our website without changing the settings, you are agreeing to our use of cookies. More details can be found in our <a href="http://www.visitgreece.gr/en/home/privacy_policy">privacy policy</a>', //Message displayed on bar
			acceptButton: true, //Set to true to show accept/enable button
			acceptText: 'I Understand', //Text on accept/enable button
			declineButton: false, //Set to true to show decline/disable button
			declineText: 'Disable Cookies', //Text on decline/disable button
			policyButton: false, //Set to true to show Privacy Policy button
			policyText: 'Privacy Policy', //Text on Privacy Policy button
			policyURL: 'http://www.visitgreece.gr/en/gnto/privacy_policy', //URL of Privacy Policy
			autoEnable: true, //Set to true for cookies to be accepted automatically. Banner still shows
			acceptOnContinue: false, //Set to true to silently accept cookies when visitor moves to another page
			expireDays: 365, //Number of days for cookieBar cookie to be stored for
			forceShow: false, //Force cookieBar to show regardless of user cookie preference
			effect: 'slide', //Options: slide, fade, hide
			element: 'body', //Element to append/prepend cookieBar to. Remember "." for class or "#" for id.
			append: false, //Set to true for cookieBar HTML to be placed at base of website. Actual position may change according to CSS
			fixed: false, //Set to true to add the class "fixed" to the cookie bar. Default CSS should fix the position
			bottom: false, //Force CSS when fixed, so bar appears at bottom of website
			zindex: '', //Can be set in CSS, although some may prefer to set here
			redirect: String(window.location.href), //Current location
			domain: String(window.location.hostname), //Location of privacy policy
			referrer: String(document.referrer) //Where visitor has come from
		};
		var options = $.extend(defaults,options);
		
		//Sets expiration date for cookie
		var expireDate = new Date();
		expireDate.setTime(expireDate.getTime()+(options.expireDays*24*60*60*1000));
		expireDate = expireDate.toGMTString();
		
		var cookieEntry = 'cb-enabled={value}; expires='+expireDate+'; path=/';
		
		//Retrieves current cookie preference
		var i,cookieValue='',aCookie,aCookies=document.cookie.split('; ');
		for (i=0;i<aCookies.length;i++){
			aCookie = aCookies[i].split('=');
			if(aCookie[0]=='cb-enabled'){
    			cookieValue = aCookie[1];
			}
		}
		//Sets up default cookie preference if not already set
		if(cookieValue=='' && options.autoEnable){
			cookieValue = 'enabled';
			document.cookie = cookieEntry.replace('{value}','enabled');
		}
		if(options.acceptOnContinue){
			if(options.referrer.indexOf(options.domain)>=0 && String(window.location.href).indexOf(options.policyURL)==-1 && doReturn!='cookies' && doReturn!='set' && cookieValue!='accepted' && cookieValue!='declined'){
				doReturn = 'set';
				val = 'accepted';
			}
		}
		if(doReturn=='cookies'){
			//Returns true if cookies are enabled, false otherwise
			if(cookieValue=='enabled' || cookieValue=='accepted'){
				return true;
			}else{
				return false;
			}
		}else if(doReturn=='set' && (val=='accepted' || val=='declined')){
			//Sets value of cookie to 'accepted' or 'declined'
			document.cookie = cookieEntry.replace('{value}',val);
			if(val=='accepted'){
				return true;
			}else{
				return false;
			}
		}else{
			//Sets up enable/accept button if required
			var message = options.message.replace('{policy_url}',options.policyURL);
			
			if(options.acceptButton){
				var acceptButton = '<a href="" class="cb-enable">'+options.acceptText+'</a>';
			}else{
				var acceptButton = '';
			}
			//Sets up disable/decline button if required
			if(options.declineButton){
				var declineButton = '<a href="" class="cb-disable">'+options.declineText+'</a>';
			}else{
				var declineButton = '';
			}
			//Sets up privacy policy button if required
			if(options.policyButton){
				var policyButton = '<a href="'+options.policyURL+'" class="cb-policy">'+options.policyText+'</a>';
			}else{
				var policyButton = '';
			}
			//Whether to add "fixed" class to cookie bar
			if(options.fixed){
				if(options.bottom){
					var fixed = ' class="fixed bottom"';
				}else{
					var fixed = ' class="fixed"';
				}
			}else{
				var fixed = '';
			}
			if(options.zindex!=''){
				var zindex = ' style="z-index:'+options.zindex+';"';
			}else{
				var zindex = '';
			}
			
			//Displays the cookie bar if arguments met
			if(options.forceShow || cookieValue=='enabled' || cookieValue==''){
				if(options.append){
					$(options.element).append('<div id="cookie-bar"'+fixed+zindex+'><p>'+message+acceptButton+declineButton+policyButton+'</p></div>');
				}else{
					$(options.element).prepend('<div id="cookie-bar"'+fixed+zindex+'><p>'+message+acceptButton+declineButton+policyButton+'</p></div>');
				}
			}
			
			//Sets the cookie preference to accepted if enable/accept button pressed
			$('#cookie-bar .cb-enable').click(function(){
				document.cookie = cookieEntry.replace('{value}','accepted');
				if(cookieValue!='enabled' && cookieValue!='accepted'){
					window.location = options.currentLocation;
				}else{
					if(options.effect=='slide'){
						$('#cookie-bar').slideUp(300,function(){$('#cookie-bar').remove();});
					}else if(options.effect=='fade'){
						$('#cookie-bar').fadeOut(300,function(){$('#cookie-bar').remove();});
					}else{
						$('#cookie-bar').hide(0,function(){$('#cookie-bar').remove();});
					}
					return false;
				}
			});
			//Sets the cookie preference to declined if disable/decline button pressed
			$('#cookie-bar .cb-disable').click(function(){
				var deleteDate = new Date();
				deleteDate.setTime(deleteDate.getTime()-(864000000));
				deleteDate = deleteDate.toGMTString();
				aCookies=document.cookie.split('; ');
				for (i=0;i<aCookies.length;i++){
					aCookie = aCookies[i].split('=');
					if(aCookie[0].indexOf('_')>=0){
						document.cookie = aCookie[0]+'=0; expires='+deleteDate+'; domain='+options.domain.replace('www','')+'; path=/';
					}else{
						document.cookie = aCookie[0]+'=0; expires='+deleteDate+'; path=/';
					}
				}
				document.cookie = cookieEntry.replace('{value}','declined');
				if(cookieValue=='enabled' && cookieValue!='accepted'){
					window.location = options.currentLocation;
				}else{
					if(options.effect=='slide'){
						$('#cookie-bar').slideUp(300,function(){$('#cookie-bar').remove();});
					}else if(options.effect=='fade'){
						$('#cookie-bar').fadeOut(300,function(){$('#cookie-bar').remove();});
					}else{
						$('#cookie-bar').hide(0,function(){$('#cookie-bar').remove();});
					}
					return false;
				}
			});
		}
	};
})(jQuery);

$(document).ready(function(){
  $.cookieBar({
        message: 'This site uses cookies to give you the best experience. Cookies are files stored in your browser and are used to help personalised web experience. By continuing to use our website without changing the settings, you are agreeing to our use of cookies. More details can be found in our <a href="http://www.visitgreece.gr/en/home/privacy_policy">privacy policy</a>',
        acceptButton: true,
        acceptText: 'I Understand',
 //       autoEnable: true,
 //       acceptOnContinue: false,
        expireDays: 365,
 //       forceShow: false,
        effect: 'slide',
        element: 'body',
		fixed:true
  });
});


//	Function to show a newsletter registration box as a coockie. Added by Kostas Sidiras at 27-09-2016.


(function($){
	$.newsletterBox = function(options,val){
		if(options=='cookies'){
			var doReturn = 'cookies';
		}else if(options=='set'){
			var doReturn = 'set';
		}else{
			var doReturn = false;
		}
		var defaults = {
			message: 'Subscribe to our <a href="http://www.visitgreece.gr/en/gnto/newsletter">newsletter</a>', //Message displayed on bar
			acceptButton: true, //Set to true to show accept/enable button
			acceptText: 'Subscribe Now', //Text on accept/enable button
			declineButton: true, //Set to true to show decline/disable button
			declineText: 'No. Thank you', //Text on decline/disable button
			policyButton: false, //Set to true to show Privacy Policy button
			policyText: 'Privacy Policy', //Text on Privacy Policy button
			policyURL: 'http://www.visitgreece.gr/en/gnto/privacy_policy', //URL of Privacy Policy
			autoEnable: true, //Set to true for cookies to be accepted automatically. Banner still shows
			acceptOnContinue: false, //Set to true to silently accept cookies when visitor moves to another page
			expireDays: 365, //Number of days for newsletterBox cookie to be stored for
			forceShow: false, //Force newsletterBox to show regardless of user cookie preference
			effect: 'slide', //Options: slide, fade, hide
			element: 'body', //Element to append/prepend newsletterBox to. Remember "." for class or "#" for id.
			append: false, //Set to true for newsletterBox HTML to be placed at base of website. Actual position may change according to CSS
			fixed: false, //Set to true to add the class "fixed" to the newsletter bar. Default CSS should fix the position
			bottom: true, //Force CSS when fixed, so bar appears at bottom of website
			zindex: '', //Can be set in CSS, although some may prefer to set here
			redirect: String(window.location.href), //Current location
			domain: String(window.location.hostname), //Location of privacy policy
			referrer: String(document.referrer) //Where visitor has come from
		};
		var options = $.extend(defaults,options);
		
		//Sets expiration date for cookie
		var expireDate = new Date();
		expireDate.setTime(expireDate.getTime()+(options.expireDays*24*60*60*1000));
		expireDate = expireDate.toGMTString();
		
		var cookieEntry = 'cb-enabled={value}; expires='+expireDate+'; path=/';
		
		//Retrieves current cookie preference
		var i,cookieValue='',aCookie,aCookies=document.cookie.split('; ');
		for (i=0;i<aCookies.length;i++){
			aCookie = aCookies[i].split('=');
			if(aCookie[0]=='cb-enabled'){
    			cookieValue = aCookie[1];
			}
		}
		//Sets up default cookie preference if not already set
		if(cookieValue=='' && options.autoEnable){
			cookieValue = 'enabled';
			document.cookie = cookieEntry.replace('{value}','enabled');
		}
		if(options.acceptOnContinue){
			if(options.referrer.indexOf(options.domain)>=0 && String(window.location.href).indexOf(options.policyURL)==-1 && doReturn!='cookies' && doReturn!='set' && cookieValue!='accepted' && cookieValue!='declined'){
				doReturn = 'set';
				val = 'accepted';
			}
		}
		if(doReturn=='cookies'){
			//Returns true if cookies are enabled, false otherwise
			if(cookieValue=='enabled' || cookieValue=='accepted'){
				return true;
			}else{
				return false;
			}
		}else if(doReturn=='set' && (val=='accepted' || val=='declined')){
			//Sets value of cookie to 'accepted' or 'declined'
			document.cookie = cookieEntry.replace('{value}',val);
			if(val=='accepted'){
				return true;
			}else{
				return false;
			}
		}else{
			//Sets up enable/accept button if required
			var message = options.message.replace('{policy_url}',options.policyURL);
			
			if(options.acceptButton){
				var acceptButton = '<a href="" class="cb-enable">'+options.acceptText+'</a>';
			}else{
				var acceptButton = '';
			}
			//Sets up disable/decline button if required
			if(options.declineButton){
				var declineButton = '<a href="" class="cb-disable">'+options.declineText+'</a>';
			}else{
				var declineButton = '';
			}
			//Sets up privacy policy button if required
			if(options.policyButton){
				var policyButton = '<a href="'+options.policyURL+'" class="cb-policy">'+options.policyText+'</a>';
			}else{
				var policyButton = '';
			}
			//Whether to add "fixed" class to newsletter bar
			if(options.fixed){
				if(options.bottom){
					var fixed = ' class="fixed bottom"';
				}else{
					var fixed = ' class="fixed"';
				}
			}else{
				var fixed = '';
			}
			if(options.zindex!=''){
				var zindex = ' style="z-index:'+options.zindex+';"';
			}else{
				var zindex = '';
			}
			
			//Displays the newsletter bar if arguments met
			if(options.forceShow || cookieValue=='enabled' || cookieValue==''){
				if(options.append){
					$(options.element).append('<div id="newsletter-bar"'+fixed+zindex+'><p>'+message+acceptButton+declineButton+policyButton+'</p></div>');
				}else{
					$(options.element).prepend('<div id="newsletter-bar"'+fixed+zindex+'><p>'+message+acceptButton+declineButton+policyButton+'</p></div>');
				}
			}
			
			//Sets the cookie preference to accepted if enable/accept button pressed
			$('#newsletter-bar .cb-enable').click(function(){
				document.cookie = cookieEntry.replace('{value}','accepted');
				if(cookieValue!='enabled' && cookieValue!='accepted'){
					window.location = options.currentLocation;
				}else{
					if(options.effect=='slide'){
						$('#newsletter-bar').slideUp(300,function(){$('#newsletter-bar').remove();});
					}else if(options.effect=='fade'){
						$('#newsletter-bar').fadeOut(300,function(){$('#newsletter-bar').remove();});
					}else{
						$('#newsletter-bar').hide(0,function(){$('#newsletter-bar').remove();});
					}
					return false;
				}
			});
			//Sets the cookie preference to declined if disable/decline button pressed
			$('#newsletter-bar .cb-disable').click(function(){
				var deleteDate = new Date();
				deleteDate.setTime(deleteDate.getTime()-(864000000));
				deleteDate = deleteDate.toGMTString();
				aCookies=document.cookie.split('; ');
				for (i=0;i<aCookies.length;i++){
					aCookie = aCookies[i].split('=');
					if(aCookie[0].indexOf('_')>=0){
						document.cookie = aCookie[0]+'=0; expires='+deleteDate+'; domain='+options.domain.replace('www','')+'; path=/';
					}else{
						document.cookie = aCookie[0]+'=0; expires='+deleteDate+'; path=/';
					}
				}
				document.cookie = cookieEntry.replace('{value}','declined');
				if(cookieValue=='enabled' && cookieValue!='accepted'){
					window.location = options.currentLocation;
				}else{
					if(options.effect=='slide'){
						$('#newsletter-bar').slideUp(300,function(){$('#newsletter-bar').remove();});
					}else if(options.effect=='fade'){
						$('#newsletter-bar').fadeOut(300,function(){$('#newsletter-bar').remove();});
					}else{
						$('#newsletter-bar').hide(0,function(){$('#newsletter-bar').remove();});
					}
					return false;
				}
			});
		}
	};
})(jQuery);

$(document).ready(function(){
  $.newsletterBox({
        message: '<a id="subscribe" href="http://www.visitgreece.gr/en/gnto/newsletter">Subscribe to our newsletter</a>',
        acceptButton: true,
        acceptText: 'X',
 //       autoEnable: true,
 //       acceptOnContinue: false,
		declineButton: false,
		declineText: 'No. Thank you',
        expireDays: 365,
 //       forceShow: false,
        effect: 'slide',
        element: 'body',
		fixed:true
  });
});