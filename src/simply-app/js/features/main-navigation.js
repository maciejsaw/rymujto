//modal generic action
$.On('click', '[js-add-rhyme-button]', function() {
  StateURL.setParam('modalContent', 'eol-modal');
});

StateURL.onChange('modalContent', function(value) {
  $('[js-eol-modal]').isShownWhen(value === 'eol-modal');
});

$.On('click', '[js-start-button]', function() {
  var firstId = $('[js-rhyme-list-item]').attr('id');
  scrollToRhyme(firstId);
});

function scrollToRhyme(rhymeId) {
  var rhymeToScrollTo = $('[id="'+rhymeId+'"]');
  $(window).scrollTo(rhymeToScrollTo, 700);
}

$.On('click', '[js-nav-next]', function() {
  var currentId = StateURL.get('rym');
  var adjacent;
  if (isNotEmpty(currentId)) {
    adjacent = $('[id="'+currentId+'"]').next();
  } else {
    adjacent = $('[js-rhyme-list-item]').first();
  }
  var newId = adjacent.attr('id');

  if (isNotEmpty(newId)) {
    scrollToRhyme(newId);
  }
});

$.On('click', '[js-nav-prev]', function() {
  var currentId = StateURL.get('rym');
  var adjacent = $('[id="'+currentId+'"]').prev();
  var newId = adjacent.attr('id');
  if (isNotEmpty(newId)) {
    scrollToRhyme(newId);
  } else {
    $(window).scrollTo(0, 900);
  }
});

var oneRhymeHeight;
function initDynamicUrlWithRhymesId() {
  oneRhymeHeight = $('[js-rhyme-list-item]').first().innerHeight();

  $(window).on('scroll.dynamicURL', function() {
    var scrollTop = $(this).scrollTop() - oneRhymeHeight/2;
    var indexOfRhyme = scrollTop / oneRhymeHeight;
    console.log(indexOfRhyme);
    if (indexOfRhyme >= 0) {
      indexOfRhyme = Math.floor(indexOfRhyme);
      idOfRhyme = $('[js-rhyme-list-item]').eq(indexOfRhyme).attr('id');
      StateURL.set('rym', idOfRhyme);
    } else {
      StateURL.remove('rym');
    }
  });
}
initDynamicUrlWithRhymesId();
$(window).on('resize', function() {
  $(window).off('scroll.dynamicURL');
  initDynamicUrlWithRhymesId();
});

$(document).on('preloadingComplete', function() {
  var rhymeId = StateURL.get('rym');
  if (isNotEmpty(rhymeId)) {
    scrollToRhyme(rhymeId);
  }
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