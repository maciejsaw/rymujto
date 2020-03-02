/*====================================================================
=            Global variables, environment variables etc.            =
====================================================================*/

//var API_HOST = 'https://api.example.com';
//API_HOST = 'http://localhost:4000'; //comment before merge!!!!!!!!!!
//PROD_ROOT_DOMAIN defined on top of index.html


/*=====  End of Global variables, environment variables etc.  ======*/


/////////////////////////////////

var URLs = {
	homepage: 'https://example.com'
};

if ( window.location.pathname === "/") {
	StateURL.setDefaultParam('subpage', 'home', {doNotCreateHistoryState: true});
}

// Utility functions specific to the app not to framework

//modal generic action
$.On('click', '[js-add-rhyme-button]', function() {
  StateURL.setParam('modalContent', 'eol-modal');
});

StateURL.onChange('modalContent', function(value) {
  $('[js-eol-modal]').isShownWhen(value === 'eol-modal');
});

$.On('click', '[js-start-button]', function() {
  var firstId = $('[js-rhyme-list-item]').attr('id');
  StateURL.setParam('rym', firstId);
});

StateURL.onChange('rym', function(value) {
  var rhymeToScrollTo = $('[id="'+value+'"]');
  $(window).scrollTo(rhymeToScrollTo, 700);
});

$.On('click', '[js-nav-next]', function() {
  var currentId = StateURL.get('rym');
  var newId = $('[id="'+value+'"]').next().attr('id');
  StateURL.setParam('rym', newId);
});

$.On('click', '[js-nav-prev]', function() {
  var currentId = StateURL.get('rym');
  var newId = $('[id="'+value+'"]').prev().attr('id');
  StateURL.setParam('rym', newId);
});


// StateURL.onParamChange('subpage', function(value) {
// 	if (typeof value != 'undefined') {
// 	    showOnlyElementsWithAttributeXMatchingY('js-subpage', value);
// 	}

// 	$('[js-main-scroll-area]').scrollTo(0);
// });

// $.On('click', '[js-go-to-subpage]', function() {
// 	var targetSubpage = $(this).attr('js-go-to-subpage');
// 	StateURL.set('subpage', targetSubpage);
// });

// State.setDefault('user-logged-in', 'false');
// State.onChange('user-logged-in', function(value) {
//   $('[js-show-when-logged-in]').isShownWhen(value === 'true');
//   $('[js-show-when-not-logged-in]').isShownWhen(value === 'false');
// });

// $.On('click', '[js-action-log-in]', function() {
//   window.location.href = "/fake-auth";
// });

// StateURL.onChange('loggedIn', function(value) {
//   if (value === "true") {
//     State.set('user-logged-in', 'true');
//     StateURL.set('modalContent', 'finish-profile');
//     StateURL.remove('loggedIn', {doNotCreateHistoryState: true});
//   }
// });

// $.On('click', '[js-action-log-out]', function() {
//   State.set('user-logged-in', 'false');
// });

// //SPA navigation tabs -- currently unused, kept just in case
// StateURL.onParamChange('mainTab', function(value) {
// 	if (typeof value != 'undefined') {
// 		$('[main-tab-id]').not('[main-tab-id="'+value+'"]').removeClass('is-current');
// 		$('[main-tab-id="'+value+'"]').addClass('is-current');

// 	    $('[secondary-navbar-id]').not('[secondary-navbar-id="'+value+'"]').addClass('is-hidden');
// 	    $('[secondary-navbar-id="'+value+'"]').removeClass('is-hidden');
// 	}
// });

// $.On('click', '[main-tab-id]', function(event) {
// 	var valueToSet = $(event.currentTarget).attr('main-tab-id');
// 	StateURL.setParam('mainTab', valueToSet);

// 	//clicking on tab should load the first subtab content
// 	var relatedSecondaryNavbarId = $(event.currentTarget).attr('main-tab-id');
// 	var firstSecondaryTab = $('[secondary-navbar-id="'+relatedSecondaryNavbarId+'"]').find('[secondary-tab-id]').first();
// 	var subpageId = firstSecondaryTab.attr('secondary-tab-id');
// 	StateURL.setParam('subpage', subpageId, {doNotCreateHistoryState: true});
// 	StateURL.setParam('secondaryTab', subpageId, {doNotCreateHistoryState: true});
// });

// $.On('click', '[secondary-tab-id]', function(event) {
// 	var valueToSet = $(event.currentTarget).attr('secondary-tab-id');
// 	setTimeout(function() {
// 		StateURL.setParam('secondaryTab', valueToSet, {doNotCreateHistoryState: true});
// 	}, 1);
// 	StateURL.setParam('subpage', valueToSet);
// });

// StateURL.onParamChange('secondaryTab', function(value) {
// 	$('[secondary-tab-id]').not('[secondary-tab-id="'+value+'"]').removeClass('is-current');
// 	$('[secondary-tab-id="'+value+'"]').addClass('is-current');
// });

StateURL.onParamChange('subpage', function(value) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'Page view', {
      'event_category': 'Navigation',
      'event_label': value,
    });

    // if (value === "thank-you") {
    //   gtag('event', 'Reached thank you page', {
    //     'event_category': 'Navigation',
    //   });
    // }

    //TODO add changes to tracked pagepath for Single Page App
    //https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications
  }

  // if (typeof fbq !== 'undefined') {

  //   if (value === "thank-you") {
  //     fbq('track', 'Thank you');
  //   }

  // }
});

// StateURL.onParamChange('modalContent', function(value) {
//   if (typeof gtag !== 'undefined') {
//     if (value === 'product-details') {
//       gtag('event', 'Opened modal with energy product details', {
//         'event_category': 'Navigation',
//       });
//     }
//   }
// });

$.On('click', '[js-validate-demo-form]', function() {
	var thisForm = $(this).closest('[js-demo-block-form]');
	State.validateElementChildren(thisForm, {
		onSuccess: function() {
			FlashingNotifications.showAndHideNotification('success', 'All good!', 2000);
		},
		onError: function() {
			var firstError = thisForm.find('[has-error]').first();
			$('body').scrollTo(firstError, 1000, {offset: -100}); //you have full control of what happens after error
		}
	});
});

State.setValidationRules('demo-checkbox', function(value) {
	if (value !== "true") {
		return 'required';
	} else {
		return 'good';
	}
});

State.setValidationRules('demo-checkbox-2', function(value) {
	if (value !== "true") {
		return 'required';
	} else {
		return 'good';
	}
});

State.setValidationRules('demo-input-number', function(value) {
	if (value === "") {
		return 'required';
	} else if (isNotNumeric(value)) {
		return 'not-a-number';
	} else {
		return 'good';
	}
});

State.setValidationRules('demo-textarea', function(value) {
	if (value === "") {
		return 'required';
	} else if (value.length < 10) {
		return 'too-short';
	} else {
		return 'good';
	}
});

//# sourceMappingURL=scripts-bundle.js.map