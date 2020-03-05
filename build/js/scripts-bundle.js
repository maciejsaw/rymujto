/*====================================================================
=            Global variables, environment variables etc.            =
====================================================================*/

//var API_HOST = 'https://api.example.com';
//API_HOST = 'http://localhost:4000'; //comment before merge!!!!!!!!!!
//PROD_ROOT_DOMAIN defined on top of index.html


/*=====  End of Global variables, environment variables etc.  ======*/


/////////////////////////////////

// var URLs = {
// 	homepage: 'https://example.com'
// };

// if ( window.location.pathname === "/") {
// 	StateURL.setDefaultParam('subpage', 'home', {doNotCreateHistoryState: true});
// }

// Utility functions specific to the app not to framework

//modal generic action
On.touchendOrClick('[js-add-rhyme-button]', function() {
  StateURL.setParam('modalContent', 'eol-modal');
});

StateURL.onChange('modalContent', function(value) {
  $('[js-eol-modal]').isShownWhen(value === 'eol-modal');
});

On.touchendOrClick('[js-start-button]', function() {
  var firstId = $('[js-rhyme-list-item]').attr('id');
  scrollToRhyme(firstId);
});

function scrollToRhyme(rhymeId) {
  var rhymeToScrollTo = $('[id="'+rhymeId+'"]');
  $(window).scrollTo(rhymeToScrollTo, 500);
}

function nextRhyme() {
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
}

function previousRhyme() {
  var currentId = StateURL.get('rym');
  var adjacent = $('[id="'+currentId+'"]').prev();
  var newId = adjacent.attr('id');
  if (isNotEmpty(newId)) {
    scrollToRhyme(newId);
  } else {
    $(window).scrollTo(0, 900);
  }
}

var oneRhymeHeight;
function initDynamicUrlWithRhymesId() {
  oneRhymeHeight = $('[js-rhyme-list-item]').first().innerHeight();

  $(window).on('scroll.dynamicURL', function() {
    var scrollTop = $(this).scrollTop() - oneRhymeHeight/2;
    var indexOfRhyme = scrollTop / oneRhymeHeight;
    if (indexOfRhyme >= 0) {
      indexOfRhyme = Math.floor(indexOfRhyme);
      idOfRhyme = $('[js-rhyme-list-item]').eq(indexOfRhyme).attr('id');
      StateURL.set('rym', idOfRhyme, {doNotCreateHistoryState: true});
      State.set('rym', idOfRhyme);
    } else {
      StateURL.remove('rym');
      State.remove('rym');
    }
  });
}
initDynamicUrlWithRhymesId();
$(window).on('resize', function() {
  $(window).off('scroll.dynamicURL');
  initDynamicUrlWithRhymesId();
});

$(document).on('renderingListReady', function() {
  var rhymeIdURL = StateURL.get('rym');
  var rhymeIdLocalStorage = State.get('rym');
  if (isNotEmpty(rhymeIdURL)) {
    scrollToRhyme(rhymeIdURL);
  } else if ( isNotEmpty(rhymeIdLocalStorage) ) {
    scrollToRhyme(rhymeIdLocalStorage);
  }
});

On.touchendOrClick('click', '[js-nav-next]', function() {
  nextRhyme();
});

$.On('click', '[js-nav-prev]', function() {
  previousRhyme();
});

$(document).keydown(function(e) {
  console.log(e.key);
  if (e.key === "ArrowRight") {
    nextRhyme();
  } else if (e.key === "ArrowLeft") {
    previousRhyme();
  }
});

//first click on logo should scroll to top, then work as a normal link
$(document).on('click', '[href="index.html"]', function(e) {
  if (isNotEmpty(State.get('rym'))) {
    e.preventDefault();
    $(window).scrollTo(0);
  } else {
    return true;
  }
});

//TODO!!!!!!!!!
/*
Sprzątnąć build
Zrobić update aplikacji APK
*/

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

//Rendering all HTML list for server rendered HTML in Webflow
//Not a part of any build, just use this in console and then extract HTML
function renderRhymesList() {
  var data = [
    {
      "textContent": "Łokieć pięta dziura w ścianie\nzjedz snikersa na śniadanie",
      "author": "Łpnk",
      "dateAdded": {
        "$date": 1472724421139
      },
      "ratedGoodCounter": 2957,
      "ratedBadCounter": 144,
      "ratingIndex": 0.9532558650871983,
      "_id": "kR6ozEF6aNiTBejBD"
    },
    {
      "textContent": "Hokus Pokus Sranie w Banie\nKoniec Memów o Pazdanie",
      "author": "Suarez1284",
      "dateAdded": {
        "$date": 1468484593822
      },
      "ratedGoodCounter": 1954,
      "ratedBadCounter": 110,
      "ratingIndex": 0.9462467526017864,
      "_id": "XgvZFkqF2gbz6m7HG"
    },
    {
      "textContent": "Gdy pogoda ci nie sprzyja\nTo pierdolnij komuś w ryja",
      "author": "Strażak Miłosz",
      "dateAdded": {
        "$date": 1485297910535
      },
      "ratedGoodCounter": 1919,
      "ratedBadCounter": 85,
      "ratingIndex": 0.9571069948570022,
      "_id": "aykLgJ829NrAGgSKf"
    },
    {
      "textContent": "Łokieć pięta, mam już kaca,\nWeź poszukaj materaca",
      "author": "Kuzynka89",
      "dateAdded": {
        "$date": 1474799217425
      },
      "ratedGoodCounter": 1629,
      "ratedBadCounter": 90,
      "ratingIndex": 0.9470927034436619,
      "_id": "RFkn3b77zwMTSLDa9"
    },
    {
      "textContent": "Gdy się weekend rozpoczyna\nKażdy uczeń grać zaczyna.",
      "author": "SnajpiPL",
      "dateAdded": {
        "$date": 1475267618223
      },
      "ratedGoodCounter": 1546,
      "ratedBadCounter": 74,
      "ratingIndex": 0.9537319011514523,
      "_id": "sHLpn7PKxXGEWCxqn"
    },
    {
      "textContent": "Dziewczyn więcej mam od Bond'a\nBo w garażu stoi Honda",
      "author": "FG z Sanoka",
      "dateAdded": {
        "$date": 1464299033875
      },
      "ratedGoodCounter": 1539,
      "ratedBadCounter": 80,
      "ratingIndex": 0.9499996380406218,
      "_id": "azT98WCeT5AXfy3uC"
    },
    {
      "textContent": "Nie oglądaj sie za siebie\nbo ci z przodu ktos wyjebie",
      "author": "Mante/maxs11",
      "dateAdded": {
        "$date": 1453458115100
      },
      "ratedGoodCounter": 1358,
      "ratedBadCounter": 81,
      "ratingIndex": 0.9430551024985088,
      "_id": "eadYSJLLaq4oKkBi3"
    },
    {
      "textContent": "Łokieć pięta i kolano nie\nchce mi się wstawać rano",
      "author": "Lemon ;]",
      "dateAdded": {
        "$date": 1489945332956
      },
      "ratedGoodCounter": 1311,
      "ratedBadCounter": 59,
      "ratingIndex": 0.9562358153853475,
      "_id": "xBJry2mRKC9NBAGf3"
    },
    {
      "textContent": "Moja babcia jest kucharką,  robi kluski betoniarką\nA mój dziadek jest górnikiem,  kopie węgiel pod śmietnikiem.",
      "author": "Karika",
      "dateAdded": {
        "$date": 1475572524177
      },
      "ratedGoodCounter": 1293,
      "ratedBadCounter": 89,
      "ratingIndex": 0.9349235896626349,
      "_id": "qBHezuoWFEsH9C8fb"
    },
    {
      "textContent": "mam tę moc mam tę moc\nchciałem pierdnąć wyszedł kloc",
      "author": "sebaPL",
      "dateAdded": {
        "$date": 1481997243985
      },
      "ratedGoodCounter": 1275,
      "ratedBadCounter": 71,
      "ratingIndex": 0.9465473635529318,
      "_id": "QMcWDSmxgSeYHQx9a"
    },
    {
      "textContent": "Michael Jackson królem popu\nJusin Biber żulem roku",
      "author": "dorprzy05",
      "dateAdded": {
        "$date": 1494044555217
      },
      "ratedGoodCounter": 1242,
      "ratedBadCounter": 120,
      "ratingIndex": 0.9112247492557916,
      "_id": "ojTggeJpsgPZXvrKt"
    },
    {
      "textContent": "Jak sie bawić tak się bawić\nDrzwi wyjebać okno wstawić",
      "author": "As#",
      "dateAdded": {
        "$date": 1476194458811
      },
      "ratedGoodCounter": 1239,
      "ratedBadCounter": 67,
      "ratingIndex": 0.947971903141837,
      "_id": "HgxFa2CwpvymsqFdf"
    },
    {
      "textContent": "Za górami, za lasami żył Bin Laden z Arabami.\nNa swym kompie wcisnął ENTER i wysadził World Trade Center!",
      "author": "Twoja mama",
      "dateAdded": {
        "$date": 1468624594735
      },
      "ratedGoodCounter": 1213,
      "ratedBadCounter": 75,
      "ratingIndex": 0.9410389993948257,
      "_id": "Kwfe26hvQu8WF6BRf"
    },
    {
      "textContent": "Nie do rymu nie do taktu\nWsadź se dupe do kontaktu a w kontakcie było spięcie i zrobiło dupy zdjęcie",
      "author": "BLOR",
      "dateAdded": {
        "$date": 1452977322403
      },
      "ratedGoodCounter": 1206,
      "ratedBadCounter": 72,
      "ratingIndex": 0.9429235841217396,
      "_id": "HcLJqpL8dkypvTE8e"
    },
    {
      "textContent": "Moje życie moja sprawa jest\nryzyko jest zabawa",
      "author": "Hanna Harat",
      "dateAdded": {
        "$date": 1488012601974
      },
      "ratedGoodCounter": 1197,
      "ratedBadCounter": 58,
      "ratingIndex": 0.9530248754756739,
      "_id": "SmRvTrJCFcHchkMBQ"
    },
    {
      "textContent": "Łokieć pięta elementa\nMamy w klasie konfidenta",
      "author": "XxRYMUxX",
      "dateAdded": {
        "$date": 1486485564803
      },
      "ratedGoodCounter": 1137,
      "ratedBadCounter": 56,
      "ratingIndex": 0.9522606401402133,
      "_id": "qxEQMPNvttb9ezjP4"
    },
    {
      "textContent": "Łokieć Pięta 3 piórniki\njebac panią od Fizyki",
      "author": "Miciewicz",
      "dateAdded": {
        "$date": 1478371791812
      },
      "ratedGoodCounter": 1136,
      "ratedBadCounter": 73,
      "ratingIndex": 0.9388423365642691,
      "_id": "QsHXSaB8TTt3xP3Qe"
    },
    {
      "textContent": "czary mary ence pence\njustin biber śpi w łazięce",
      "author": "dorprzy05",
      "dateAdded": {
        "$date": 1494044653163
      },
      "ratedGoodCounter": 1128,
      "ratedBadCounter": 126,
      "ratingIndex": 0.898804210435028,
      "_id": "ziwFrxGP4eyfsaPqf"
    },
    {
      "textContent": "Nie ma jak to w letniej porze, Można wysrać się na dworze,\nLetni wietrzyk w dupę dmucha, A na gównie siada mucha.",
      "author": "MichałM",
      "dateAdded": {
        "$date": 1475572184372
      },
      "ratedGoodCounter": 1117,
      "ratedBadCounter": 78,
      "ratingIndex": 0.9339458386928544,
      "_id": "jBGHMKK7rz8iMwvmf"
    },
    {
      "textContent": "Łokieć pięta no i rtęć\nJutro tylko lekcji pięć",
      "author": "😊Anonimowa 😊",
      "dateAdded": {
        "$date": 1485377069815
      },
      "ratedGoodCounter": 1110,
      "ratedBadCounter": 63,
      "ratingIndex": 0.9454848333851154,
      "_id": "hneQ2CMjQYhYJJAyF"
    },
    {
      "textContent": "zero smutku zero złości\nwyjebane po całości",
      "author": "takatamja",
      "dateAdded": {
        "$date": 1467624499904
      },
      "ratedGoodCounter": 1101,
      "ratedBadCounter": 66,
      "ratingIndex": 0.9426362956282144,
      "_id": "q3zGAwmjppxRJcHTG"
    },
    {
      "textContent": "łokieć pięta i parówka\nniech ominie nas kartkowka",
      "author": "dworuś [*]",
      "dateAdded": {
        "$date": 1479243626597
      },
      "ratedGoodCounter": 1073,
      "ratedBadCounter": 65,
      "ratingIndex": 0.9420537097238981,
      "_id": "MRvH5rTZkuQojfooJ"
    },
    {
      "textContent": "Matmy nie trawie, na polskim się dławie\nanglik jest nudny, a dzwonek przecudny!",
      "author": "marta :-)",
      "dateAdded": {
        "$date": 1492255940991
      },
      "ratedGoodCounter": 1066,
      "ratedBadCounter": 57,
      "ratingIndex": 0.9483978288620247,
      "_id": "ntH8zMDS8HpTRxhEu"
    },
    {
      "textContent": "Na górze róże nic nie ma na dole\nJutro do szkoły no japierdole",
      "author": "Nikolaaa ;3",
      "dateAdded": {
        "$date": 1474900908783
      },
      "ratedGoodCounter": 1065,
      "ratedBadCounter": 75,
      "ratingIndex": 0.9333910449554019,
      "_id": "qsAJ8ewpJ4fjJwSQY"
    },
    {
      "textContent": "Ja jem lody i cukierki\nTy jesz gówno i papierki",
      "author": "Sarenka1234",
      "dateAdded": {
        "$date": 1501882865692
      },
      "ratedGoodCounter": 1042,
      "ratedBadCounter": 81,
      "ratingIndex": 0.9270455309059144,
      "_id": "6zYS59Yv7uvC44hT8"
    },
    {
      "textContent": "Hokus pokus liż mi pięte\nWszystkie teksty z neta wzięte...",
      "author": "BoRo!",
      "dateAdded": {
        "$date": 1473855507691
      },
      "ratedGoodCounter": 1038,
      "ratedBadCounter": 57,
      "ratingIndex": 0.9470795027104104,
      "_id": "a4NL7oDRR9wAW5wEk"
    },
    {
      "textContent": "Nie ma w domu dziś zadymy\nWięc tu będą dobre rymy😈😉",
      "author": "ByJoko#xD",
      "dateAdded": {
        "$date": 1495577995560
      },
      "ratedGoodCounter": 1015,
      "ratedBadCounter": 141,
      "ratingIndex": 0.877268146980075,
      "_id": "cPjKX6SKNXCZatRnc"
    },
    {
      "textContent": "stare auto, nowy wóz\nsfinansuje 500+",
      "author": "stallker",
      "dateAdded": {
        "$date": 1487983628209
      },
      "ratedGoodCounter": 1013,
      "ratedBadCounter": 51,
      "ratingIndex": 0.9511728718229275,
      "_id": "SpL9J2a3WEHLkJy6w"
    },
    {
      "textContent": "Łokieć pięta abecadło\nPora zrzucić już to sadło",
      "author": "Kinia",
      "dateAdded": {
        "$date": 1495564729450
      },
      "ratedGoodCounter": 1006,
      "ratedBadCounter": 78,
      "ratingIndex": 0.9271881515463584,
      "_id": "Hxseczu73v3GBaR4f"
    },
    {
      "textContent": "Łokieć pięta ananasy\nTwoja stara ma zakwasy",
      "author": "Aniutkan",
      "dateAdded": {
        "$date": 1474063752092
      },
      "ratedGoodCounter": 1005,
      "ratedBadCounter": 90,
      "ratingIndex": 0.9169700395543621,
      "_id": "Yozo5xNCpXFxJfs7k"
    },
    {
      "textContent": "Taki silny? Taki znany?\nRozwal Nokie 3310 to porozmawiamy",
      "author": "Doti",
      "dateAdded": {
        "$date": 1495570876354
      },
      "ratedGoodCounter": 992,
      "ratedBadCounter": 166,
      "ratingIndex": 0.8559096373705735,
      "_id": "sTegjqgrFPFxoB2dX"
    },
    {
      "textContent": "bramkarz pierwsza klasa bo\nma buty adidasa",
      "author": "Supr Bro ❤",
      "dateAdded": {
        "$date": 1494026580157
      },
      "ratedGoodCounter": 990,
      "ratedBadCounter": 110,
      "ratingIndex": 0.8991818212875206,
      "_id": "eCJRoHojr6mR6KgRJ"
    },
    {
      "textContent": "Dzisiaj piątek dzień wesoły, bo\nOstatni dzień do szkoły!",
      "author": "Anonimowa❤",
      "dateAdded": {
        "$date": 1486729209838
      },
      "ratedGoodCounter": 964,
      "ratedBadCounter": 54,
      "ratingIndex": 0.9460246052995854,
      "_id": "b5238hsw63jSgrkMH"
    },
    {
      "textContent": "Polskiego nie trawię, matmą się dławię\ndławię, angielski jest nudny, a dzwonek-przecudny😍",
      "author": "Nie znana malinkaa",
      "dateAdded": {
        "$date": 1476948761253
      },
      "ratedGoodCounter": 952,
      "ratedBadCounter": 88,
      "ratingIndex": 0.914504445758798,
      "_id": "oN6XfYDizGe75utJX"
    },
    {
      "textContent": "Dziś sobota dzień wesoly\nbo nie trzeba iść do szkoły",
      "author": "Mistrz Rym2",
      "dateAdded": {
        "$date": 1476438837632
      },
      "ratedGoodCounter": 938,
      "ratedBadCounter": 71,
      "ratingIndex": 0.928711965741776,
      "_id": "kGz48NjtWFLWTbZcb"
    },
    {
      "textContent": "Łokieć, pięta szybkie auto\nWszyscy robią jedno salto",
      "author": "kuzyn tv",
      "dateAdded": {
        "$date": 1494913147154
      },
      "ratedGoodCounter": 901,
      "ratedBadCounter": 139,
      "ratingIndex": 0.8655131400343675,
      "_id": "RQKECkgYAvWJahSqx"
    },
    {
      "textContent": "Mam zimne rączki mam zimne uszka\nWięc przytul mnie do swego serduszka :)",
      "author": "Sancho",
      "dateAdded": {
        "$date": 1476561481706
      },
      "ratedGoodCounter": 879,
      "ratedBadCounter": 66,
      "ratingIndex": 0.929174438525013,
      "_id": "LftD5bJBwzKKDAbAt"
    },
    {
      "textContent": "Łokieć pięta i 2 tosty\nnie masz fejmu usuń posty",
      "author": "Naj_misia",
      "dateAdded": {
        "$date": 1481977384664
      },
      "ratedGoodCounter": 865,
      "ratedBadCounter": 48,
      "ratingIndex": 0.9463883636279994,
      "_id": "vEbKEd6cjGxZEmhoX"
    },
    {
      "textContent": "Pójdę se poszukać żony\nAle wolę pokemony",
      "author": "Hasztag###",
      "dateAdded": {
        "$date": 1474055972446
      },
      "ratedGoodCounter": 853,
      "ratedBadCounter": 75,
      "ratingIndex": 0.9181905411549797,
      "_id": "tRwZanDtvqYFWpnww"
    },
    {
      "textContent": "ujebała misia pszczoła-o ty kurwo!-misio woła\nza me męki za me bóle rozpierdole wszystkie ule",
      "author": ";-;",
      "dateAdded": {
        "$date": 1465293646339
      },
      "ratedGoodCounter": 852,
      "ratedBadCounter": 61,
      "ratingIndex": 0.9321651876985433,
      "_id": "RJRLW3d8o9gd87yvM"
    },
    {
      "textContent": "hokus pokus beton twardy\nindyk dziobem zniszczył narty",
      "author": "kocurro132456789",
      "dateAdded": {
        "$date": 1494884535540
      },
      "ratedGoodCounter": 849,
      "ratedBadCounter": 146,
      "ratingIndex": 0.8524087892896725,
      "_id": "4TR6Yei2ef47B4hHQ"
    },
    {
      "textContent": "Everybody madafaka\nBawię się w Michała Szpaka",
      "author": "Karii",
      "dateAdded": {
        "$date": 1500286473032
      },
      "ratedGoodCounter": 838,
      "ratedBadCounter": 131,
      "ratingIndex": 0.8639166118140922,
      "_id": "quQzeJRenszLsJxaT"
    },
    {
      "textContent": "Ile w pysku\ntyle zysku 😂😂",
      "author": "Acacia",
      "dateAdded": {
        "$date": 1499211184863
      },
      "ratedGoodCounter": 813,
      "ratedBadCounter": 100,
      "ratingIndex": 0.8894956608382921,
      "_id": "7hYGTXFqjFX5eeBoT"
    },
    {
      "textContent": "Na górze róże, na dole czajnik\nNapój na dzisiaj, to rozpuszczalnik",
      "author": "Gargamelowa 🙃",
      "dateAdded": {
        "$date": 1486748055234
      },
      "ratedGoodCounter": 809,
      "ratedBadCounter": 48,
      "ratingIndex": 0.942889160293793,
      "_id": "MT3HdnQJJzsop7MZY"
    },
    {
      "textContent": "Moja babcia jest kucharka robi kluski betoniarka\nA muj dziadek jest górnikiem kopie węgiel pod smietnikiem",
      "author": "Napalony",
      "dateAdded": {
        "$date": 1501865676163
      },
      "ratedGoodCounter": 806,
      "ratedBadCounter": 97,
      "ratingIndex": 0.8915918336492339,
      "_id": "qSKXfGpbwDNbefooq"
    },
    {
      "textContent": "Na górze róże, na dole akacje\nczas na expienie bo są wakacje",
      "author": "erykpl",
      "dateAdded": {
        "$date": 1494878191153
      },
      "ratedGoodCounter": 795,
      "ratedBadCounter": 110,
      "ratingIndex": 0.8774823856378908,
      "_id": "KBWJwkpbXhzpdrTvr"
    },
    {
      "textContent": "Jeśli wiara czyni cuda\nMusisz wiedzieć że się uda",
      "author": "Rym_na_rym",
      "dateAdded": {
        "$date": 1476214480985
      },
      "ratedGoodCounter": 790,
      "ratedBadCounter": 54,
      "ratingIndex": 0.9349099317288568,
      "_id": "EGCks5ASsutJYRKob"
    },
    {
      "textContent": "Łokieć, pięta motyl ważka\nMoje życie to porażka 😉",
      "author": "Nisia-💗",
      "dateAdded": {
        "$date": 1525164321491
      },
      "ratedGoodCounter": 788,
      "ratedBadCounter": 44,
      "ratingIndex": 0.9459770280756008,
      "_id": "vFMQZ6g9mbnibGy4e"
    },
    {
      "textContent": "Gdy ci smutno gdy ci źle\nzjedz OREO udław się ;D",
      "author": "KoxugraPL",
      "dateAdded": {
        "$date": 1486489057353
      },
      "ratedGoodCounter": 770,
      "ratedBadCounter": 46,
      "ratingIndex": 0.9424710509681687,
      "_id": "4fi2YFwDwX5bRY45L"
    },
    {
      "textContent": "Hokus... Pokus... Czary.. Mary...\nNie Ma Szkoły Są WAGARY !!!",
      "author": "ZNAJOMA",
      "dateAdded": {
        "$date": 1490122625142
      },
      "ratedGoodCounter": 769,
      "ratedBadCounter": 50,
      "ratingIndex": 0.9378034860120622,
      "_id": "4v7YiFCZKC9EgiBGL"
    },
    {
      "textContent": "Nasza szkoła jest do dupy\nwięc spierdalaj do chałupy",
      "author": "camper",
      "dateAdded": {
        "$date": 1455223146718
      },
      "ratedGoodCounter": 754,
      "ratedBadCounter": 51,
      "ratingIndex": 0.9354824302404802,
      "_id": "HAYD4bBeb7HKEKAfW"
    },
    {
      "textContent": "łokieć pięta czysty pręcik\nwyjaśniony konfidencik",
      "author": "olekbug",
      "dateAdded": {
        "$date": 1490041979420
      },
      "ratedGoodCounter": 750,
      "ratedBadCounter": 38,
      "ratingIndex": 0.9505688169053828,
      "_id": "STfFRRSzwENhSaqLT"
    },
    {
      "textContent": "mam tę moc! mam tę moc!\nsiedze w kiblu całą nooc!!",
      "author": "Zocha",
      "dateAdded": {
        "$date": 1461944462096
      },
      "ratedGoodCounter": 750,
      "ratedBadCounter": 57,
      "ratingIndex": 0.9282163967331705,
      "_id": "uioH3GxmrJfmQyb8B"
    },
    {
      "textContent": "Do sprawdzianów trzeba dwojga\njeden pisze drugi ściąga",
      "author": "marta :-)",
      "dateAdded": {
        "$date": 1492255264133
      },
      "ratedGoodCounter": 726,
      "ratedBadCounter": 54,
      "ratingIndex": 0.9295759389190955,
      "_id": "RbfkXfSaPsFLjJnEm"
    },
    {
      "textContent": "Jabłko mi zeżarłaś szmato\ndziś cie kara spotka za to😂👌",
      "author": "Andziak 😂😂😀",
      "dateAdded": {
        "$date": 1494865761876
      },
      "ratedGoodCounter": 726,
      "ratedBadCounter": 139,
      "ratingIndex": 0.8383360664661147,
      "_id": "mJXG9w4v4ehm3Jt2p"
    },
    {
      "textContent": "Łokieć pięta 5 butelek,\nrekwiruje ten rowerek",
      "author": "Alan Brzozowski",
      "dateAdded": {
        "$date": 1493810569897
      },
      "ratedGoodCounter": 725,
      "ratedBadCounter": 72,
      "ratingIndex": 0.9085198786201193,
      "_id": "oxEFKusumHxAyzivk"
    },
    {
      "textContent": "Jak sie nie ma co sie pragnie\nTo sie kradnie co popadnie",
      "author": "lancer",
      "dateAdded": {
        "$date": 1490189754190
      },
      "ratedGoodCounter": 708,
      "ratedBadCounter": 44,
      "ratingIndex": 0.9402373835005768,
      "_id": "bowtZo8ZASfBRuLCE"
    },
    {
      "textContent": "Chleb, ogórki, trochę mleka\nsraczka już na ciebie czeka.",
      "author": "Winiak",
      "dateAdded": {
        "$date": 1476314545521
      },
      "ratedGoodCounter": 702,
      "ratedBadCounter": 39,
      "ratingIndex": 0.9460899240809649,
      "_id": "ZJpLJoNH9ZeaaviXP"
    },
    {
      "textContent": "Choć za oknem śniegiem pruszy\nRyj Twój krzywy mnie nie wzruszy",
      "author": "Karakan",
      "dateAdded": {
        "$date": 1479229483120
      },
      "ratedGoodCounter": 702,
      "ratedBadCounter": 51,
      "ratingIndex": 0.9310328466596713,
      "_id": "TorDwAHxcAkopCfZg"
    },
    {
      "textContent": "Ługi-Bugi\nJaram Szlugi",
      "author": "0r1g1n3x",
      "dateAdded": {
        "$date": 1494004875307
      },
      "ratedGoodCounter": 688,
      "ratedBadCounter": 125,
      "ratingIndex": 0.8452075846442118,
      "_id": "ykkir32dmN9gFotA3"
    },
    {
      "textContent": "kwiecień plecień bo przeplata\nczapka, szalik i łopata",
      "author": "lubię placki",
      "dateAdded": {
        "$date": 1494016681214
      },
      "ratedGoodCounter": 681,
      "ratedBadCounter": 126,
      "ratingIndex": 0.8428205067712031,
      "_id": "nCQTcruYcwuMgJ2fM"
    },
    {
      "textContent": "matmy nie trawie, polskim się dławie\nanglik jest nudny a dzwonek przecudny!",
      "author": "teri peri",
      "dateAdded": {
        "$date": 1488050957332
      },
      "ratedGoodCounter": 670,
      "ratedBadCounter": 52,
      "ratingIndex": 0.9266925607564385,
      "_id": "EeTMskuS9EwTTmXcd"
    },
    {
      "textContent": "Na górze piwo na dole fajka\nnie mam dziewczyny mam Counter Strike",
      "author": "patryk42",
      "dateAdded": {
        "$date": 1474031259754
      },
      "ratedGoodCounter": 666,
      "ratedBadCounter": 68,
      "ratingIndex": 0.9061207748575578,
      "_id": "aKaiuMTFFp48y3yrB"
    },
    {
      "textContent": "Łokieć pieta radio eska\nLittle monster to jest deska",
      "author": "Ja",
      "dateAdded": {
        "$date": 1508793709775
      },
      "ratedGoodCounter": 661,
      "ratedBadCounter": 106,
      "ratingIndex": 0.8606756296546363,
      "_id": "PdpsARmYgNwJWSHiy"
    },
    {
      "textContent": "Gdy Ci smutno gdy Ci\nźle idź na kompa pograj se ;)",
      "author": "KubRoxx",
      "dateAdded": {
        "$date": 1476810740878
      },
      "ratedGoodCounter": 656,
      "ratedBadCounter": 42,
      "ratingIndex": 0.9384816239210155,
      "_id": "nvb2wA7sk8n297xfJ"
    },
    {
      "textContent": "Dostajecie same dwóje?\nDo nauki tępe chuje!",
      "author": "Nina xD",
      "dateAdded": {
        "$date": 1469318078005
      },
      "ratedGoodCounter": 653,
      "ratedBadCounter": 52,
      "ratingIndex": 0.9249273204187174,
      "_id": "mRXoyRRXh8ePBG7HZ"
    },
    {
      "textContent": "Głucho wszędzie, ciemno wszędzie,\nChyba prądu dziś nie będzie.",
      "author": "Alusia_7",
      "dateAdded": {
        "$date": 1489216871460
      },
      "ratedGoodCounter": 646,
      "ratedBadCounter": 35,
      "ratingIndex": 0.9472120415051325,
      "_id": "m8gz9mQTaaytTtkLv"
    },
    {
      "textContent": "Waldek, Stefan i Grażyna\ni impreza sie zaczyna",
      "author": "majaveronica",
      "dateAdded": {
        "$date": 1485808048396
      },
      "ratedGoodCounter": 640,
      "ratedBadCounter": 43,
      "ratingIndex": 0.93567051612588,
      "_id": "fxsEDDejyGyFEHoLP"
    },
    {
      "textContent": "Siekiera motyka mała oska\nMogłam zginąć, matko boska!",
      "author": "JulkaMSP",
      "dateAdded": {
        "$date": 1453457913073
      },
      "ratedGoodCounter": 630,
      "ratedBadCounter": 48,
      "ratingIndex": 0.9278330431924421,
      "_id": "F2w3YRWifSfCBmj4H"
    },
    {
      "textContent": "Tu mnie boli tam mnie rwie. Tu mam jedną tam mam dwie.\nTu mam ciotkę, tam mam  wuja, znajomości mam od ch*ja.",
      "author": "nietzsche",
      "dateAdded": {
        "$date": 1456669820315
      },
      "ratedGoodCounter": 630,
      "ratedBadCounter": 49,
      "ratingIndex": 0.9264685879159476,
      "_id": "csymFhTE5eqyMGRqc"
    },
    {
      "textContent": "Kto po nocy czyta rymy\nŁapa w górę i lecimy",
      "author": "Dominik@",
      "dateAdded": {
        "$date": 1491084720419
      },
      "ratedGoodCounter": 627,
      "ratedBadCounter": 31,
      "ratingIndex": 0.9514393826126656,
      "_id": "nQRTDfKpRGF3z5d7B"
    },
    {
      "textContent": "Lokiec pieta dobry bajer\nDaj superke nie badz frajer",
      "author": "Kempy",
      "dateAdded": {
        "$date": 1491055742363
      },
      "ratedGoodCounter": 625,
      "ratedBadCounter": 76,
      "ratingIndex": 0.8903115822025996,
      "_id": "rpeCB2tttzxboYhS3"
    },
    {
      "textContent": "łokieć piętą i pod górkę\ntwoja stara ma biegunkę",
      "author": "mati",
      "dateAdded": {
        "$date": 1493801043668
      },
      "ratedGoodCounter": 625,
      "ratedBadCounter": 88,
      "ratingIndex": 0.8753484326502663,
      "_id": "wrimKmeKHps4QZCQ8"
    },
    {
      "textContent": "Twoje serduszko Pika Pika\nJak ta klapa od śmietnika",
      "author": "Stasiu G.",
      "dateAdded": {
        "$date": 1493799793406
      },
      "ratedGoodCounter": 622,
      "ratedBadCounter": 68,
      "ratingIndex": 0.9001428314707771,
      "_id": "umrnzsdJiJmrGbArC"
    },
    {
      "textContent": "Szukam męża szukam żony\nIdę łapać pokemony",
      "author": "Nina xD",
      "dateAdded": {
        "$date": 1469441211464
      },
      "ratedGoodCounter": 620,
      "ratedBadCounter": 59,
      "ratingIndex": 0.9117627371446496,
      "_id": "rWPStk6RSpuF9XviK"
    },
    {
      "textContent": "Fajne rymy, pierwsza klasa teraz zatancz na golasa\nWszyscy rzygać wokół będą i nazywac ciebie mendą 😀",
      "author": "GALANONIM",
      "dateAdded": {
        "$date": 1479151979197
      },
      "ratedGoodCounter": 619,
      "ratedBadCounter": 46,
      "ratingIndex": 0.9294273282126753,
      "_id": "n29XEM7iocD6Jg7Nb"
    },
    {
      "textContent": "Łokieć,pięta pieseł zły\nJuż wyszczerzył swoje kły",
      "author": "Mm",
      "dateAdded": {
        "$date": 1493812925745
      },
      "ratedGoodCounter": 616,
      "ratedBadCounter": 77,
      "ratingIndex": 0.8876062339424349,
      "_id": "768mYA5Chgkuugqej"
    },
    {
      "textContent": "Dziewczyn więcej mam od Bond'a,\nBo w garażu stoi Honda... xD 😂😅😉😃😄😀",
      "author": "👊ROG4LEK👌",
      "dateAdded": {
        "$date": 1476436296858
      },
      "ratedGoodCounter": 615,
      "ratedBadCounter": 53,
      "ratingIndex": 0.9192804562493432,
      "_id": "HMJDdbpZEZ7XtpCo6"
    },
    {
      "textContent": "łokieć,głowa,brudna pięta\nza niedługo będą święta",
      "author": "święta",
      "dateAdded": {
        "$date": 1480529836594
      },
      "ratedGoodCounter": 614,
      "ratedBadCounter": 41,
      "ratingIndex": 0.9359734325831216,
      "_id": "pNYE7F6my9y3oLBXH"
    },
    {
      "textContent": "Książka, zeszyt,  praca w domu,\ndziś się nie chce nic nikomu.",
      "author": "magbla",
      "dateAdded": {
        "$date": 1487203675850
      },
      "ratedGoodCounter": 613,
      "ratedBadCounter": 33,
      "ratingIndex": 0.9474475015858208,
      "_id": "b9fF22nzsCheBbp53"
    },
    {
      "textContent": "na górze róże, na dole ruski\nbędę na obiad dzisiaj mieć kluski",
      "author": "kluski",
      "dateAdded": {
        "$date": 1458326565168
      },
      "ratedGoodCounter": 612,
      "ratedBadCounter": 46,
      "ratingIndex": 0.9286776792339445,
      "_id": "4B2SixCM7jtoCFTnC"
    },
    {
      "textContent": "Hokus pokus czary mary\nHarry Potter zmywa gary",
      "author": "NiePowiem",
      "dateAdded": {
        "$date": 1491078973199
      },
      "ratedGoodCounter": 611,
      "ratedBadCounter": 76,
      "ratingIndex": 0.888079516499084,
      "_id": "CSAiKSxqXTjvMqbyX"
    },
    {
      "textContent": "Łokieć pięta chleb z pasztetem\nCzy zostaniesz mym facetem?",
      "author": "Tasior",
      "dateAdded": {
        "$date": 1493801173483
      },
      "ratedGoodCounter": 609,
      "ratedBadCounter": 87,
      "ratingIndex": 0.8737428262372784,
      "_id": "rt5yzcunoEREqbpgw"
    },
    {
      "textContent": "Fajne rymy, pierwsza klasa,wszyscy tańczą na golasa.\nWszyscy rzygać wokół będą i nazywać ciebie mędą!",
      "author": "~ZwariowanA",
      "dateAdded": {
        "$date": 1493711246997
      },
      "ratedGoodCounter": 604,
      "ratedBadCounter": 51,
      "ratingIndex": 0.9207295666435512,
      "_id": "q4BHAMwF2M8drKg4g"
    },
    {
      "textContent": "Moje rymy wymiataja twoje jednak wygasaja\nchcesz mnie dzis zaatakowac? najpierw naucz sie blokowac!",
      "author": "0r1g1n3x",
      "dateAdded": {
        "$date": 1493797743288
      },
      "ratedGoodCounter": 580,
      "ratedBadCounter": 89,
      "ratingIndex": 0.8656697264311033,
      "_id": "ZqjRgM5CF39aYpgfH"
    },
    {
      "textContent": "Łokieć pięta okno srebrne\nWypierdalaj bo ci jebne",
      "author": "Dominik .,.",
      "dateAdded": {
        "$date": 1479929358985
      },
      "ratedGoodCounter": 572,
      "ratedBadCounter": 43,
      "ratingIndex": 0.9285689736839292,
      "_id": "D6z9ZKJCs25eLwboq"
    },
    {
      "textContent": "łokieć piętą skały kruche\nMamo nie wchódź wale gruche",
      "author": "Kacper waniak",
      "dateAdded": {
        "$date": 1490599438518
      },
      "ratedGoodCounter": 565,
      "ratedBadCounter": 98,
      "ratingIndex": 0.85090169730703,
      "_id": "pR992MuzPDgyCQPNv"
    },
    {
      "textContent": "Hokus pokus pika pika\nNapij się rozpuszczalnika",
      "author": "Andziaw",
      "dateAdded": {
        "$date": 1479244690554
      },
      "ratedGoodCounter": 564,
      "ratedBadCounter": 46,
      "ratingIndex": 0.9230744499757342,
      "_id": "jHKvHWcsxGS9zoBix"
    },
    {
      "textContent": "Juz nie długo na swym tronie\nZnajdziesz rymy na iPhonie",
      "author": "Programista Rymujto.pl",
      "dateAdded": {
        "$date": 1456277216624
      },
      "ratedGoodCounter": 563,
      "ratedBadCounter": 45,
      "ratingIndex": 0.9244638378718663,
      "_id": "oK9NoQrpvf6oRGHYn"
    },
    {
      "textContent": "Hokus pokus dwie pineski\nw mojej klasie same deski",
      "author": "KrychUU27",
      "dateAdded": {
        "$date": 1525114660285
      },
      "ratedGoodCounter": 563,
      "ratedBadCounter": 56,
      "ratingIndex": 0.9080621513534776,
      "_id": "c6sA2BwnoB6Y2dhJh"
    },
    {
      "textContent": "Jak cię znajdę tu pod płotem\nTo cię walnę w dupę młotem",
      "author": "Napalona Lampa",
      "dateAdded": {
        "$date": 1452518261127
      },
      "ratedGoodCounter": 560,
      "ratedBadCounter": 42,
      "ratingIndex": 0.9286873275679565,
      "_id": "8BsgyLGFTKTs5YA2L"
    },
    {
      "textContent": "Czary Mary Chleb i Toster\nGdzie są cycki Littlemonster?",
      "author": "JOMek",
      "dateAdded": {
        "$date": 1474312976097
      },
      "ratedGoodCounter": 555,
      "ratedBadCounter": 77,
      "ratingIndex": 0.8767750709210937,
      "_id": "nocLuaKmhurxMXzDv"
    },
    {
      "textContent": "Jak masz chęć, to se wkręć\nŚrubke w dupke numer 5",
      "author": "Elo elo",
      "dateAdded": {
        "$date": 1474571041991
      },
      "ratedGoodCounter": 550,
      "ratedBadCounter": 72,
      "ratingIndex": 0.882822767961487,
      "_id": "i3MKAzdjYQamvepXr"
    },
    {
      "textContent": "Ładne oczy masz, ale nie twarz\nzęby jak u konia dupa jak u słonia",
      "author": "Albert Ajnsztajn",
      "dateAdded": {
        "$date": 1453922627344
      },
      "ratedGoodCounter": 546,
      "ratedBadCounter": 49,
      "ratingIndex": 0.916104795237255,
      "_id": "zxEYiR6Pg47r9A3D7"
    },
    {
      "textContent": "Łokieć Pięta 5 demonów tam już nie ma pokemonów\nxd",
      "author": "Adrian Kubiś",
      "dateAdded": {
        "$date": 1480533779858
      },
      "ratedGoodCounter": 542,
      "ratedBadCounter": 40,
      "ratingIndex": 0.9296713574255323,
      "_id": "tujodR23D4Xpg48Wx"
    },
    {
      "textContent": "Łokieć pięta dwie pineski\nW naszej klasie same deski😂",
      "author": "Sebus",
      "dateAdded": {
        "$date": 1493185112196
      },
      "ratedGoodCounter": 537,
      "ratedBadCounter": 48,
      "ratingIndex": 0.9163795795226662,
      "_id": "ctkn6BS44Bqd5fn2Y"
    },
    {
      "textContent": "Gdy ci smutno gdy ci źle\nWeź tabletkę udław się",
      "author": "Aligator",
      "dateAdded": {
        "$date": 1462364334481
      },
      "ratedGoodCounter": 536,
      "ratedBadCounter": 45,
      "ratingIndex": 0.9209594783578194,
      "_id": "PdszoTnhiqBHnLFPf"
    },
    {
      "textContent": "kocham mame kocham tate\na najbardziej ich wypłate ;))",
      "author": "ewelinkaaa",
      "dateAdded": {
        "$date": 1475262923503
      },
      "ratedGoodCounter": 525,
      "ratedBadCounter": 91,
      "ratingIndex": 0.8508891776983767,
      "_id": "vhBY6FdmzHCdyB9fv"
    },
    {
      "textContent": "wąska ścieżka przez ogródek zapierdala krasnoludek\ndokąd idziesz moj malutki na meline szukac wódki",
      "author": 567,
      "dateAdded": {
        "$date": 1460482515711
      },
      "ratedGoodCounter": 522,
      "ratedBadCounter": 36,
      "ratingIndex": 0.9338073830716375,
      "_id": "cKiMySDmiTZ88vfeD"
    },
    {
      "textContent": "Hokus pokus czarna beczka kurwa milik\nZnów poprzeczka",
      "author": "Anonim",
      "dateAdded": {
        "$date": 1473855485995
      },
      "ratedGoodCounter": 522,
      "ratedBadCounter": 41,
      "ratingIndex": 0.9255290064476409,
      "_id": "TgCwnEuspmDgLcbmK"
    },
    {
      "textContent": "chcesz mieć cyce jak Pamela?\npij codziennie actimela",
      "author": "dworuś[*]",
      "dateAdded": {
        "$date": 1479242206049
      },
      "ratedGoodCounter": 518,
      "ratedBadCounter": 41,
      "ratingIndex": 0.9249970477603205,
      "_id": "F32iPWNf8ED2BEhjW"
    },
    {
      "textContent": "Mokry router, luźny dresik\nDawaj mała swój adresik",
      "author": "Liv",
      "dateAdded": {
        "$date": 1481237679736
      },
      "ratedGoodCounter": 515,
      "ratedBadCounter": 35,
      "ratingIndex": 0.9346611647256106,
      "_id": "byMcXkXAXTp2Ed4aX"
    },
    {
      "textContent": "Łokieć pięta Dziadek Władek\ni niejadek zjadł obiadek",
      "author": "Fitta",
      "dateAdded": {
        "$date": 1490300248674
      },
      "ratedGoodCounter": 508,
      "ratedBadCounter": 74,
      "ratingIndex": 0.8713524982759583,
      "_id": "QtGRJuYxRrrvKbY8v"
    },
    {
      "textContent": "Trzecie kółko,dół,po prawej.\nKliknij jak nie jesteś frajer.",
      "author": "franekxdxd",
      "dateAdded": {
        "$date": 1469395340447
      },
      "ratedGoodCounter": 506,
      "ratedBadCounter": 86,
      "ratingIndex": 0.8532859340159726,
      "_id": "su6xeAYPhpB8dToe4"
    },
    {
      "textContent": "Łokieć pięta 3 opony\nMam już w dupie pokemony 👌",
      "author": "xamlixv",
      "dateAdded": {
        "$date": 1473965139200
      },
      "ratedGoodCounter": 503,
      "ratedBadCounter": 77,
      "ratingIndex": 0.8657461457104576,
      "_id": "ZvL9iKxewAhCp7jY2"
    },
    {
      "textContent": "Japierdole, kurwa mać\nIle można tyle srać?",
      "author": "Misia",
      "dateAdded": {
        "$date": 1493668319055
      },
      "ratedGoodCounter": 498,
      "ratedBadCounter": 77,
      "ratingIndex": 0.8645807305617622,
      "_id": "yvqYWEakL9XuGLqfK"
    },
    {
      "textContent": "Stare auto Nowy woz\ndziś finansuje 500+",
      "author": "(NoSi3m4nk0)*^)",
      "dateAdded": {
        "$date": 1490302729445
      },
      "ratedGoodCounter": 489,
      "ratedBadCounter": 90,
      "ratingIndex": 0.8431009444978214,
      "_id": "Jbgzb5d9SYLC2jHYg"
    },
    {
      "textContent": "Weź za ręke chłopca swego idź nad rzekę utop jego\nJak utopisz krzyknij \"Hej\"  o jednego głupka mniej",
      "author": "Karika",
      "dateAdded": {
        "$date": 1475572094335
      },
      "ratedGoodCounter": 488,
      "ratedBadCounter": 65,
      "ratingIndex": 0.880863548185175,
      "_id": "GnMgaKF5S8992n6u7"
    },
    {
      "textContent": "słonko świeci trawka leci\njednorożec bije dzieci",
      "author": "Neskuś&Nekuś",
      "dateAdded": {
        "$date": 1492211511169
      },
      "ratedGoodCounter": 487,
      "ratedBadCounter": 64,
      "ratingIndex": 0.8822434745320229,
      "_id": "E4DZTGECLLzKGaWRb"
    },
    {
      "textContent": "Łokieć pięta aligator...\nNiebezpieczny Informator😀",
      "author": "Bredek😀",
      "dateAdded": {
        "$date": 1479849626151
      },
      "ratedGoodCounter": 484,
      "ratedBadCounter": 35,
      "ratingIndex": 0.9307657774201973,
      "_id": "BeGFgsRwuyTDkyC5W"
    },
    {
      "textContent": "Ta strona jest zajebista,\nWszyscy wokół tańczą twista!",
      "author": "~ZwariowanA",
      "dateAdded": {
        "$date": 1493711406348
      },
      "ratedGoodCounter": 483,
      "ratedBadCounter": 60,
      "ratingIndex": 0.887864655322546,
      "_id": "PukFyMMJv4TGZtcth"
    },
    {
      "textContent": "Na dole ser, na górze mole\nChcę mi się szczać, że ja pierdole",
      "author": "Xhjjs",
      "dateAdded": {
        "$date": 1475068553828
      },
      "ratedGoodCounter": 482,
      "ratedBadCounter": 52,
      "ratingIndex": 0.9009314274910692,
      "_id": "kzXGioq5sJJ2Mu5XQ"
    },
    {
      "textContent": "Czy to puder czy to deszcz\nJustin Bieber to jest leszcz",
      "author": "Haha",
      "dateAdded": {
        "$date": 1476426889969
      },
      "ratedGoodCounter": 482,
      "ratedBadCounter": 81,
      "ratingIndex": 0.8546072334439687,
      "_id": "CMvieDc7DDYYqSvCn"
    },
    {
      "textContent": "Łokieć, piętą, dwa banany\nJa mam numer twojej mamy.",
      "author": "Angela😘💋😘",
      "dateAdded": {
        "$date": 1485309737507
      },
      "ratedGoodCounter": 479,
      "ratedBadCounter": 33,
      "ratingIndex": 0.9337196395010676,
      "_id": "o3btma7R2yiTckfCy"
    },
    {
      "textContent": "Ja cie kocham ale nogą, ja cie lubie ale wodą\nJa cie ściskam ale drzwiami, taka miłość między nami!",
      "author": "Karika",
      "dateAdded": {
        "$date": 1475572392881
      },
      "ratedGoodCounter": 479,
      "ratedBadCounter": 65,
      "ratingIndex": 0.8788961269337734,
      "_id": "KKzuwWnKtwPb2dw4C"
    },
    {
      "textContent": "Zgiń przepadnij\nW gówno wpadnij",
      "author": "Filipek",
      "dateAdded": {
        "$date": 1462371338446
      },
      "ratedGoodCounter": 473,
      "ratedBadCounter": 44,
      "ratingIndex": 0.9131240116080351,
      "_id": "hvfGEGm9Fu6SFYDsP"
    },
    {
      "textContent": "łokieć pięta gril karkówka\ndzisiaj kurde jest klasówka",
      "author": "0lima0",
      "dateAdded": {
        "$date": 1489683692938
      },
      "ratedGoodCounter": 468,
      "ratedBadCounter": 35,
      "ratingIndex": 0.9285677711528526,
      "_id": "kSxTjGRFGZWPbPrE8"
    },
    {
      "textContent": "Łokieć pięta dwa aniołki\nTwoja stara liże kołki",
      "author": "Hajcek",
      "dateAdded": {
        "$date": 1522507619796
      },
      "ratedGoodCounter": 467,
      "ratedBadCounter": 80,
      "ratingIndex": 0.8521869397269978,
      "_id": "J8NiNafJf9Qvcj3HX"
    },
    {
      "textContent": "Hokus pokus Pika pika\nWeź go zostaw bo on sika",
      "author": "Quoda",
      "dateAdded": {
        "$date": 1485957237759
      },
      "ratedGoodCounter": 462,
      "ratedBadCounter": 34,
      "ratingIndex": 0.9295736929487103,
      "_id": "pMivDzo6ueFcJufSg"
    },
    {
      "textContent": "Gdy deszcz pada i wiatr wieje,\nSłychać Opla jak rdzewieje",
      "author": "MartynaA",
      "dateAdded": {
        "$date": 1475399748715
      },
      "ratedGoodCounter": 462,
      "ratedBadCounter": 63,
      "ratingIndex": 0.8783238221473344,
      "_id": "8E8cxdhjzda6czqEQ"
    },
    {
      "textContent": "Cztery wieże i dwie bramy\nJestem dzisiaj narąbany",
      "author": "Quesser",
      "dateAdded": {
        "$date": 1525112426854
      },
      "ratedGoodCounter": 461,
      "ratedBadCounter": 54,
      "ratingIndex": 0.8934074975888414,
      "_id": "aJEam9c4nGMCq6pSp"
    },
    {
      "textContent": "Gdy si zimno gdy ci źle\nWeź se kocyk przykryj się",
      "author": "allebazi.krk@gmail.com",
      "dateAdded": {
        "$date": 1490268388455
      },
      "ratedGoodCounter": 459,
      "ratedBadCounter": 66,
      "ratingIndex": 0.8726204275474126,
      "_id": "4NRbZbqredKm9Nyw3"
    },
    {
      "textContent": "Hokus pokus czary mary\nChomik w nocy miał koszmary",
      "author": "Zimmer",
      "dateAdded": {
        "$date": 1486747786100
      },
      "ratedGoodCounter": 454,
      "ratedBadCounter": 34,
      "ratingIndex": 0.9284214665481014,
      "_id": "eacaxN5RAYpaCXQYT"
    },
    {
      "textContent": "siema grubasie\nile masz w pasie",
      "author": "dres",
      "dateAdded": {
        "$date": 1477082111710
      },
      "ratedGoodCounter": 453,
      "ratedBadCounter": 55,
      "ratingIndex": 0.8899769058702134,
      "_id": "f7ZDTErKs5e7j2ae5"
    },
    {
      "textContent": "Takie rapy to nie rapy\nWeź się schowaj do kanapy",
      "author": "Kubiaczek",
      "dateAdded": {
        "$date": 1482438022908
      },
      "ratedGoodCounter": 450,
      "ratedBadCounter": 55,
      "ratingIndex": 0.8893245776801004,
      "_id": "24dLjiqeXBFnL9fP5"
    },
    {
      "textContent": "łokieć pieta maka paka\nzgin przepadnij dostań raka",
      "author": "jak.od KL",
      "dateAdded": {
        "$date": 1476351189773
      },
      "ratedGoodCounter": 447,
      "ratedBadCounter": 59,
      "ratingIndex": 0.8816533736400145,
      "_id": "swZddXXCTnqwLgRJs"
    },
    {
      "textContent": "Łubu Dubu, Łubu Dubu,\nNiech nam żyje prezes klubu!",
      "author": "~ZwariowanA",
      "dateAdded": {
        "$date": 1493710250160
      },
      "ratedGoodCounter": 447,
      "ratedBadCounter": 78,
      "ratingIndex": 0.8498068150217113,
      "_id": "cWRGf6qnfr5ZXxWef"
    },
    {
      "textContent": "Ładne oczy masz, komu je dasz?\nNikomu ich nie dam,  wydłubie i sprzedam",
      "author": "Taras",
      "dateAdded": {
        "$date": 1476428469347
      },
      "ratedGoodCounter": 443,
      "ratedBadCounter": 49,
      "ratingIndex": 0.8985764240345616,
      "_id": "bMdodxHfLT3eYfF7L"
    },
    {
      "textContent": "Łokieć pięta krzywe nogi,\nTak jak nasze Polskie drogi",
      "author": "Ja :*",
      "dateAdded": {
        "$date": 1485292486620
      },
      "ratedGoodCounter": 439,
      "ratedBadCounter": 35,
      "ratingIndex": 0.9242064142239632,
      "_id": "5YdSkRR4Lh2RiH8Ma"
    },
    {
      "textContent": "Tak Cię kocham, tak Cię lubię że Ci oczka dwa wydłubie\nnajpierw jedno potem drugie bo Cię kocham bo Cię lubie",
      "author": "Madzia",
      "dateAdded": {
        "$date": 1474117623014
      },
      "ratedGoodCounter": 438,
      "ratedBadCounter": 32,
      "ratingIndex": 0.9299321034035817,
      "_id": "BnNfwPdFSG4CYifqA"
    },
    {
      "textContent": "Everybody, śmierć jest wieczna,\nTwoja stara-niebezpoeczna.",
      "author": "Mi**** ****",
      "dateAdded": {
        "$date": 1490263113582
      },
      "ratedGoodCounter": 436,
      "ratedBadCounter": 80,
      "ratingIndex": 0.8433237371418927,
      "_id": "5YBiszDju9BRzQgXH"
    },
    {
      "textContent": "Każdy uczeń Ci to przyzna,\nże nauka to zgnilizna.",
      "author": "Wagarowicz",
      "dateAdded": {
        "$date": 1490118255920
      },
      "ratedGoodCounter": 434,
      "ratedBadCounter": 51,
      "ratingIndex": 0.893000339877986,
      "_id": "fhjG2tFaTpQbyJfrm"
    },
    {
      "textContent": "Na górze maliny, na dole krzaczek\nW twoim jelicie rozwija się raczek",
      "author": "SpizganyAdaś",
      "dateAdded": {
        "$date": 1476954793136
      },
      "ratedGoodCounter": 431,
      "ratedBadCounter": 58,
      "ratingIndex": 0.8795881630856425,
      "_id": "LG4DFhjZrBngxyymb"
    },
    {
      "textContent": "Gdy rymuje ktoś na temat i tu pisze swój poemat daj mu lajka\nTy mój bracie bo inaczej powiem tacie",
      "author": "Shadow",
      "dateAdded": {
        "$date": 1478719530308
      },
      "ratedGoodCounter": 428,
      "ratedBadCounter": 37,
      "ratingIndex": 0.9184507051606242,
      "_id": "dCCLYLAfNbTWWnsFE"
    },
    {
      "textContent": "Wpadła Bomba do Piwnicy,\nWszyscy leżą już w kostnicy",
      "author": "ToJaHiHiHi",
      "dateAdded": {
        "$date": 1475083670790
      },
      "ratedGoodCounter": 427,
      "ratedBadCounter": 32,
      "ratingIndex": 0.9282564747186247,
      "_id": "YeWM6PTGKZuMFrfLB"
    },
    {
      "textContent": "(życzenia) Pieniędzy w woreczku, seksu w łóżeczku\nwódki na stole i porsche w stodole",
      "author": "Tasior huehuehuehuehue",
      "dateAdded": {
        "$date": 1522328144624
      },
      "ratedGoodCounter": 427,
      "ratedBadCounter": 58,
      "ratingIndex": 0.8785970945557334,
      "_id": "MuNQSDJb88pmnM4B5"
    },
    {
      "textContent": "Kto ty jesteś, \"Judasz mały\"\nJaki znak twój \"dwa sandały",
      "author": "Kaczy",
      "dateAdded": {
        "$date": 1493155322399
      },
      "ratedGoodCounter": 425,
      "ratedBadCounter": 62,
      "ratingIndex": 0.8708979832958834,
      "_id": "LdYvkehSrocuGKSQ8"
    },
    {
      "textContent": "Kazimierz Wielki wlazł do butelki najadł się grochu\npierdział po trochu najadł się masła dupa mu trzasła",
      "author": "Wera 5b",
      "dateAdded": {
        "$date": 1477298229441
      },
      "ratedGoodCounter": 424,
      "ratedBadCounter": 46,
      "ratingIndex": 0.9002082541530942,
      "_id": "a6mpEbwFs2a3oqtys"
    },
    {
      "textContent": "Kaczor , Szydło, Andrzej Duda\nTa ekipa czyni cuda!",
      "author": "Menda,  Mazur",
      "dateAdded": {
        "$date": 1489490071818
      },
      "ratedGoodCounter": 424,
      "ratedBadCounter": 53,
      "ratingIndex": 0.8870254119133296,
      "_id": "qcYJKE2xzsM5SvQTC"
    },
    {
      "textContent": "Łokieć, pięta, trzy sznurówki\nMam na obiad cztery mrówki🐜",
      "author": "IzkQ🌸",
      "dateAdded": {
        "$date": 1475394652594
      },
      "ratedGoodCounter": 423,
      "ratedBadCounter": 72,
      "ratingIndex": 0.8528191010198763,
      "_id": "RcDXR8rWAxiZMJGkL"
    },
    {
      "textContent": "hokus pokus dwa pazdany\nstuu ma numer twojej mamy",
      "author": "popek",
      "dateAdded": {
        "$date": 1474488004057
      },
      "ratedGoodCounter": 422,
      "ratedBadCounter": 40,
      "ratingIndex": 0.9114428193601178,
      "_id": "Yk98r48SoH3G3gHZB"
    },
    {
      "textContent": "Moja ciotka z Ameryki ma samochód na guziki\nJeździ nim jak na krowie i udaje pogotowie",
      "author": "Martyna",
      "dateAdded": {
        "$date": 1475438855881
      },
      "ratedGoodCounter": 422,
      "ratedBadCounter": 59,
      "ratingIndex": 0.8755148915494231,
      "_id": "uZZ2vRfFhHojgQzxm"
    },
    {
      "textContent": "Łokieć, pięta mózg na ścianie\nTak się bawią muzumanie 😆",
      "author": "Natorex567",
      "dateAdded": {
        "$date": 1486813666096
      },
      "ratedGoodCounter": 421,
      "ratedBadCounter": 38,
      "ratingIndex": 0.9152130648678595,
      "_id": "SqDmkPaeRjwAX7N4Y"
    },
    {
      "textContent": "Czy to piątek czy sobota\nkto za Trumpem ten idiota! 👍👍👍",
      "author": "Anonim",
      "dateAdded": {
        "$date": 1482430663796
      },
      "ratedGoodCounter": 421,
      "ratedBadCounter": 49,
      "ratingIndex": 0.8938388444929217,
      "_id": "qyjs4SzxzzRACFZB7"
    },
    {
      "textContent": "Siedzę na sraczu\nŁapie Pikaczu",
      "author": "Jessie",
      "dateAdded": {
        "$date": 1469971370943
      },
      "ratedGoodCounter": 421,
      "ratedBadCounter": 71,
      "ratingIndex": 0.8539518705920746,
      "_id": "ZXPWYeSBY9D7XwYpD"
    },
    {
      "textContent": "Gdy deszcz pada i wiatr wieje,\nSłychać Opla jak rdzewieje",
      "author": "EcKo",
      "dateAdded": {
        "$date": 1473776150427
      },
      "ratedGoodCounter": 420,
      "ratedBadCounter": 37,
      "ratingIndex": 0.9170261795376927,
      "_id": "JMPQEvcsujHz7Xzsk"
    },
    {
      "textContent": "bądź wesoły energiczny\njak wibrator elektryczny 😅😄😄😄😄😉😆",
      "author": "aniołek15",
      "dateAdded": {
        "$date": 1476424910146
      },
      "ratedGoodCounter": 419,
      "ratedBadCounter": 54,
      "ratingIndex": 0.8839623118925404,
      "_id": "4jLabLTSo8H24HPCB"
    },
    {
      "textContent": "Biceps triceps oficerka\nTwoja stara je żeberka",
      "author": "Jcob01",
      "dateAdded": {
        "$date": 1522412435889
      },
      "ratedGoodCounter": 416,
      "ratedBadCounter": 73,
      "ratingIndex": 0.8489760465156603,
      "_id": "G9avH2cQB7EvGd4EM"
    },
    {
      "textContent": "sikiera motyka piłka korek nie zaglądaj mi w rozporek\nbo w rozporku mam maszynki co działają na dziewczynki",
      "author": "huj i wibrator oh oh oh",
      "dateAdded": {
        "$date": 1466492047294
      },
      "ratedGoodCounter": 414,
      "ratedBadCounter": 32,
      "ratingIndex": 0.9261698481429667,
      "_id": "QEr3gARSp3dyLjHzk"
    },
    {
      "textContent": "Łokiec pięta pół ogórka\nzobacz jaka piękna furka",
      "author": "Adaaaaam 😎😎",
      "dateAdded": {
        "$date": 1476904152089
      },
      "ratedGoodCounter": 412,
      "ratedBadCounter": 31,
      "ratingIndex": 0.9279232085404007,
      "_id": "75DrCykzpsDWH75Jk"
    },
    {
      "textContent": "Hokus pokus chleb i tost\nnie rób siary usuń post",
      "author": "Pan mandarynka 🍊 i ciastko 🍪",
      "dateAdded": {
        "$date": 1464283775987
      },
      "ratedGoodCounter": 412,
      "ratedBadCounter": 36,
      "ratingIndex": 0.9175900865324285,
      "_id": "Ngtj8mNDiEBQfrvH9"
    },
    {
      "textContent": "Świeci słońce, droga równa\nBobek toczy kulki z gówna.",
      "author": "Misia",
      "dateAdded": {
        "$date": 1493656538602
      },
      "ratedGoodCounter": 411,
      "ratedBadCounter": 50,
      "ratingIndex": 0.8896062193912294,
      "_id": "JhtGJPHaNLKDZrm7d"
    },
    {
      "textContent": "siedzi misiu na kanapie i sie tak po dupie drapie,\nco wydrapie to zjada, jaka smaczna czekolada",
      "author": "Amela... $",
      "dateAdded": {
        "$date": 1493497223081
      },
      "ratedGoodCounter": 410,
      "ratedBadCounter": 74,
      "ratingIndex": 0.845357221905152,
      "_id": "sBednhTwoceLQJ7dk"
    },
    {
      "textContent": "Nic marnować sie nie może\nZaraz w ryja ci to włoże",
      "author": "Karolina XD",
      "dateAdded": {
        "$date": 1454437713055
      },
      "ratedGoodCounter": 408,
      "ratedBadCounter": 30,
      "ratingIndex": 0.9293801233341289,
      "_id": "nMxAsS5kKWSauTEgc"
    },
    {
      "textContent": "Na górze magik na dole saszan\nPrzebiłem Ci ręke, kurwa przepraszam",
      "author": "Chujekvol2",
      "dateAdded": {
        "$date": 1474621059615
      },
      "ratedGoodCounter": 407,
      "ratedBadCounter": 31,
      "ratingIndex": 0.9271022379363475,
      "_id": "s6uyqtgvcn7zugYES"
    },
    {
      "textContent": "Raz aniołek, raz diablica\njedno ciało dwa oblicza",
      "author": "jam",
      "dateAdded": {
        "$date": 1453198751040
      },
      "ratedGoodCounter": 401,
      "ratedBadCounter": 28,
      "ratingIndex": 0.9325530820099525,
      "_id": "v9prwybYy9CenNRCd"
    },
    {
      "textContent": "Nie do rytmu nie do taktu wsadź se dupe do kontaktu,\na w kontakcie było spięcie i zrobiło dupie zdjęcie.",
      "author": "EZorek",
      "dateAdded": {
        "$date": 1478182209017
      },
      "ratedGoodCounter": 398,
      "ratedBadCounter": 38,
      "ratingIndex": 0.9107503617759171,
      "_id": "jFQDozYJqz282ynaq"
    },
    {
      "textContent": "To przysłowie nie jest głupie\nAndrzej grzebie palcem w dupie",
      "author": "PPK",
      "dateAdded": {
        "$date": 1476942262092
      },
      "ratedGoodCounter": 396,
      "ratedBadCounter": 44,
      "ratingIndex": 0.897954568516152,
      "_id": "JNQNvhLHEHPZa9qrp"
    },
    {
      "textContent": "Hej kolego, zostań gejem\nJa zostanę czarodziejem",
      "author": "Korwus",
      "dateAdded": {
        "$date": 1482432197806
      },
      "ratedGoodCounter": 396,
      "ratedBadCounter": 63,
      "ratingIndex": 0.8608654822918689,
      "_id": "xbyyoszhzGDw3gq9D"
    },
    {
      "textContent": "gdzieś daleko w Himalajach  słoń powiesił się na .... trąbie\na jajami drzewa rąbie",
      "author": "kolo",
      "dateAdded": {
        "$date": 1493502938088
      },
      "ratedGoodCounter": 395,
      "ratedBadCounter": 55,
      "ratingIndex": 0.8758271665076738,
      "_id": "LvoEybQZJb5mj9QWi"
    },
    {
      "textContent": "Palec pedała na mnie nie działa. Nie jestem pedałem\nbo z tobą nie spałem, spałeś nie spałeś pedałem zostałeś",
      "author": "MrCrreper",
      "dateAdded": {
        "$date": 1481229390958
      },
      "ratedGoodCounter": 394,
      "ratedBadCounter": 35,
      "ratingIndex": 0.9162741049690949,
      "_id": "iBapcpKnHPxQYYfYw"
    },
    {
      "textContent": "Mama, tata, ciotki, wuje\nJa po świętach zbankrutuje!!!",
      "author": "Kpaciey",
      "dateAdded": {
        "$date": 1481958489223
      },
      "ratedGoodCounter": 391,
      "ratedBadCounter": 20,
      "ratingIndex": 0.9490235115320835,
      "_id": "MTXgYGcrGsoGpaSJF"
    },
    {
      "textContent": "Hokus pokus czary mary niema\nSzkoly są wagary",
      "author": "V1per",
      "dateAdded": {
        "$date": 1472224620927
      },
      "ratedGoodCounter": 390,
      "ratedBadCounter": 45,
      "ratingIndex": 0.894490687844567,
      "_id": "2PLAhSC4ynANuWg68"
    },
    {
      "textContent": ".Każdy facet pęka z dumy,\nGdy mnie widzi w dresach z Pumy!",
      "author": "Naćpana Żelkami",
      "dateAdded": {
        "$date": 1485807474307
      },
      "ratedGoodCounter": 388,
      "ratedBadCounter": 30,
      "ratingIndex": 0.9260090321407513,
      "_id": "sqBEmtZfvNreeXpAz"
    },
    {
      "textContent": "Nie masz rymu?  Nie zamulaj\nTylko na imprezę hulaj",
      "author": "Kukajkaa",
      "dateAdded": {
        "$date": 1493707003907
      },
      "ratedGoodCounter": 387,
      "ratedBadCounter": 73,
      "ratingIndex": 0.8394754520364649,
      "_id": "JFo3aXuAMamRAMeZv"
    },
    {
      "textContent": "Morza szum ciepło piachu\nMoże skocze dzisiaj z dachu",
      "author": "~Poeta2017",
      "dateAdded": {
        "$date": 1488870604215
      },
      "ratedGoodCounter": 386,
      "ratedBadCounter": 25,
      "ratingIndex": 0.9368876703226692,
      "_id": "4TSHjBWstwnBY5T8E"
    },
    {
      "textContent": "Łokieć piętą 4 koła\nTwoja stara nie ma czoła",
      "author": "Ano nimek",
      "dateAdded": {
        "$date": 1489004994208
      },
      "ratedGoodCounter": 384,
      "ratedBadCounter": 33,
      "ratingIndex": 0.9186550230205581,
      "_id": "z9AfPn2b9zpDhHmJZ"
    },
    {
      "textContent": "Jak się wierszyk nie zrymuje\nKtoś od razu mnie hejtuje",
      "author": "Poeta z przypadku",
      "dateAdded": {
        "$date": 1487194952741
      },
      "ratedGoodCounter": 382,
      "ratedBadCounter": 34,
      "ratingIndex": 0.9160618603374328,
      "_id": "vgy5wogjhQ76kipcW"
    },
    {
      "textContent": "Łokieć, pięta i odkurzacz\nTwoja stara ma przedłużacz",
      "author": "Seba2",
      "dateAdded": {
        "$date": 1492205949158
      },
      "ratedGoodCounter": 381,
      "ratedBadCounter": 63,
      "ratingIndex": 0.8561754324472421,
      "_id": "mBxSLFAic94eY3sxz"
    },
    {
      "textContent": "Na górze róże na dole niebieski\nWiększość lasek to płaskie deski",
      "author": "Kąpa",
      "dateAdded": {
        "$date": 1485809410484
      },
      "ratedGoodCounter": 381,
      "ratedBadCounter": 64,
      "ratingIndex": 0.8542557837200156,
      "_id": "9zKYdA4gRhjiv6xPn"
    },
    {
      "textContent": "Łokieć pięta wentylator\nojciec seby to predator",
      "author": "Piotrek DAJ LIKA",
      "dateAdded": {
        "$date": 1486488705432
      },
      "ratedGoodCounter": 378,
      "ratedBadCounter": 35,
      "ratingIndex": 0.9130381264135834,
      "_id": "xZvJ9qeaKo5qhgjcB"
    },
    {
      "textContent": "Gdy Mikołaj się dobija,  otwórz szybko daj mu w ryja,\nwpuść do domu urwij jaja,  bij po zębach Mikołaja",
      "author": "gg easy",
      "dateAdded": {
        "$date": 1476865235331
      },
      "ratedGoodCounter": 378,
      "ratedBadCounter": 64,
      "ratingIndex": 0.8532687828151824,
      "_id": "TaA848cLwH9TzTQ6s"
    },
    {
      "textContent": "Gdy Ci zimno, Gdy Ci źle\nChodź tu do mnie przytul się.",
      "author": "Martynaa14",
      "dateAdded": {
        "$date": 1480167874266
      },
      "ratedGoodCounter": 377,
      "ratedBadCounter": 39,
      "ratingIndex": 0.9040715349970256,
      "_id": "gXzC7PSKqh97wMXDe"
    },
    {
      "textContent": "Łokieć, pięta, stopa kurza\nIlość śniegu jest za duża",
      "author": "Bonbonrym",
      "dateAdded": {
        "$date": 1483777841355
      },
      "ratedGoodCounter": 377,
      "ratedBadCounter": 45,
      "ratingIndex": 0.8912479623323796,
      "_id": "76jfruTaCFoo88qeY"
    },
    {
      "textContent": "Gdy ja idę na podboje,\nTo wiadomo wszystkie moje 😀😀",
      "author": "Kuba",
      "dateAdded": {
        "$date": 1479857378061
      },
      "ratedGoodCounter": 375,
      "ratedBadCounter": 28,
      "ratingIndex": 0.9282121183871822,
      "_id": "H2G3eHiKXj73FwQSA"
    },
    {
      "textContent": "Miś Uszatek to był cham miał 0,5l wypił sam właśnie sobie\nSmacznie śpi goła baba mu się śni",
      "author": "Boro",
      "dateAdded": {
        "$date": 1478657221408
      },
      "ratedGoodCounter": 375,
      "ratedBadCounter": 35,
      "ratingIndex": 0.9124033328826344,
      "_id": "wZNhPQq8sM2M26DNM"
    },
    {
      "textContent": "Hokus pokus zapach lata\npora odejś z tego świata",
      "author": "Krejzolka",
      "dateAdded": {
        "$date": 1482012157714
      },
      "ratedGoodCounter": 372,
      "ratedBadCounter": 34,
      "ratingIndex": 0.9139993718523933,
      "_id": "EmRhP9La2GCWfGxhM"
    },
    {
      "textContent": "Moja ciotka z Ameryki ma samochód na guziki\nJeździ na nim jak na krowie i udaje pogotowie!",
      "author": "Marta | Białogard",
      "dateAdded": {
        "$date": 1472628560099
      },
      "ratedGoodCounter": 371,
      "ratedBadCounter": 52,
      "ratingIndex": 0.8749951103315833,
      "_id": "LNk2edYk5qWYBekqM"
    },
    {
      "textContent": "błędy, byki, literówki\nznowu pałę mam z karkówki",
      "author": "stacha :-)",
      "dateAdded": {
        "$date": 1484409351887
      },
      "ratedGoodCounter": 370,
      "ratedBadCounter": 41,
      "ratingIndex": 0.8980529454617109,
      "_id": "rbeE7GAfMAQnnKNSr"
    },
    {
      "textContent": "Polskiego nie trawię, matmą się dławię, angielski jest nudny\na W-F - Przecudny 😍",
      "author": "Pati",
      "dateAdded": {
        "$date": 1485347462356
      },
      "ratedGoodCounter": 367,
      "ratedBadCounter": 51,
      "ratingIndex": 0.8758899765438447,
      "_id": "ahfk3pAdr9kr3ctr7"
    },
    {
      "textContent": "Mała czapka, żółty klop\nTwoja stara to jest szop",
      "author": "~Trynkiewicz",
      "dateAdded": {
        "$date": 1483228230101
      },
      "ratedGoodCounter": 367,
      "ratedBadCounter": 59,
      "ratingIndex": 0.8594800592851627,
      "_id": "Hb7duzCtHT3AnEiGg"
    },
    {
      "textContent": "Bicek, klata , bycie gwiazdą\nPo co mi to , jeżdże mazdą",
      "author": "Tysiącsłów",
      "dateAdded": {
        "$date": 1476687377173
      },
      "ratedGoodCounter": 366,
      "ratedBadCounter": 69,
      "ratingIndex": 0.839445113738274,
      "_id": "NhYG8LinKPLy7fDMn"
    },
    {
      "textContent": "Hokus pokus stare kapcie\nPokemony dzisiaj łapcie",
      "author": "Oxselo🙂",
      "dateAdded": {
        "$date": 1477948399457
      },
      "ratedGoodCounter": 365,
      "ratedBadCounter": 34,
      "ratingIndex": 0.9124942851525104,
      "_id": "93orwYruAScSwCMz6"
    },
    {
      "textContent": "Byłem motylem\nAle utyłem",
      "author": "Gdidjshsudusjs",
      "dateAdded": {
        "$date": 1473867935136
      },
      "ratedGoodCounter": 365,
      "ratedBadCounter": 62,
      "ratingIndex": 0.852799075089499,
      "_id": "KNgLb22yhXJ7gJf3b"
    },
    {
      "textContent": "Łokieć pięta kwaśne masło\nDzisiaj w nocy będzie jasno",
      "author": "Cappuccino",
      "dateAdded": {
        "$date": 1490118817047
      },
      "ratedGoodCounter": 362,
      "ratedBadCounter": 64,
      "ratingIndex": 0.8477705165480005,
      "_id": "TfNX78vgs6AAdnYoo"
    },
    {
      "textContent": "Jak się nie ma co się lubi\nTo się jara ruskie szlugi",
      "author": "huehuehue",
      "dateAdded": {
        "$date": 1489437606089
      },
      "ratedGoodCounter": 360,
      "ratedBadCounter": 43,
      "ratingIndex": 0.8910836352484732,
      "_id": "rpeSK8ZSj9z8TSKFq"
    },
    {
      "textContent": "Lubię żelki no i tosty\nA wy macie słabe posty.",
      "author": "EZorek",
      "dateAdded": {
        "$date": 1481264346455
      },
      "ratedGoodCounter": 358,
      "ratedBadCounter": 38,
      "ratingIndex": 0.9017574851166181,
      "_id": "GLgLRwy3wPvhhjfyX"
    },
    {
      "textContent": "Spod okienka leci dym\nStrasznie dobry wyszedł rym :)",
      "author": "Sevaly",
      "dateAdded": {
        "$date": 1480167018778
      },
      "ratedGoodCounter": 357,
      "ratedBadCounter": 33,
      "ratingIndex": 0.9130374857016875,
      "_id": "aDNFG5qHtRaazMxfj"
    },
    {
      "textContent": "Powiem jedno, ty łajdaku\nChyba jesteś po wojaku",
      "author": "Abulubu",
      "dateAdded": {
        "$date": 1492205132510
      },
      "ratedGoodCounter": 355,
      "ratedBadCounter": 57,
      "ratingIndex": 0.8595591159120125,
      "_id": "HzBNkhZryYQPSbvNv"
    },
    {
      "textContent": "Pod choinką leży browar noi wódka luksusowa zdrowia\nszczęścia powodzenia w dniu Bożego Narodzenia",
      "author": "naraXd:-)",
      "dateAdded": {
        "$date": 1480760618393
      },
      "ratedGoodCounter": 352,
      "ratedBadCounter": 37,
      "ratingIndex": 0.9025581496735566,
      "_id": "YEXzeXb5DbmjCEusA"
    },
    {
      "textContent": "Hokus pokus, dwie sardynki\nTeletubiś Tinki Łinki",
      "author": "Albus Dambyldor",
      "dateAdded": {
        "$date": 1478469622859
      },
      "ratedGoodCounter": 344,
      "ratedBadCounter": 38,
      "ratingIndex": 0.898166177404023,
      "_id": "py8c6CbcEzHeTKFuT"
    },
    {
      "textContent": "łokieć pięta 3 opony\nchodzę dziś napierdolony",
      "author": "VAPER 😗 💨",
      "dateAdded": {
        "$date": 1479555663138
      },
      "ratedGoodCounter": 342,
      "ratedBadCounter": 28,
      "ratingIndex": 0.9218261689327225,
      "_id": "7tcouceWZwzzHyQbL"
    },
    {
      "textContent": "Rymuj ziomie\nna poziomie",
      "author": "Żarciara",
      "dateAdded": {
        "$date": 1464282549397
      },
      "ratedGoodCounter": 341,
      "ratedBadCounter": 30,
      "ratingIndex": 0.9166600286015588,
      "_id": "TycCTJz4jkMSEsPsG"
    },
    {
      "textContent": "kto mnie kocha, o mnie myśli\nniech się dzisiaj w nocy przyśni",
      "author": "siostra-na zadupiu",
      "dateAdded": {
        "$date": 1476425740334
      },
      "ratedGoodCounter": 341,
      "ratedBadCounter": 46,
      "ratingIndex": 0.8788601382919018,
      "_id": "h4qH4fP79rCLhK6KT"
    },
    {
      "textContent": "Szedł sobie Kubuś Puchatek przez las\nnagle patrzy w gówno wlazł",
      "author": "hosting gostek",
      "dateAdded": {
        "$date": 1485396824624
      },
      "ratedGoodCounter": 340,
      "ratedBadCounter": 48,
      "ratingIndex": 0.8740301924459418,
      "_id": "uxAJyeGnLhdHY6m7R"
    },
    {
      "textContent": "Anioł w polu ostro kimał bo za dużo wypił wina\na Mikołaj też nie lepszy wóde pije wszystko pieprzy",
      "author": "naraXd:-)",
      "dateAdded": {
        "$date": 1480760519997
      },
      "ratedGoodCounter": 336,
      "ratedBadCounter": 28,
      "ratingIndex": 0.9205410063481481,
      "_id": "bB5wESYRDX4RfuRkQ"
    },
    {
      "textContent": "Łokieć pięta brudne masło\nW domu ciemno światło zgasło",
      "author": "JULCIX",
      "dateAdded": {
        "$date": 1489005096995
      },
      "ratedGoodCounter": 335,
      "ratedBadCounter": 26,
      "ratingIndex": 0.9254072765594787,
      "_id": "WPXXnNfp6n6XF6zMz"
    },
    {
      "textContent": "Magda Gessler sera tarcie\ndajcie kur*a  dobre żarcie",
      "author": "Olsonek8888",
      "dateAdded": {
        "$date": 1472392960069
      },
      "ratedGoodCounter": 335,
      "ratedBadCounter": 38,
      "ratingIndex": 0.8957155072386221,
      "_id": "XXHHsueKEKr6Q5Mbu"
    },
    {
      "textContent": "szumią wierzby na gór szczycie\nże ja kocham cię nad życie❤",
      "author": "Rain🌈",
      "dateAdded": {
        "$date": 1485809326267
      },
      "ratedGoodCounter": 333,
      "ratedBadCounter": 35,
      "ratingIndex": 0.9024323768561755,
      "_id": "yr2MHR3BTqw7GeigB"
    },
    {
      "textContent": "Ser , szyneczka i pieczarki\nTo jest pizza z zamrażarki",
      "author": "KobaZ",
      "dateAdded": {
        "$date": 1484316089772
      },
      "ratedGoodCounter": 333,
      "ratedBadCounter": 36,
      "ratingIndex": 0.899993407604056,
      "_id": "CnX62YFtQNEbarPwS"
    },
    {
      "textContent": "Hokus pokus, kamasutra\nNie wiem czy dozyjesz jutra 😂",
      "author": "😇😇😇",
      "dateAdded": {
        "$date": 1477495552698
      },
      "ratedGoodCounter": 332,
      "ratedBadCounter": 46,
      "ratingIndex": 0.8759833344322967,
      "_id": "GANswvAQ4A2xHWcNj"
    },
    {
      "textContent": "Messi pije mleko i strzela za daleko\nLewandowski pije cole i strzela same gole",
      "author": "kiniakinia4444@gmail.com",
      "dateAdded": {
        "$date": 1482004519129
      },
      "ratedGoodCounter": 331,
      "ratedBadCounter": 62,
      "ratingIndex": 0.8400961073262309,
      "_id": "hA8MLPLgQ5NjphQqB"
    },
    {
      "textContent": "Ubierz buty, ciepłe getry\nDodatkowo weź dwa swetry",
      "author": "Ciepłolubny",
      "dateAdded": {
        "$date": 1483606572772
      },
      "ratedGoodCounter": 330,
      "ratedBadCounter": 32,
      "ratingIndex": 0.9090839730127042,
      "_id": "5wgNmQG8csxTatH27"
    },
    {
      "textContent": "Na górze róże, na dole dwa wina\nNie mam dziewczyny, mam Assasina",
      "author": "Bard Adam",
      "dateAdded": {
        "$date": 1489097226147
      },
      "ratedGoodCounter": 329,
      "ratedBadCounter": 40,
      "ratingIndex": 0.8891826831243403,
      "_id": "DMDRNd7xEW27DZB5R"
    },
    {
      "textContent": "Mężu mężu nie bądź głupi\nNiech ci żona piwko kupi😃",
      "author": "papuga123",
      "dateAdded": {
        "$date": 1477286109913
      },
      "ratedGoodCounter": 329,
      "ratedBadCounter": 41,
      "ratingIndex": 0.8867860007476734,
      "_id": "NxcEKzF8iJgznrutY"
    },
    {
      "textContent": "Jak się wierszyk nie zrymuje\nKtoś odrazu mnie hejtuje",
      "author": "Żona ReTo",
      "dateAdded": {
        "$date": 1488830527392
      },
      "ratedGoodCounter": 325,
      "ratedBadCounter": 26,
      "ratingIndex": 0.9232879639757356,
      "_id": "Jbf7nz8icDFvct2aT"
    },
    {
      "textContent": "Napił się dziadek ciepłego\nwinka i gonił babcie wokół kominka",
      "author": "Klaudia",
      "dateAdded": {
        "$date": 1485958933004
      },
      "ratedGoodCounter": 325,
      "ratedBadCounter": 34,
      "ratingIndex": 0.902770782827845,
      "_id": "d7ct7qbASozXRgquD"
    },
    {
      "textContent": "I wchodzą wszyscy żałośnie ,licząc na chwilę chwały\nTylko Maciek wygląda radośnie ,bo nie dostał pały.",
      "author": "Aleksander",
      "dateAdded": {
        "$date": 1476956087584
      },
      "ratedGoodCounter": 325,
      "ratedBadCounter": 57,
      "ratingIndex": 0.8485581885122935,
      "_id": "AMYC8eCTAhapzvg9i"
    },
    {
      "textContent": "gdy ci smutno gdy ci źle\nnie zapomnij ze masz mnie",
      "author": "Zuzka2003",
      "dateAdded": {
        "$date": 1482011113080
      },
      "ratedGoodCounter": 322,
      "ratedBadCounter": 37,
      "ratingIndex": 0.8944375212521918,
      "_id": "wEQExNnkb7dRyazB2"
    },
    {
      "textContent": "Fajne rymy, pierwsza klasa Teraz zatańcz na golasa\nwszyscy rzygać w okół będą i nazywać ciebie mendą !",
      "author": "Sztorm 2002",
      "dateAdded": {
        "$date": 1463400516522
      },
      "ratedGoodCounter": 321,
      "ratedBadCounter": 29,
      "ratingIndex": 0.9145224730406959,
      "_id": "ATpHqLcw5WpvpJAyZ"
    },
    {
      "textContent": "Na górze róże na dole Krym\njak mam wymyslec jakis fajny rym",
      "author": "Ktoś",
      "dateAdded": {
        "$date": 1484002120716
      },
      "ratedGoodCounter": 319,
      "ratedBadCounter": 50,
      "ratingIndex": 0.8621558548409796,
      "_id": "SZq3Bqsyt8mP7h5JS"
    },
    {
      "textContent": "Przez las gęsty przez las\ndziki zapierdala myszkamiki",
      "author": "popek monster",
      "dateAdded": {
        "$date": 1478966944125
      },
      "ratedGoodCounter": 317,
      "ratedBadCounter": 30,
      "ratingIndex": 0.9109119943090446,
      "_id": "hvww2FJo4saqjH4Wf"
    },
    {
      "textContent": "Idzie weekend to nie lipa\nIdz do sklepu kup mi dzika",
      "author": "@#Ade'K",
      "dateAdded": {
        "$date": 1490091665483
      },
      "ratedGoodCounter": 317,
      "ratedBadCounter": 56,
      "ratingIndex": 0.8475875189922742,
      "_id": "66q5xBDxSuxbQATku"
    },
    {
      "textContent": "Przed bocianem mucha leci\nBocian zaraz ją przeleci",
      "author": "V1per",
      "dateAdded": {
        "$date": 1473332086969
      },
      "ratedGoodCounter": 317,
      "ratedBadCounter": 56,
      "ratingIndex": 0.8475874950210863,
      "_id": "oY2vwXGXBuFT2onxR"
    },
    {
      "textContent": "Skladam ci zyczenia\nspadaj do widzenia",
      "author": "PasiUUU",
      "dateAdded": {
        "$date": 1476650678369
      },
      "ratedGoodCounter": 316,
      "ratedBadCounter": 50,
      "ratingIndex": 0.8610290046949297,
      "_id": "uqt8837n26vPscrwM"
    },
    {
      "textContent": "łokieć piętą gęste błoto\ndawaj kasę ty idioto",
      "author": "aNOnimOwy",
      "dateAdded": {
        "$date": 1492923190103
      },
      "ratedGoodCounter": 315,
      "ratedBadCounter": 19,
      "ratingIndex": 0.9402900816117001,
      "_id": "mtrTuedNf5AraudcF"
    },
    {
      "textContent": "Motylem byłem ale utyłem\nSpadłem na ziemię i się zabiłem",
      "author": "Marcelina",
      "dateAdded": {
        "$date": 1477825726990
      },
      "ratedGoodCounter": 314,
      "ratedBadCounter": 24,
      "ratingIndex": 0.9262455812600887,
      "_id": "KntBxtu2gYYew3iXn"
    },
    {
      "textContent": "rymuj dużo, rymuj śmiało\nbyle serwer znów zatkało",
      "author": "pakster@onet.pl",
      "dateAdded": {
        "$date": 1488221899198
      },
      "ratedGoodCounter": 312,
      "ratedBadCounter": 29,
      "ratingIndex": 0.9122728577464494,
      "_id": "2B7iSP58jb43F4YDo"
    },
    {
      "textContent": "Rower motor kierownica\nSzybko jedzie pan Kubica",
      "author": "Nina xD",
      "dateAdded": {
        "$date": 1469293749736
      },
      "ratedGoodCounter": 312,
      "ratedBadCounter": 37,
      "ratingIndex": 0.8914212588318658,
      "_id": "Cz6yfN6F5mJAGgaMt"
    },
    {
      "textContent": "Łokieć pięta dziura w ścianie\nDzisiaj mleko na śniadanie",
      "author": "allebazi.krk@gmail.com",
      "dateAdded": {
        "$date": 1489432051110
      },
      "ratedGoodCounter": 311,
      "ratedBadCounter": 26,
      "ratingIndex": 0.9201102597722874,
      "_id": "fwCq37cpLiK8hEwjS"
    },
    {
      "textContent": "Czary mary droga kręta\nZjedz sałatkę ,bo są święta",
      "author": "Pompelania☺☺",
      "dateAdded": {
        "$date": 1493145887943
      },
      "ratedGoodCounter": 311,
      "ratedBadCounter": 48,
      "ratingIndex": 0.8638821891762621,
      "_id": "yuLCkAZqnwQ5EpAEE"
    },
    {
      "textContent": "Łokieć, pięta dodaj rym\nNa imprezie będzie dym.",
      "author": "Kierowniczeq2017",
      "dateAdded": {
        "$date": 1489700080047
      },
      "ratedGoodCounter": 310,
      "ratedBadCounter": 45,
      "ratingIndex": 0.8707796428662157,
      "_id": "aFJaz5o6HytZZBZAa"
    },
    {
      "textContent": "Świętujemy tłusty czwartek , dzieci dziś są nienażarte.\nW sklepach pączków cała tona , a cukrzyca zapewniona.",
      "author": "KobaZ",
      "dateAdded": {
        "$date": 1487849190459
      },
      "ratedGoodCounter": 308,
      "ratedBadCounter": 25,
      "ratingIndex": 0.922147373369949,
      "_id": "i3KnXbkQQL9BxuMBT"
    },
    {
      "textContent": "Hello it's mi\nOtwieraj kur** te drzwi",
      "author": "Antek",
      "dateAdded": {
        "$date": 1460285112639
      },
      "ratedGoodCounter": 308,
      "ratedBadCounter": 30,
      "ratingIndex": 0.9085466355637895,
      "_id": "PSyT48g5LGzs3pJPH"
    },
    {
      "textContent": "Ja wyrażam swoje zdanie\nA ląduje na dywanie",
      "author": "korrnii",
      "dateAdded": {
        "$date": 1480166277857
      },
      "ratedGoodCounter": 307,
      "ratedBadCounter": 31,
      "ratingIndex": 0.905596817317813,
      "_id": "Ck5HTHXWyXhupRM8w"
    },
    {
      "textContent": "Łokieć pięta mała krówka\nNiech o minie nas klasówka",
      "author": "Szkoła",
      "dateAdded": {
        "$date": 1489005790884
      },
      "ratedGoodCounter": 304,
      "ratedBadCounter": 38,
      "ratingIndex": 0.8862898237212375,
      "_id": "Cgn7puFWgDv94N4d5"
    },
    {
      "textContent": "Łokieć pieta\nI zawleczka Milik kur** znów poprzeczka",
      "author": "Y.dejw.x",
      "dateAdded": {
        "$date": 1489010118508
      },
      "ratedGoodCounter": 304,
      "ratedBadCounter": 51,
      "ratingIndex": 0.8539258160125278,
      "_id": "M6YBBomavjEisurYG"
    },
    {
      "textContent": "Dziś sobota dzień wesoły\nbo nie trzeba iść do szkoły",
      "author": "#Nikola",
      "dateAdded": {
        "$date": 1485282127756
      },
      "ratedGoodCounter": 303,
      "ratedBadCounter": 25,
      "ratingIndex": 0.9209640945374957,
      "_id": "KRTgT2HB4o8qdvMej"
    },
    {
      "textContent": "Jestem Raperem i Jeżdze rowerem\nMam Włosa na Klacie i Widaci mi gacie",
      "author": "Krzemiun11",
      "dateAdded": {
        "$date": 1462608891242
      },
      "ratedGoodCounter": 303,
      "ratedBadCounter": 29,
      "ratingIndex": 0.909901667880399,
      "_id": "aHZMe8FGfPnEasNkZ"
    },
    {
      "textContent": "Hokus pokus są wakacje\ni się nie kłóć bo mam racje",
      "author": "#WitajUżytkowniku17",
      "dateAdded": {
        "$date": 1497639642459
      },
      "ratedGoodCounter": 302,
      "ratedBadCounter": 22,
      "ratingIndex": 0.9292219338733854,
      "_id": "GtuGLmnN8A2zxDjAp"
    },
    {
      "textContent": "Bądź seksowny erotyczny\njak wibrator elektryczny",
      "author": "#kiwi$$#",
      "dateAdded": {
        "$date": 1479917963337
      },
      "ratedGoodCounter": 302,
      "ratedBadCounter": 37,
      "ratingIndex": 0.8882275796933562,
      "_id": "eYxhiLydAEYYAJw2J"
    },
    {
      "textContent": "Szybka piłka dwa jabole\nAle cycki japierdole 😇😇😇",
      "author": "ksawus",
      "dateAdded": {
        "$date": 1480153195465
      },
      "ratedGoodCounter": 301,
      "ratedBadCounter": 44,
      "ratingIndex": 0.8699349226821607,
      "_id": "6x5AKGggwsttpEeCJ"
    },
    {
      "textContent": "chleb,ogórki,trochęmleka...\nhitler już za płotem czeka",
      "author": "luki kuki",
      "dateAdded": {
        "$date": 1452200630431
      },
      "ratedGoodCounter": 297,
      "ratedBadCounter": 27,
      "ratingIndex": 0.9138374504594683,
      "_id": "rtnBiS3eoiLsEahaD"
    },
    {
      "textContent": "Moja babcia jest kucharką, robi ciasto betoniarką,\nA mój dziadek jest górnikiem, kopie dziury pod śmietnikiem",
      "author": "Julia",
      "dateAdded": {
        "$date": 1477940976900
      },
      "ratedGoodCounter": 291,
      "ratedBadCounter": 30,
      "ratingIndex": 0.9037179483633305,
      "_id": "fkMbs8dE8Kx9JQpma"
    },
    {
      "textContent": "Od aniołka mam skrzydełka a charakter mam diabełka\nraz aniołek raz diablice jedno serce-dwa oblicza",
      "author": "siostra-na zadupiu",
      "dateAdded": {
        "$date": 1476425559964
      },
      "ratedGoodCounter": 291,
      "ratedBadCounter": 53,
      "ratingIndex": 0.8434711573227462,
      "_id": "Z4zcvm8fkSfPFd7n5"
    },
    {
      "textContent": "Ja wyrażam swoje zdanie\nco jest dzisiaj na śniadanie",
      "author": "funny",
      "dateAdded": {
        "$date": 1482015158851
      },
      "ratedGoodCounter": 290,
      "ratedBadCounter": 35,
      "ratingIndex": 0.8895621334918268,
      "_id": "yAKbro9tK2k7PqMbe"
    },
    {
      "textContent": "Hokus pokus pies i dres,\nmoje życie jest THE BEST😂😁",
      "author": "HerneS😡",
      "dateAdded": {
        "$date": 1483169470829
      },
      "ratedGoodCounter": 289,
      "ratedBadCounter": 18,
      "ratingIndex": 0.9383017390429224,
      "_id": "E2WnRZ8Z8JvDSBaq2"
    },
    {
      "textContent": "Łokieć pięta 3 opony\nMam już w dupie pokemony",
      "author": "💎Klaudia💎",
      "dateAdded": {
        "$date": 1475394204432
      },
      "ratedGoodCounter": 289,
      "ratedBadCounter": 30,
      "ratingIndex": 0.9031161496620435,
      "_id": "yAdRvCe888AeK2BgR"
    },
    {
      "textContent": "hitler na dachu\npierdzi ze strachu",
      "author": "seba",
      "dateAdded": {
        "$date": 1454014341396
      },
      "ratedGoodCounter": 289,
      "ratedBadCounter": 30,
      "ratingIndex": 0.9031161480052929,
      "_id": "HBwNPhESMbtewByCC"
    },
    {
      "textContent": "A ja dzisiaj nie rymuje bo sylwester odczekuje\nXddd",
      "author": "AnonimusPlTV",
      "dateAdded": {
        "$date": 1483266053830
      },
      "ratedGoodCounter": 289,
      "ratedBadCounter": 45,
      "ratingIndex": 0.8626788544229566,
      "_id": "aaeno5pgyZaWKq387"
    },
    {
      "textContent": "Łokieć pięta littlemooonster\nJest Sylwester umyj toster",
      "author": "Konik\" 🐴",
      "dateAdded": {
        "$date": 1483215817100
      },
      "ratedGoodCounter": 289,
      "ratedBadCounter": 45,
      "ratingIndex": 0.8626788395185928,
      "_id": "45mT8GmZf4hiAbqjM"
    },
    {
      "textContent": "Łokieć piętą dodaj rym\njak nie dodasz będzie dym",
      "author": "Budynioo",
      "dateAdded": {
        "$date": 1490076973010
      },
      "ratedGoodCounter": 289,
      "ratedBadCounter": 54,
      "ratingIndex": 0.8401091461042269,
      "_id": "9LZSuQxopm8bog544"
    },
    {
      "textContent": "Rymuj z nami, rymuj śmiało!\nRymów dzisiaj jest za mało!",
      "author": "WOJTI",
      "dateAdded": {
        "$date": 1488056426706
      },
      "ratedGoodCounter": 288,
      "ratedBadCounter": 23,
      "ratingIndex": 0.9230674028925618,
      "_id": "q6fxaYnvC2PDJj7r7"
    },
    {
      "textContent": "siekiera motyka ide spac\nZAMKNĄĆ MORDE KURWA MAĆ !!",
      "author": "takatamja",
      "dateAdded": {
        "$date": 1467915187973
      },
      "ratedGoodCounter": 288,
      "ratedBadCounter": 23,
      "ratingIndex": 0.9230673965851705,
      "_id": "mEJkuAsgZsXq4wm9Z"
    },
    {
      "textContent": "Gdyby kózka nie skakała\nTo by w majtki nie nasrała",
      "author": "Snajper",
      "dateAdded": {
        "$date": 1479856800832
      },
      "ratedGoodCounter": 285,
      "ratedBadCounter": 34,
      "ratingIndex": 0.8906162594837255,
      "_id": "gFzqyoGF7CggrJ4jd"
    },
    {
      "textContent": "Łokieć, Pięta, Duża Bułka...\nDziś ugryzła cie kókółka😎🔫",
      "author": "BOOM!",
      "dateAdded": {
        "$date": 1482417677347
      },
      "ratedGoodCounter": 285,
      "ratedBadCounter": 44,
      "ratingIndex": 0.8636284190080037,
      "_id": "ZJi54xXk6YgHgC7PY"
    },
    {
      "textContent": "Przez las ciemny przez las dziki\nIdzie sobie Myszka Miki 😜",
      "author": "😁😃😄to ja Emilka Płaczek",
      "dateAdded": {
        "$date": 1489302196994
      },
      "ratedGoodCounter": 285,
      "ratedBadCounter": 44,
      "ratingIndex": 0.8636283880117809,
      "_id": "9vow9BFoq6PRBnGFX"
    },
    {
      "textContent": "Chować kieszenie\nBo rudy w terenie",
      "author": "RudyxOrbi",
      "dateAdded": {
        "$date": 1479213135197
      },
      "ratedGoodCounter": 284,
      "ratedBadCounter": 36,
      "ratingIndex": 0.8847265858043181,
      "_id": "73rR83zqoCnpZZD9d"
    },
    {
      "textContent": "Nie wiem co się że mną dzieje\nchcę płakać a się smieje",
      "author": "badlife",
      "dateAdded": {
        "$date": 1479929152910
      },
      "ratedGoodCounter": 284,
      "ratedBadCounter": 40,
      "ratingIndex": 0.8738378590761231,
      "_id": "v3gzztaQMzJ6AYWT8"
    },
    {
      "textContent": "jak sie bawic to sie bawic\nbrwi wyjebac kreski wstawic",
      "author": "nieznasz",
      "dateAdded": {
        "$date": 1476348567580
      },
      "ratedGoodCounter": 284,
      "ratedBadCounter": 53,
      "ratingIndex": 0.8402292920019147,
      "_id": "tChjrYeurQh3MCkdP"
    },
    {
      "textContent": "Cztero oki piąta szyja\nokularnik dostał w ryja",
      "author": "TwojaStaraa",
      "dateAdded": {
        "$date": 1486488198804
      },
      "ratedGoodCounter": 283,
      "ratedBadCounter": 29,
      "ratingIndex": 0.904144075156111,
      "_id": "DCZ4tdmWP7Ng4Ji6y"
    },
    {
      "textContent": "Hokus pokus ence pence\ntwoje cycki mają ręce",
      "author": "Ahujcietoobchodzi",
      "dateAdded": {
        "$date": 1472626030557
      },
      "ratedGoodCounter": 283,
      "ratedBadCounter": 47,
      "ratingIndex": 0.8549770733896183,
      "_id": "XGY3q6ba3v3iQkAMJ"
    },
    {
      "textContent": "Pada deszcz śpiewają ptaki\nTwoja stara je kurczaki",
      "author": "Gwiazduś 😂👌",
      "dateAdded": {
        "$date": 1486746408564
      },
      "ratedGoodCounter": 283,
      "ratedBadCounter": 53,
      "ratingIndex": 0.8397551795965232,
      "_id": "nksjTYaASLjZE4jyZ"
    },
    {
      "textContent": "Łokieć pięta i zawleczka\nBędzie bramka lub poprzeczka",
      "author": "PL footBall",
      "dateAdded": {
        "$date": 1488830414644
      },
      "ratedGoodCounter": 280,
      "ratedBadCounter": 22,
      "ratingIndex": 0.9240822856598288,
      "_id": "rYycy5Q367spnofgk"
    },
    {
      "textContent": "mam te moc mam te moc\nmoge siedzieć w kiblu całą noc",
      "author": "JaCkLiVe",
      "dateAdded": {
        "$date": 1485322193049
      },
      "ratedGoodCounter": 279,
      "ratedBadCounter": 27,
      "ratingIndex": 0.9087850984829888,
      "_id": "4o8xEe8r3KjjH2hYg"
    },
    {
      "textContent": "Nie Do Rymu Nie Do Taktu\nWsadz Se Dupe Do Kontaktu",
      "author": "Lasia",
      "dateAdded": {
        "$date": 1485329242076
      },
      "ratedGoodCounter": 279,
      "ratedBadCounter": 36,
      "ratingIndex": 0.8829025236115354,
      "_id": "QSXPwfuCC6Qn2qYAj"
    },
    {
      "textContent": "Mi już w głowie grillowanie\nA tu ciągle odśnieżanie",
      "author": "kushina",
      "dateAdded": {
        "$date": 1487753866828
      },
      "ratedGoodCounter": 278,
      "ratedBadCounter": 20,
      "ratingIndex": 0.9297554359727748,
      "_id": "3YBLEAdouyKuTeZvs"
    },
    {
      "textContent": "słońce, lato i wakacje\nkoniec szkoły. Czy mam racje?",
      "author": "ziomeczek87",
      "dateAdded": {
        "$date": 1466934352355
      },
      "ratedGoodCounter": 277,
      "ratedBadCounter": 30,
      "ratingIndex": 0.8993411347804899,
      "_id": "529RSLvzSsCB6tBTk"
    },
    {
      "textContent": "Łokieć pięta chleb z pasztetem, czy zostaniesz mym facetem?\nŁokieć pięta nyga nyga, oj kobieto nie ta liga.",
      "author": "Isabel 👑💎",
      "dateAdded": {
        "$date": 1485209991909
      },
      "ratedGoodCounter": 275,
      "ratedBadCounter": 25,
      "ratingIndex": 0.9136111123375235,
      "_id": "cLjejsosLhmi3RmeZ"
    },
    {
      "textContent": "mam 3 latka, 3 i pół\njak się wkurwię, jebnę w stół",
      "author": "kochanie:*",
      "dateAdded": {
        "$date": 1462375321016
      },
      "ratedGoodCounter": 275,
      "ratedBadCounter": 26,
      "ratingIndex": 0.9105859801796765,
      "_id": "ojjGJEZ4dsZqJfcLM"
    },
    {
      "textContent": "Śnieżek pada sobie równo\nRaz na kwiatek , raz na gówno",
      "author": "Poeta2017",
      "dateAdded": {
        "$date": 1488870921707
      },
      "ratedGoodCounter": 275,
      "ratedBadCounter": 31,
      "ratingIndex": 0.8957559206831026,
      "_id": "Z56envhMkg7ST7Ado"
    },
    {
      "textContent": "Moje rymy wymiatają Twoje jednak wygasają\nChcesz mnie diś zaatakować Najpierw naucz się blokować",
      "author": "naraXd:-)",
      "dateAdded": {
        "$date": 1479160443949
      },
      "ratedGoodCounter": 275,
      "ratedBadCounter": 41,
      "ratingIndex": 0.8674992332871448,
      "_id": "RwRFFnDjNQKLA8K5P"
    },
    {
      "textContent": "Bo tylko w truskawkowym dżemie,\nsiła wielka drzemie.",
      "author": "koxugraPL",
      "dateAdded": {
        "$date": 1486489297970
      },
      "ratedGoodCounter": 274,
      "ratedBadCounter": 53,
      "ratingIndex": 0.8353580632836201,
      "_id": "dcg9rQXYgvaAeNsMg"
    },
    {
      "textContent": "Nie ma miejsca tu na smutki\nLej mi piwa albo wódki",
      "author": "Jasiox2",
      "dateAdded": {
        "$date": 1486286484080
      },
      "ratedGoodCounter": 273,
      "ratedBadCounter": 25,
      "ratingIndex": 0.9130332031070061,
      "_id": "qFnJo5LnhCeAHGdXe"
    },
    {
      "textContent": "Deszczyk leje, wali w dach.\nPopek dostał, idzie w piach.",
      "author": "Praktis💎",
      "dateAdded": {
        "$date": 1481464371285
      },
      "ratedGoodCounter": 272,
      "ratedBadCounter": 40,
      "ratingIndex": 0.8690006811449588,
      "_id": "Q7CGL9P97MRYZ5EYF"
    },
    {
      "textContent": "W gimnazjum zawsze kibel obszczany\nCo za głupie patafiany 😂👌",
      "author": "Dominik Z.",
      "dateAdded": {
        "$date": 1479928658600
      },
      "ratedGoodCounter": 272,
      "ratedBadCounter": 44,
      "ratingIndex": 0.858035592531202,
      "_id": "AvMY65am2cXfSTfZB"
    },
    {
      "textContent": "Ja nie mogę, ale mąka!\nDziś na obiad jest limonka",
      "author": "Anon",
      "dateAdded": {
        "$date": 1481013563867
      },
      "ratedGoodCounter": 270,
      "ratedBadCounter": 43,
      "ratingIndex": 0.8598638769248741,
      "_id": "88FXoDaTgrGYXj2FW"
    },
    {
      "textContent": "Pada śnieg pada śnieg sypie granatami\nA Mikołaj z kolegami leży pod saniami",
      "author": "Ukasz",
      "dateAdded": {
        "$date": 1482013837229
      },
      "ratedGoodCounter": 270,
      "ratedBadCounter": 47,
      "ratingIndex": 0.8490481917004823,
      "_id": "rGz5pwd2wiX2yfeju"
    },
    {
      "textContent": "Na górze róże, na dole placki\nNajwiększym gejem jest Juliusz Słowacki",
      "author": "Mickiewicz",
      "dateAdded": {
        "$date": 1482364149620
      },
      "ratedGoodCounter": 269,
      "ratedBadCounter": 52,
      "ratingIndex": 0.8353956464465409,
      "_id": "ms8gJhB4L95bTtJvA"
    },
    {
      "textContent": "Śmierdzi ci z pyska\nJak z wysypiska",
      "author": "Mopsikowa Zuza 69",
      "dateAdded": {
        "$date": 1460899188577
      },
      "ratedGoodCounter": 267,
      "ratedBadCounter": 30,
      "ratingIndex": 0.895963013669405,
      "_id": "C3CLyjha3tKJpM25G"
    },
    {
      "textContent": "Popcorn, cola no i film\nDziś w Sylwestra siedzę z kim?",
      "author": "Kamil😂",
      "dateAdded": {
        "$date": 1483222766545
      },
      "ratedGoodCounter": 267,
      "ratedBadCounter": 47,
      "ratingIndex": 0.8476104807606227,
      "_id": "zoFuaKhm8cTH5K8Se"
    },
    {
      "textContent": "Wpadła gruszka do fartuszka a za gruszką dwa jabłuszka,\na śliweczka wpaść nie chciała, bo śliweczka niedojrzała!",
      "author": "Nikolaa 👑",
      "dateAdded": {
        "$date": 1486667050395
      },
      "ratedGoodCounter": 265,
      "ratedBadCounter": 52,
      "ratingIndex": 0.8333250572252415,
      "_id": "Eqbft7TGcQWPd9GGf"
    },
    {
      "textContent": "Rymuj ziomie\nna poziomie",
      "author": "dawidekjestspoko",
      "dateAdded": {
        "$date": 1488049070755
      },
      "ratedGoodCounter": 264,
      "ratedBadCounter": 25,
      "ratingIndex": 0.9103339327237198,
      "_id": "mLvpTHMtp82Y8Zxqi"
    },
    {
      "textContent": "Bądź wesoły energiczny jak wibrator elektryczny .\n😄😄😄😃😃😃😃😃",
      "author": "Gimbusy.",
      "dateAdded": {
        "$date": 1475518879305
      },
      "ratedGoodCounter": 263,
      "ratedBadCounter": 23,
      "ratingIndex": 0.9163651099225799,
      "_id": "ezjxHYutNsG5RpS2x"
    },
    {
      "textContent": "Wez mi z oczu krzywe ręce\nBo ci zaraz obie skręce",
      "author": "kondzitsu",
      "dateAdded": {
        "$date": 1478547680374
      },
      "ratedGoodCounter": 262,
      "ratedBadCounter": 17,
      "ratingIndex": 0.9357022755022387,
      "_id": "pnPMgLh2RQXLwRRcu"
    },
    {
      "textContent": "Rewelacja u dilera towar\nTani jak cholera",
      "author": "Palę Zioło",
      "dateAdded": {
        "$date": 1488919126244
      },
      "ratedGoodCounter": 261,
      "ratedBadCounter": 30,
      "ratingIndex": 0.8938250615058277,
      "_id": "Zcz2fojHYA2GDk8vP"
    },
    {
      "textContent": "Kiedy cena jest za mała\nMichałowi staje pała",
      "author": "Jam jest autor 😂",
      "dateAdded": {
        "$date": 1478209659115
      },
      "ratedGoodCounter": 260,
      "ratedBadCounter": 49,
      "ratingIndex": 0.8387009241092162,
      "_id": "4yZH5vZHYyYRZg6pK"
    },
    {
      "textContent": "Na górze róze na dole akacje\nCzas na ekspienie bo są wakacje 😇😎😂",
      "author": "Psycho mem",
      "dateAdded": {
        "$date": 1489433259599
      },
      "ratedGoodCounter": 259,
      "ratedBadCounter": 49,
      "ratingIndex": 0.8381789088141269,
      "_id": "5mmzR5GeNkgjQF9Zz"
    },
    {
      "textContent": "Łokieć, pięta i dwa noże\nnic mi już nie pomoże",
      "author": "majaveronica",
      "dateAdded": {
        "$date": 1485807779222
      },
      "ratedGoodCounter": 258,
      "ratedBadCounter": 36,
      "ratingIndex": 0.8745661732947378,
      "_id": "fZ6PkYNg2RThxSFaH"
    },
    {
      "textContent": "Komputer jest bogiem telewizor nałogiem\nSzkoła to szmata a twoja stara wymiata",
      "author": "Twoja sy",
      "dateAdded": {
        "$date": 1452868787365
      },
      "ratedGoodCounter": 257,
      "ratedBadCounter": 26,
      "ratingIndex": 0.9049183042772749,
      "_id": "aChXjdyKLaFhe7vSt"
    },
    {
      "textContent": "Hokus Pokus dwie maliny\nGdzie są cycki Karoliny ? :-)",
      "author": "Raper",
      "dateAdded": {
        "$date": 1478427624462
      },
      "ratedGoodCounter": 257,
      "ratedBadCounter": 36,
      "ratingIndex": 0.8741395080265374,
      "_id": "Ecqanh2PnNvEogors"
    },
    {
      "textContent": "Mężu mężu mężu drogi\nwypierdalaj po hot - dogi",
      "author": "Alicja123",
      "dateAdded": {
        "$date": 1482011110896
      },
      "ratedGoodCounter": 256,
      "ratedBadCounter": 34,
      "ratingIndex": 0.8797146288687999,
      "_id": "C9dC5Du3Bngr2cuuv"
    },
    {
      "textContent": "Ram pam pam\nPopek leży tam",
      "author": "Yolo :D",
      "dateAdded": {
        "$date": 1480888432008
      },
      "ratedGoodCounter": 254,
      "ratedBadCounter": 36,
      "ratingIndex": 0.8728418706418095,
      "_id": "qafr4ffwh9kgvtwqr"
    },
    {
      "textContent": "Łokieć pięta trzy koparki\nRudy wsadza łeb do pralki",
      "author": "SopelekYT",
      "dateAdded": {
        "$date": 1557485036790
      },
      "ratedGoodCounter": 253,
      "ratedBadCounter": 7,
      "ratingIndex": 0.9693343280560115,
      "_id": "JhDfNCtvpedkab6W4"
    },
    {
      "textContent": "Każdy ziom zbiera złom sprzedaj taczke sprzedaj dom\nPrzetop kable przetop druty żeby mieć na nowe buty",
      "author": "Gitara Siem",
      "dateAdded": {
        "$date": 1468699518228
      },
      "ratedGoodCounter": 253,
      "ratedBadCounter": 30,
      "ratingIndex": 0.8908339550261213,
      "_id": "ZmR5eu9Wn3fxxQ7Hi"
    },
    {
      "textContent": "Japrdl , kurwa mać\nty debilu idź już spać",
      "author": "Asiuta 💞😻💩",
      "dateAdded": {
        "$date": 1485292983623
      },
      "ratedGoodCounter": 249,
      "ratedBadCounter": 26,
      "ratingIndex": 0.9021619930312619,
      "_id": "YdQ7GWxBt7pK7Qum6"
    },
    {
      "textContent": "opowiem ci bajkę jak kot palił fajke\nfajka się spaliła i bajka się skończyła",
      "author": "xx dark fire",
      "dateAdded": {
        "$date": 1463602101390
      },
      "ratedGoodCounter": 248,
      "ratedBadCounter": 24,
      "ratingIndex": 0.9084126502595132,
      "_id": "fyii6EPpnNwtG8PKk"
    },
    {
      "textContent": "Opadły liście\nAle zajebiście!",
      "author": "Marsyy17",
      "dateAdded": {
        "$date": 1469293396449
      },
      "ratedGoodCounter": 248,
      "ratedBadCounter": 34,
      "ratingIndex": 0.8763141102427556,
      "_id": "nxYhmJcWcAetQvGKj"
    },
    {
      "textContent": "Czary mary chleb i tost\nnie rob siary usun post",
      "author": "Jessica Skillet",
      "dateAdded": {
        "$date": 1479847602414
      },
      "ratedGoodCounter": 247,
      "ratedBadCounter": 33,
      "ratingIndex": 0.8789923689632873,
      "_id": "Yy76Xp7nqT4E7yb47"
    },
    {
      "textContent": "clinton donald no i bomba\nzara bendzie 3 wojna",
      "author": "Frano pl",
      "dateAdded": {
        "$date": 1478717438161
      },
      "ratedGoodCounter": 245,
      "ratedBadCounter": 39,
      "ratingIndex": 0.8596385030523054,
      "_id": "syFSMfz8RqHDoR9Zi"
    },
    {
      "textContent": "Mówił mi to stary baca\nJak wypijesz to masz kaca",
      "author": "kushina",
      "dateAdded": {
        "$date": 1487885867164
      },
      "ratedGoodCounter": 243,
      "ratedBadCounter": 20,
      "ratingIndex": 0.920441257441634,
      "_id": "FoWQbZ85HKvXKq6LS"
    },
    {
      "textContent": "Kochaj i szalej, nie pytaj co dalej\nBaw sie i grzesz, miloscia sie ciesz",
      "author": "CocaCola1938",
      "dateAdded": {
        "$date": 1488053667494
      },
      "ratedGoodCounter": 243,
      "ratedBadCounter": 26,
      "ratingIndex": 0.8999875693111052,
      "_id": "m2aY6u9akxT7hxQKD"
    },
    {
      "textContent": "nie jest dobrze nie jest źle\nale trochę nudzisz mnie",
      "author": "lol",
      "dateAdded": {
        "$date": 1482003064854
      },
      "ratedGoodCounter": 243,
      "ratedBadCounter": 28,
      "ratingIndex": 0.8933702248031167,
      "_id": "yuva3GwxphwS6ZSde"
    },
    {
      "textContent": "Łokieć pięta chleb z pasztetem\nCzy zostaniesz mym facetem😊",
      "author": "PusiaPL",
      "dateAdded": {
        "$date": 1481965917005
      },
      "ratedGoodCounter": 242,
      "ratedBadCounter": 25,
      "ratingIndex": 0.9029724293714178,
      "_id": "zbjXRLJYCPDx5CebX"
    },
    {
      "textContent": "Jak to mówił Święty Łukasz\nCh**a ręką nie oszukasz",
      "author": "Misiek🐻",
      "dateAdded": {
        "$date": 1485791237624
      },
      "ratedGoodCounter": 242,
      "ratedBadCounter": 27,
      "ratingIndex": 0.8962839163013347,
      "_id": "ZNMLHusEdfGzANR8k"
    },
    {
      "textContent": "Kto trzech pasków nie nosi\nTen o wpierdol sie prosi",
      "author": "Krycha z liniewa",
      "dateAdded": {
        "$date": 1488836597320
      },
      "ratedGoodCounter": 241,
      "ratedBadCounter": 30,
      "ratingIndex": 0.886017384364743,
      "_id": "EQgbBXmZBbc6R4mzL"
    },
    {
      "textContent": "baczność! spocznij!\npierdnij i odpocznij!",
      "author": "gówno543",
      "dateAdded": {
        "$date": 1468619207521
      },
      "ratedGoodCounter": 241,
      "ratedBadCounter": 34,
      "ratingIndex": 0.8731768918716108,
      "_id": "RxEyXdSifXmhemuGp"
    },
    {
      "textContent": "Łokieć pięta, brudny toster\nGdzie są cycki Littlemonster",
      "author": "Księżniczka",
      "dateAdded": {
        "$date": 1487191310110
      },
      "ratedGoodCounter": 241,
      "ratedBadCounter": 40,
      "ratingIndex": 0.8545991317092675,
      "_id": "DCQGigW9e48qiQnRy"
    },
    {
      "textContent": "W lesie leży szyszka\nUprzejmego pana Zbyszka",
      "author": "Marsyy17",
      "dateAdded": {
        "$date": 1469293899964
      },
      "ratedGoodCounter": 241,
      "ratedBadCounter": 42,
      "ratingIndex": 0.8485809972591399,
      "_id": "CzfKA9XEpSmi5rEmE"
    },
    {
      "textContent": "Na górze róże, na dole mlecz...\nnie mam dziewczyny, mam GTA pięć!",
      "author": "#ciasteczkowa_12",
      "dateAdded": {
        "$date": 1450800875846
      },
      "ratedGoodCounter": 240,
      "ratedBadCounter": 29,
      "ratingIndex": 0.8888766398957801,
      "_id": "5XnN6Jx2pPM3HRZQp"
    },
    {
      "textContent": "Na górze róże, na dole banan,\nKto go prostuje? Mickiewicz Adam.",
      "author": "Juliusz Słowacki",
      "dateAdded": {
        "$date": 1478450144493
      },
      "ratedGoodCounter": 240,
      "ratedBadCounter": 38,
      "ratingIndex": 0.8602039349923077,
      "_id": "wLajR9aFqEGawv4dt"
    },
    {
      "textContent": "łokieć pięta w worku\nmłyn czy zostaniesz skarbem mym",
      "author": "pati",
      "dateAdded": {
        "$date": 1488014892008
      },
      "ratedGoodCounter": 240,
      "ratedBadCounter": 46,
      "ratingIndex": 0.836226763882141,
      "_id": "o8gFQofuQkcfp6o3A"
    },
    {
      "textContent": "Mój ziomku, przyjacielu\nTakich jak ty jest tu niewielu",
      "author": "EmEm4",
      "dateAdded": {
        "$date": 1477950857029
      },
      "ratedGoodCounter": 240,
      "ratedBadCounter": 47,
      "ratingIndex": 0.8333232228601825,
      "_id": "Q829qNJzHvvA4ZgAE"
    },
    {
      "textContent": "Że co?! Że nauka?!\nNie dziękuje,mam facebooka",
      "author": "mati_zet",
      "dateAdded": {
        "$date": 1477084148528
      },
      "ratedGoodCounter": 239,
      "ratedBadCounter": 19,
      "ratingIndex": 0.9227660618865191,
      "_id": "f4K9NH9FrzJzeeuub"
    },
    {
      "textContent": "Mam te moc , mam te moc\nZjem to wszystko w jedną noc 🍗🍖🍔🍗🍞🍕🍟🌮🌯🌭🍿",
      "author": "Szymekkoxd 😎",
      "dateAdded": {
        "$date": 1481969206785
      },
      "ratedGoodCounter": 238,
      "ratedBadCounter": 30,
      "ratingIndex": 0.884746047113162,
      "_id": "cT76bRkeBNYnndbew"
    },
    {
      "textContent": "Dźwięki harfy wiatru szum\nWodo wodo zmień się w rum",
      "author": "BIB 26",
      "dateAdded": {
        "$date": 1486671906239
      },
      "ratedGoodCounter": 238,
      "ratedBadCounter": 42,
      "ratingIndex": 0.8469643126926658,
      "_id": "LsgwtukXo8vTFwebZ"
    },
    {
      "textContent": "happy birthday to you\nty jebany chuju",
      "author": "Dragomine",
      "dateAdded": {
        "$date": 1451512764539
      },
      "ratedGoodCounter": 237,
      "ratedBadCounter": 27,
      "ratingIndex": 0.8943268096347854,
      "_id": "RJR76riu7KS6uA9Sg"
    },
    {
      "textContent": "Łokieć , Pięta i odkurzacz\nW moich majtkach mam przedłużacz",
      "author": "Szybek",
      "dateAdded": {
        "$date": 1486484666982
      },
      "ratedGoodCounter": 235,
      "ratedBadCounter": 27,
      "ratingIndex": 0.8935231422353841,
      "_id": "awrc7WYt7G7SXvejX"
    },
    {
      "textContent": "cczwartek, piątek i sobota\na za dwa dni znów robota",
      "author": "ami t. to ja",
      "dateAdded": {
        "$date": 1488217169572
      },
      "ratedGoodCounter": 235,
      "ratedBadCounter": 29,
      "ratingIndex": 0.8867797292141102,
      "_id": "4s4NjR3AEQK5K8tGJ"
    },
    {
      "textContent": "Książka, zeszyt, praca domowa,\nta szkoła sprawia, że jestem nerwowa.",
      "author": "magbla",
      "dateAdded": {
        "$date": 1487203042114
      },
      "ratedGoodCounter": 232,
      "ratedBadCounter": 32,
      "ratingIndex": 0.8754591703261508,
      "_id": "XxuPvzeJ7bZz9kJcW"
    },
    {
      "textContent": "Jestem słodka jak cukierek,\ntylko owiń mnie w papierek",
      "author": "Radox",
      "dateAdded": {
        "$date": 1480880868231
      },
      "ratedGoodCounter": 232,
      "ratedBadCounter": 44,
      "ratingIndex": 0.8375341458697332,
      "_id": "KFP8hgb6d2mJKnkqY"
    },
    {
      "textContent": "Łokieć pięta dzbanek mleka\nTwoja stara je kotleta",
      "author": "PysiaGabi05",
      "dateAdded": {
        "$date": 1485328101161
      },
      "ratedGoodCounter": 230,
      "ratedBadCounter": 42,
      "ratingIndex": 0.8424795081587623,
      "_id": "SKupErAwctSRzgwDM"
    },
    {
      "textContent": "zamknijbuzie\nty arbuzie",
      "author": "honda",
      "dateAdded": {
        "$date": 1468657722102
      },
      "ratedGoodCounter": 229,
      "ratedBadCounter": 28,
      "ratingIndex": 0.887583500432971,
      "_id": "L9EgvTykBEWANqHXh"
    },
    {
      "textContent": "Łokieć pięta 4 twarze\nO typowym dresie marzę",
      "author": "Lola",
      "dateAdded": {
        "$date": 1480092576775
      },
      "ratedGoodCounter": 226,
      "ratedBadCounter": 19,
      "ratingIndex": 0.9186839012230191,
      "_id": "ZbYDojiqxsHiyqsiZ"
    },
    {
      "textContent": "Ide na plaże\nDupe pokaże",
      "author": "Ddxdddd",
      "dateAdded": {
        "$date": 1479196669327
      },
      "ratedGoodCounter": 222,
      "ratedBadCounter": 43,
      "ratingIndex": 0.8345746238050556,
      "_id": "4PXcJyCsZqDq9esdg"
    },
    {
      "textContent": "Lubię placki z owocami\nPostarajcie się z rymami!",
      "author": "Sienkiewicz",
      "dateAdded": {
        "$date": 1488749468332
      },
      "ratedGoodCounter": 221,
      "ratedBadCounter": 30,
      "ratingIndex": 0.8769702345087784,
      "_id": "A6EaAHJ6MpMFcpSpS"
    },
    {
      "textContent": "Łokieć pięta,debil szybki\na Ty jesteś pedał brzydki.....",
      "author": "Koza11",
      "dateAdded": {
        "$date": 1475083072772
      },
      "ratedGoodCounter": 220,
      "ratedBadCounter": 23,
      "ratingIndex": 0.9016240754512933,
      "_id": "ymk2iTenyiv2E4dar"
    },
    {
      "textContent": "Gdy ci smutno gdy ci źle\nWeś zarymuj odpręż się",
      "author": "Znany diabelek😈",
      "dateAdded": {
        "$date": 1468935675883
      },
      "ratedGoodCounter": 218,
      "ratedBadCounter": 36,
      "ratingIndex": 0.8548887151451612,
      "_id": "Rpvzp9K63Kcwhg4Lu"
    },
    {
      "textContent": "Czekaj chłopie\nbo siedze na klopie",
      "author": "POLSKI_POLAK_775",
      "dateAdded": {
        "$date": 1469099015595
      },
      "ratedGoodCounter": 214,
      "ratedBadCounter": 40,
      "ratingIndex": 0.8392027209829226,
      "_id": "jt2KdAJZBWa4qCAZG"
    },
    {
      "textContent": "Mam tu wszystko i mam nic\nweź ogarnij zapal znicz :/",
      "author": "DejfCeps",
      "dateAdded": {
        "$date": 1478202603109
      },
      "ratedGoodCounter": 213,
      "ratedBadCounter": 38,
      "ratingIndex": 0.845224728168977,
      "_id": "j8dQSAQjvZhv2Jzii"
    },
    {
      "textContent": "Łokieć, pięta brudny toster,\ngdzie są cycki LitlleMooonster? 😂😜",
      "author": "~Vika~",
      "dateAdded": {
        "$date": 1478902997322
      },
      "ratedGoodCounter": 211,
      "ratedBadCounter": 27,
      "ratingIndex": 0.8828296459080047,
      "_id": "KEGTZdd3NLt4BiJzp"
    },
    {
      "textContent": "ręka noga mózg na śćanie\nto jest właśnie me mieszkanie",
      "author": "lol",
      "dateAdded": {
        "$date": 1478896036514
      },
      "ratedGoodCounter": 208,
      "ratedBadCounter": 19,
      "ratingIndex": 0.9122630136710356,
      "_id": "t7kPCMbY5uerDT2sj"
    },
    {
      "textContent": "zaraz wróci tu Tereska, co nakarmi swego pieska\nDa mu szynki i kiełbasy bo to piesek czystej rasy 😆",
      "author": "Inkaaa",
      "dateAdded": {
        "$date": 1477946802119
      },
      "ratedGoodCounter": 206,
      "ratedBadCounter": 34,
      "ratingIndex": 0.8547569862500797,
      "_id": "7MQLghk9YHBZsFCkA"
    },
    {
      "textContent": "opowiem ci bajke jak kot palił fajke\na kocica papierosa i kupiła domestosa",
      "author": "Domcia",
      "dateAdded": {
        "$date": 1463648370578
      },
      "ratedGoodCounter": 205,
      "ratedBadCounter": 25,
      "ratingIndex": 0.8874291409688423,
      "_id": "vZkqmXp9hkW9a7x8P"
    },
    {
      "textContent": "Weekend kończy się tak krótko.\nBędzie tydzień, będzie smutno.",
      "author": "Amixis",
      "dateAdded": {
        "$date": 1488665916065
      },
      "ratedGoodCounter": 205,
      "ratedBadCounter": 28,
      "ratingIndex": 0.8760522725563609,
      "_id": "5PsjJKDSBSS3mSvXw"
    },
    {
      "textContent": "jestem ola nie mam swetra\nmoje czoło ma pół metra",
      "author": "ktoś.",
      "dateAdded": {
        "$date": 1460913395110
      },
      "ratedGoodCounter": 200,
      "ratedBadCounter": 18,
      "ratingIndex": 0.9132228195709,
      "_id": "wd5xtwQhiSsC5mH7S"
    },
    {
      "textContent": "Gdy ci smutno gdy ci źle\nChodź tu do mnie przytul się 😍",
      "author": "Misia",
      "dateAdded": {
        "$date": 1485282630315
      },
      "ratedGoodCounter": 200,
      "ratedBadCounter": 35,
      "ratingIndex": 0.8474423297401904,
      "_id": "8AK4hfeTWsKTAK3qH"
    },
    {
      "textContent": "Łokieć, pięta, niezły bajer\nDaj łapeczkę nie bądź frajer",
      "author": "M*omo",
      "dateAdded": {
        "$date": 1557438170859
      },
      "ratedGoodCounter": 195,
      "ratedBadCounter": 13,
      "ratingIndex": 0.9329927910653916,
      "_id": "ZGudaEc3mw7e7Qc62"
    },
    {
      "textContent": "Zachwyć się szybko widokiem lasu,\nbo może Ci potem braknąć czasu.",
      "author": "Nkkrytyk",
      "dateAdded": {
        "$date": 1485797657436
      },
      "ratedGoodCounter": 194,
      "ratedBadCounter": 30,
      "ratingIndex": 0.8622050416612288,
      "_id": "4XpWT5WrAdAGdKqgQ"
    },
    {
      "textContent": "W Czarnobylu na ulicy\nLeży Marcel w swej spódnicy",
      "author": "Nemezis wielka twórczyni:3",
      "dateAdded": {
        "$date": 1485119380620
      },
      "ratedGoodCounter": 193,
      "ratedBadCounter": 21,
      "ratingIndex": 0.8976548406168061,
      "_id": "JqzfFX3WQbJQXdPbm"
    },
    {
      "textContent": "Z przodu plecy, z tyłu plecy\nPan Bóg stworzył cię dla hecy",
      "author": "Rygl",
      "dateAdded": {
        "$date": 1478959313082
      },
      "ratedGoodCounter": 193,
      "ratedBadCounter": 34,
      "ratingIndex": 0.8464748164971554,
      "_id": "nEQAr65KrTgqrhFe2"
    },
    {
      "textContent": "Kocham mame kocham tate\na najbardziej ich wypłate.",
      "author": "Paula",
      "dateAdded": {
        "$date": 1463060210830
      },
      "ratedGoodCounter": 192,
      "ratedBadCounter": 21,
      "ratingIndex": 0.8971765293819146,
      "_id": "E6Q4DXsoRzQoa9xgk"
    },
    {
      "textContent": "Skoro takaś jest pyskata\ndziś ominie cię wypłata",
      "author": "Madzik XD",
      "dateAdded": {
        "$date": 1462477482869
      },
      "ratedGoodCounter": 189,
      "ratedBadCounter": 19,
      "ratingIndex": 0.904285342493196,
      "_id": "S2hossEeQDCuAx4wL"
    },
    {
      "textContent": "Czary mary dylu, dylu i wybuchło w Czarnobylu,\ncieszą się radzieckie dzieci, że im drugie słońce świeci.",
      "author": "xyz",
      "dateAdded": {
        "$date": 1466502408310
      },
      "ratedGoodCounter": 189,
      "ratedBadCounter": 25,
      "ratingIndex": 0.8790506065067272,
      "_id": "ApuQHbtSghzDtmbmG"
    },
    {
      "textContent": "nie boje się gdy z dziadkiem śpię\ngdy dziadek pierdnie ulatniam się",
      "author": "gówno543",
      "dateAdded": {
        "$date": 1468698598382
      },
      "ratedGoodCounter": 189,
      "ratedBadCounter": 36,
      "ratingIndex": 0.8362667069508574,
      "_id": "QnDkqAkK7AcJH4CuH"
    },
    {
      "textContent": "Gdy Mikołaj się dobija\nOtwórz szybko daj mu w ryja",
      "author": "Riposta666",
      "dateAdded": {
        "$date": 1557487288885
      },
      "ratedGoodCounter": 188,
      "ratedBadCounter": 9,
      "ratingIndex": 0.9494705089405546,
      "_id": "95gG7EEznCCwwqPkk"
    },
    {
      "textContent": "jestem mega jestem git\ntylko szkoda ze nie vip",
      "author": ":-*",
      "dateAdded": {
        "$date": 1467128470488
      },
      "ratedGoodCounter": 188,
      "ratedBadCounter": 35,
      "ratingIndex": 0.8392688687295082,
      "_id": "YJWqRxxTqxMcJkvHD"
    },
    {
      "textContent": "Dziś nie złapię już pikachu\nZamknij mordę chory graczu",
      "author": "XxXswagyoloXxX",
      "dateAdded": {
        "$date": 1468795325020
      },
      "ratedGoodCounter": 187,
      "ratedBadCounter": 33,
      "ratingIndex": 0.8461364005020392,
      "_id": "KJENLxaBEP5tNC62r"
    },
    {
      "textContent": "wyglądasz jak kwiat róży\ntylko masz łeb za duzy",
      "author": "Darinnaa",
      "dateAdded": {
        "$date": 1466245950667
      },
      "ratedGoodCounter": 180,
      "ratedBadCounter": 21,
      "ratingIndex": 0.8910670848741226,
      "_id": "Mpr7iJBmryGMqhB42"
    },
    {
      "textContent": "Na górze róże na dole mlecz\nNie mam dziewczyny mam GTA pięć",
      "author": "PysiaGabi05",
      "dateAdded": {
        "$date": 1485280830699
      },
      "ratedGoodCounter": 180,
      "ratedBadCounter": 27,
      "ratingIndex": 0.8653644654899814,
      "_id": "pDZfoMyZRYup2BvzZ"
    },
    {
      "textContent": "pijesz frugo żyjesz długo\npijesz roko jesteś spoko",
      "author": "muminek dla beki",
      "dateAdded": {
        "$date": 1464979976857
      },
      "ratedGoodCounter": 179,
      "ratedBadCounter": 19,
      "ratingIndex": 0.8994745514411135,
      "_id": "PAGe67YiXRnMFfvyy"
    },
    {
      "textContent": "Każdy lubi ciasto jeść,\nale lody są THE BEST!",
      "author": "!!!DAVID!!!",
      "dateAdded": {
        "$date": 1485164023275
      },
      "ratedGoodCounter": 179,
      "ratedBadCounter": 31,
      "ratingIndex": 0.8483220047969551,
      "_id": "5qqmn3WtqFw8siufS"
    },
    {
      "textContent": "za górami za lasami jedzie pociąg z wariatami\na w ostatnim wagoniku siedzifrajer na nocniku",
      "author": "",
      "dateAdded": {
        "$date": 1466836131155
      },
      "ratedGoodCounter": 178,
      "ratedBadCounter": 28,
      "ratingIndex": 0.8598831191630547,
      "_id": "QxEFxg4yfPFWABW9u"
    },
    {
      "textContent": "Hokus pokus czary mary\nA ty idziesz sprzątać gary",
      "author": "Lili78xd",
      "dateAdded": {
        "$date": 1464331420357
      },
      "ratedGoodCounter": 176,
      "ratedBadCounter": 16,
      "ratingIndex": 0.9118923792661403,
      "_id": "JR6TFAXPExPKYDvqB"
    },
    {
      "textContent": "Matmy nie trawie polskim sie dławie\nAnglik jest nudny dzwonek przecudny",
      "author": "Riposta666",
      "dateAdded": {
        "$date": 1557486874369
      },
      "ratedGoodCounter": 168,
      "ratedBadCounter": 15,
      "ratingIndex": 0.9130162155082747,
      "_id": "4mykpdb92gpskHJeq"
    },
    {
      "textContent": "Rzeki przepłynołem,\nGóry pokonałem,  i na drodze sie wyjebałem",
      "author": "By nikt",
      "dateAdded": {
        "$date": 1487018390477
      },
      "ratedGoodCounter": 164,
      "ratedBadCounter": 11,
      "ratingIndex": 0.9317877621255949,
      "_id": "PMXxDHdWQSPsTwP4m"
    },
    {
      "textContent": "nie mam dzisiaj zbyt nastroju\nbo żem wpadła w kupę gnoju",
      "author": "kili23",
      "dateAdded": {
        "$date": 1451825335496
      },
      "ratedGoodCounter": 163,
      "ratedBadCounter": 14,
      "ratingIndex": 0.9157011246615453,
      "_id": "Q7bzBzce7wymdNdiW"
    },
    {
      "textContent": "Jechał cygan na rowerze i potrącił dzikie zwierze,\na wracając - już do domu, zapierdolił kilo złomu",
      "author": "Agresywna 13",
      "dateAdded": {
        "$date": 1466627945030
      },
      "ratedGoodCounter": 161,
      "ratedBadCounter": 21,
      "ratingIndex": 0.879754908995454,
      "_id": "DgAQgL6QnKka4uTYS"
    },
    {
      "textContent": "Ładne oczy masz ale brzydsza twarz zeby jak u konia\nDupa jak u slonia zeby jak u klauna caly zespol dauna",
      "author": "Eryk_Mr_Boss",
      "dateAdded": {
        "$date": 1477683687009
      },
      "ratedGoodCounter": 160,
      "ratedBadCounter": 19,
      "ratingIndex": 0.8888611515640086,
      "_id": "ZZ78rtc5azcYn5hdq"
    },
    {
      "textContent": "Łokieć, pięta,  duże bice,\njuż nie czekaj pokaż cyce",
      "author": "#Kinia",
      "dateAdded": {
        "$date": 1485292345471
      },
      "ratedGoodCounter": 160,
      "ratedBadCounter": 29,
      "ratingIndex": 0.8420816964274187,
      "_id": "E8cEe4k9NHvuS9qny"
    },
    {
      "textContent": "Hokus pokus czary mary\nzamiast starej masz dwóch starych",
      "author": "Criaki334",
      "dateAdded": {
        "$date": 1458368410914
      },
      "ratedGoodCounter": 159,
      "ratedBadCounter": 15,
      "ratingIndex": 0.908541451202311,
      "_id": "tdxK8MEKkTYYjC56M"
    },
    {
      "textContent": "wódka,impra i balony\nojciec dziecka nieznajomy",
      "author": "Domcia",
      "dateAdded": {
        "$date": 1463648541471
      },
      "ratedGoodCounter": 159,
      "ratedBadCounter": 18,
      "ratingIndex": 0.8932299224836088,
      "_id": "XWEX6KFREikjc64FY"
    },
    {
      "textContent": "Piszcie Rymy piszcie śmiało\nPiszcie Piszcie bo ich mało",
      "author": "Szybek",
      "dateAdded": {
        "$date": 1487940708639
      },
      "ratedGoodCounter": 159,
      "ratedBadCounter": 28,
      "ratingIndex": 0.8457205669253944,
      "_id": "Xd4cn8QSHGRSzjmMn"
    },
    {
      "textContent": "Jeśli lecisz, leć do słońca, Jeśli kłamiesz, kłam do końca,\nGdy całujesz, to serdecznie, A gdy kochasz, kochaj wiecznie",
      "author": "Jaro😘",
      "dateAdded": {
        "$date": 1477401630392
      },
      "ratedGoodCounter": 154,
      "ratedBadCounter": 15,
      "ratingIndex": 0.9058506907020981,
      "_id": "xTMv2DdZZptgEGT7i"
    },
    {
      "textContent": "na gorze roze, na dole klucz\nnie szukaj chłopaka tylko sie ucz! :-P",
      "author": "Nieszczęśliwie -Zakochana",
      "dateAdded": {
        "$date": 1466282347756
      },
      "ratedGoodCounter": 152,
      "ratedBadCounter": 26,
      "ratingIndex": 0.8491352789489203,
      "_id": "zQNb8vh8ooXx8EZye"
    },
    {
      "textContent": "Płynie wódka płynie po polskiej krainie\nZobaczyła Wojtka, on jej nie ominie",
      "author": "Serdelek",
      "dateAdded": {
        "$date": 1478948336478
      },
      "ratedGoodCounter": 151,
      "ratedBadCounter": 20,
      "ratingIndex": 0.8778769624040582,
      "_id": "WLYWLhoZ7Dej6JhkT"
    },
    {
      "textContent": "Idzie marcin ciemnym borem\nWymachując swym ptaszorem",
      "author": "Gwiazdka xd",
      "dateAdded": {
        "$date": 1479575532772
      },
      "ratedGoodCounter": 150,
      "ratedBadCounter": 13,
      "ratingIndex": 0.9145997306911868,
      "_id": "nCp8EykFPkQwwWt39"
    },
    {
      "textContent": "Łokieć pięta i poprzeczka\nIVAN, Kurwa, Gdzie zawleczka",
      "author": "ToJaHiHiHi",
      "dateAdded": {
        "$date": 1475083597857
      },
      "ratedGoodCounter": 148,
      "ratedBadCounter": 16,
      "ratingIndex": 0.8969363646190505,
      "_id": "MwYkZF4aEhW4KFrSG"
    },
    {
      "textContent": "Danonki do picia pozbawią cię życia\nDanonki pijemy bo żyć już nie chcemy",
      "author": "Jaaa1xd",
      "dateAdded": {
        "$date": 1466225892613
      },
      "ratedGoodCounter": 147,
      "ratedBadCounter": 21,
      "ratingIndex": 0.8697916798463138,
      "_id": "JyAPQJoZDNfsoMyjh"
    },
    {
      "textContent": "Hokus Pokus Czary Mary\nHomunculus to twój stary",
      "author": "Warfox",
      "dateAdded": {
        "$date": 1464726033852
      },
      "ratedGoodCounter": 146,
      "ratedBadCounter": 18,
      "ratingIndex": 0.8848155894534409,
      "_id": "FWAQQMufQfozfbbAS"
    },
    {
      "textContent": "Oczko, Oczko, Buzia, Nosek\nDwie cytrynki, Kabanosek",
      "author": "Wii Kaa <3 🙈",
      "dateAdded": {
        "$date": 1454196018198
      },
      "ratedGoodCounter": 143,
      "ratedBadCounter": 20,
      "ratingIndex": 0.8719184473331311,
      "_id": "84CH4xpYSkgAX7m2b"
    },
    {
      "textContent": "Wale rymy\nJak z maszyny",
      "author": "Pereeseusz",
      "dateAdded": {
        "$date": 1487710907193
      },
      "ratedGoodCounter": 138,
      "ratedBadCounter": 25,
      "ratingIndex": 0.8414318043356037,
      "_id": "KCj4Lhp88TsZ5NE9X"
    },
    {
      "textContent": "Religi nie czaje, Matmą sie dlawie\nPolski jest nudny a WF CUDNY!!!",
      "author": "Mante/maxs11",
      "dateAdded": {
        "$date": 1453457562103
      },
      "ratedGoodCounter": 137,
      "ratedBadCounter": 16,
      "ratingIndex": 0.8895723964293177,
      "_id": "m36nDx3C6WLfQtM3f"
    },
    {
      "textContent": "Nie oglądaj się za siebie\nbo ci z przodu ktoś wyj*bie",
      "author": "Anonimowy 😉",
      "dateAdded": {
        "$date": 1482867502454
      },
      "ratedGoodCounter": 136,
      "ratedBadCounter": 10,
      "ratingIndex": 0.9251267146065394,
      "_id": "osh4rzTpu9JXfX3Hd"
    },
    {
      "textContent": "Twoje zęby są jak gwiazdy na niebie :D\nsą żółte i daleko od siebie",
      "author": "krysek 😄",
      "dateAdded": {
        "$date": 1453625544210
      },
      "ratedGoodCounter": 136,
      "ratedBadCounter": 19,
      "ratingIndex": 0.8717586129647276,
      "_id": "YeQkX8g6WzFGPj26H"
    },
    {
      "textContent": "Dziwne polski są utwory\nJak nie lubie ja tej szkoły",
      "author": "Pieseł i koteł",
      "dateAdded": {
        "$date": 1485120157240
      },
      "ratedGoodCounter": 132,
      "ratedBadCounter": 23,
      "ratingIndex": 0.8461186728743411,
      "_id": "xgzEJ8FPEGfRNs9qF"
    },
    {
      "textContent": "Baba Bez Bolca\nDostaje Pierdolca",
      "author": "Ja xD",
      "dateAdded": {
        "$date": 1465303252723
      },
      "ratedGoodCounter": 130,
      "ratedBadCounter": 17,
      "ratingIndex": 0.8783377546371712,
      "_id": "A2mhKg3zWKiyHj8xY"
    },
    {
      "textContent": "trochę to trudne do zrozumienia\nbo Polska wygrywa tylko 1 do 0",
      "author": "blezz",
      "dateAdded": {
        "$date": 1478896289404
      },
      "ratedGoodCounter": 127,
      "ratedBadCounter": 20,
      "ratingIndex": 0.8580684219727728,
      "_id": "kauHkvgpoLNXMpRsJ"
    },
    {
      "textContent": "Moja babcia jest kucharką robi kluski betoniarką\nA mój dziadek jest górnikiem kopie węgiel pod śmietnikiem",
      "author": "Tu Kingston Joł",
      "dateAdded": {
        "$date": 1570262412561
      },
      "ratedGoodCounter": 122,
      "ratedBadCounter": 8,
      "ratingIndex": 0.9312426290700858,
      "_id": "iWspwJqNDgAzL6pyo"
    },
    {
      "textContent": "Morda w krzaki\nŻreć robaki",
      "author": "Sebczuuk",
      "dateAdded": {
        "$date": 1462135901214
      },
      "ratedGoodCounter": 122,
      "ratedBadCounter": 16,
      "ratingIndex": 0.8776517621687414,
      "_id": "FFG5qeaiyF7mRBztf"
    },
    {
      "textContent": "Gdy ci smutno gdy ci źle\nwalnij sete albo dwie",
      "author": "Janusz",
      "dateAdded": {
        "$date": 1462375038514
      },
      "ratedGoodCounter": 119,
      "ratedBadCounter": 14,
      "ratingIndex": 0.8880095534259644,
      "_id": "kqokeLePFDAqra7W8"
    },
    {
      "textContent": "Łokieć pieta,dwa kibole\nJuż jest po mnie japierdole",
      "author": "AAnaniX na Youtubie 😀",
      "dateAdded": {
        "$date": 1486162306931
      },
      "ratedGoodCounter": 117,
      "ratedBadCounter": 8,
      "ratingIndex": 0.9285120340718195,
      "_id": "4Zrqn2Ghr5vzGoyR7"
    },
    {
      "textContent": "Hokus pokus tost i chleb\njapierdole co za zjeb",
      "author": "Kindzi",
      "dateAdded": {
        "$date": 1482441533146
      },
      "ratedGoodCounter": 117,
      "ratedBadCounter": 9,
      "ratingIndex": 0.9212018544482395,
      "_id": "yGkuGBcM94q8K6f8m"
    },
    {
      "textContent": "Łokieć pięta dwa kalosze\nTwoja stara żre bambosze",
      "author": "Wr3dna",
      "dateAdded": {
        "$date": 1557467375680
      },
      "ratedGoodCounter": 117,
      "ratedBadCounter": 17,
      "ratingIndex": 0.8666184508865494,
      "_id": "x82wKjgRWRbsfwHXF"
    },
    {
      "textContent": "Na górze róże na dole korale\nZdejmij te rurki jebany pedale",
      "author": "Pawix",
      "dateAdded": {
        "$date": 1474907922822
      },
      "ratedGoodCounter": 114,
      "ratedBadCounter": 12,
      "ratingIndex": 0.8975812717829709,
      "_id": "fzqRCmbf9J8gagsHe"
    },
    {
      "textContent": "w dniu twojego święta ty krowo kopnięta\nwreczam ci to zielę tyś głupia jak cielę",
      "author": "hanka-manka",
      "dateAdded": {
        "$date": 1460304212121
      },
      "ratedGoodCounter": 112,
      "ratedBadCounter": 12,
      "ratingIndex": 0.8959417299686457,
      "_id": "iXC4CfKEpQrPz4umw"
    },
    {
      "textContent": "Słońce przyjaźń i atrakcje\nJuż za chwilą są wakacje",
      "author": "G#wno Cię to obchodzi",
      "dateAdded": {
        "$date": 1465580818108
      },
      "ratedGoodCounter": 112,
      "ratedBadCounter": 18,
      "ratingIndex": 0.8549112904065288,
      "_id": "7aMXjPDwkjeqtuXN8"
    },
    {
      "textContent": "Łokieć, pięta, mrówka, jutro jest kartkówka\nŁokieć, pięta, ważka, niech omine nas porażka",
      "author": "M*omo",
      "dateAdded": {
        "$date": 1557422226032
      },
      "ratedGoodCounter": 111,
      "ratedBadCounter": 11,
      "ratingIndex": 0.9023784334539581,
      "_id": "yK2hCxRcTa9kztD2i"
    },
    {
      "textContent": "Kupiłem malucha , takie małe auto\ndałem parę stówek,ale było warto .",
      "author": "Maksikos",
      "dateAdded": {
        "$date": 1458983952402
      },
      "ratedGoodCounter": 111,
      "ratedBadCounter": 15,
      "ratingIndex": 0.8739607839042659,
      "_id": "tx8mRNLLYpiv7Coh3"
    },
    {
      "textContent": "łokieć pięta motyl ważka\ntwoja stara to porażka",
      "author": "shadow",
      "dateAdded": {
        "$date": 1557417010086
      },
      "ratedGoodCounter": 110,
      "ratedBadCounter": 11,
      "ratingIndex": 0.9015777851365943,
      "_id": "kTwaRLc7HHoC56vCt"
    },
    {
      "textContent": "A ja sobie sesje mam\nMatko Boska jestem sam",
      "author": "Ja!",
      "dateAdded": {
        "$date": 1485205308831
      },
      "ratedGoodCounter": 110,
      "ratedBadCounter": 19,
      "ratingIndex": 0.8461030922483235,
      "_id": "JNSGJNjK7kjb6osZW"
    },
    {
      "textContent": "Na górze róże na dole banan, kto go prostuje?\nMickiewicz Adam",
      "author": "Jebaczoko",
      "dateAdded": {
        "$date": 1465111036916
      },
      "ratedGoodCounter": 110,
      "ratedBadCounter": 20,
      "ratingIndex": 0.839645019910156,
      "_id": "YerF96NG45eMAo65L"
    },
    {
      "textContent": "Enedue rabe,\nPutin gwałci żabe",
      "author": "ktoś tam napewno",
      "dateAdded": {
        "$date": 1451943282988
      },
      "ratedGoodCounter": 109,
      "ratedBadCounter": 13,
      "ratingIndex": 0.8861193239834834,
      "_id": "Az7avFFSQLY8wy8F2"
    },
    {
      "textContent": "gdy doszkoły trzeba gnać\nDostaje szału,kurwa mać!",
      "author": "PG_Scott",
      "dateAdded": {
        "$date": 1474920769497
      },
      "ratedGoodCounter": 108,
      "ratedBadCounter": 11,
      "ratingIndex": 0.8999365261416813,
      "_id": "hr9WKMECPbgqnH7Hy"
    },
    {
      "textContent": "ence pence hokus pokus\ntwoja stara to ford focus",
      "author": "CichoCiemny13",
      "dateAdded": {
        "$date": 1454239515623
      },
      "ratedGoodCounter": 105,
      "ratedBadCounter": 15,
      "ratingIndex": 0.867708424932392,
      "_id": "R3E5q6twsdFMXJZtD"
    },
    {
      "textContent": "-Co tam świeci, hen na niebie?\n-Chyba zaraz nas rozjebie",
      "author": "Mieszkańcy Nagasaki",
      "dateAdded": {
        "$date": 1445984743400
      },
      "ratedGoodCounter": 104,
      "ratedBadCounter": 14,
      "ratingIndex": 0.8738868233382248,
      "_id": "kpy82EPtnmJc2nnC4"
    },
    {
      "textContent": "Gdy ci smutno gdy ci źle\nWeź pistolet zastrzel się",
      "author": "Slim Shady pl",
      "dateAdded": {
        "$date": 1569959935115
      },
      "ratedGoodCounter": 104,
      "ratedBadCounter": 16,
      "ratingIndex": 0.8594444470577853,
      "_id": "gzRitCPT2kfF43biw"
    },
    {
      "textContent": "Zero smutku zero łez moje życie jest THE BEST!!!\nJestem słodka jestem Git tylko proszę powiedz VIP",
      "author": "Pralnia💙",
      "dateAdded": {
        "$date": 1464776593834
      },
      "ratedGoodCounter": 104,
      "ratedBadCounter": 17,
      "ratingIndex": 0.8524008489379605,
      "_id": "XwtKJit2te7CNh7M6"
    },
    {
      "textContent": "Kazdy facet pęka z dumy\nGdy mnie widzi w dresach z pumy!",
      "author": "Mante/maxs11",
      "dateAdded": {
        "$date": 1453457133594
      },
      "ratedGoodCounter": 103,
      "ratedBadCounter": 12,
      "ratingIndex": 0.8878639590993465,
      "_id": "JhQG2rgCKJNi9WXBr"
    },
    {
      "textContent": "łokieć pięta i kolano\nnie chce mi się wstawać rano",
      "author": "shadow",
      "dateAdded": {
        "$date": 1557415755234
      },
      "ratedGoodCounter": 101,
      "ratedBadCounter": 5,
      "ratingIndex": 0.9438412731227843,
      "_id": "JfE7XWfzniu9Zygux"
    },
    {
      "textContent": "Na górze róże na dole\nAkacje nie możesz odpowiedzieć na tę konwersacje",
      "author": "Bez nickowy andrzej",
      "dateAdded": {
        "$date": 1557422078523
      },
      "ratedGoodCounter": 97,
      "ratedBadCounter": 11,
      "ratingIndex": 0.8898320533421854,
      "_id": "wDL5GRCT3zjKvK3YY"
    },
    {
      "textContent": "Gdy Ci smutno, gdy Ci źle\nWeź \"se\" kocyk przykryj się",
      "author": "Sylwix",
      "dateAdded": {
        "$date": 1480107521463
      },
      "ratedGoodCounter": 96,
      "ratedBadCounter": 8,
      "ratingIndex": 0.9142012642292441,
      "_id": "eiWj3BQA5erbbypZR"
    },
    {
      "textContent": "Słońce wstało, miesiąc maj. Jaś do Kasi: KASIU DAJ.\nKasia na to: JASIU BIERZ. Słońce zaszło, Kasia też.",
      "author": "Heheszek",
      "dateAdded": {
        "$date": 1496438530685
      },
      "ratedGoodCounter": 96,
      "ratedBadCounter": 9,
      "ratingIndex": 0.9055782531303044,
      "_id": "WEYz2FPE5RpWaHrAT"
    },
    {
      "textContent": "jak ci smutno jak ci zle\ngabrys twoje gowno zje",
      "author": "gerda",
      "dateAdded": {
        "$date": 1452350811591
      },
      "ratedGoodCounter": 95,
      "ratedBadCounter": 15,
      "ratingIndex": 0.8557851851667009,
      "_id": "ZnJqxfQ5dkqa9xYmc"
    },
    {
      "textContent": "Czary-mary, ence-pence,\nOpadają mi już ręce.",
      "author": "Nikola",
      "dateAdded": {
        "$date": 1498927278680
      },
      "ratedGoodCounter": 91,
      "ratedBadCounter": 2,
      "ratingIndex": 0.9679732056201561,
      "_id": "8vmAKpexXfwJzoXer"
    },
    {
      "textContent": "Nie gadaj tyle\nBo cię zjedzą motyle",
      "author": "Jonek",
      "dateAdded": {
        "$date": 1557433102382
      },
      "ratedGoodCounter": 91,
      "ratedBadCounter": 11,
      "ratingIndex": 0.883410242857961,
      "_id": "4ERboCRwFiiQMovb9"
    },
    {
      "textContent": "Po co tyle się pudrować -\nChodź na impre zabalować",
      "author": "Koteł",
      "dateAdded": {
        "$date": 1478329174113
      },
      "ratedGoodCounter": 88,
      "ratedBadCounter": 9,
      "ratingIndex": 0.897863801231153,
      "_id": "M3McXtMQmgH6Ncoet"
    },
    {
      "textContent": "To już koniec z problemami\nMiałem lekcje z matołami",
      "author": "Wiewiórka ❤💚💙💜",
      "dateAdded": {
        "$date": 1464458429823
      },
      "ratedGoodCounter": 86,
      "ratedBadCounter": 12,
      "ratingIndex": 0.8685964706812933,
      "_id": "NnJXMFH3fyQvn3gft"
    },
    {
      "textContent": "idzie Grześ przez wieś niesie worek zioła\nworek się rozerwał cała wieś wesoła",
      "author": "kamil",
      "dateAdded": {
        "$date": 1464468772953
      },
      "ratedGoodCounter": 85,
      "ratedBadCounter": 13,
      "ratingIndex": 0.8584965624401593,
      "_id": "NGqarGgSj54Afqzc4"
    },
    {
      "textContent": "gdy ci smutno gdy ci źle\nweź słodycze zeżryj je",
      "author": "firenn",
      "dateAdded": {
        "$date": 1499980325295
      },
      "ratedGoodCounter": 83,
      "ratedBadCounter": 3,
      "ratingIndex": 0.9538940352024039,
      "_id": "WcGXftJs9vSeZ95TT"
    },
    {
      "textContent": "w rytmie coś powinno być, coś się za nim musi kryć.\ngdy już czuję, że rymuje, to się super ekstra czuję",
      "author": "Błażej Podlaski",
      "dateAdded": {
        "$date": 1464894815244
      },
      "ratedGoodCounter": 83,
      "ratedBadCounter": 15,
      "ratingIndex": 0.8382966431924412,
      "_id": "zd5oxgfh8ZQJRQvd7"
    },
    {
      "textContent": "czekolada,marmolada\nprzy jedzeniu się nie gada",
      "author": "oliviaxxx",
      "dateAdded": {
        "$date": 1462888801192
      },
      "ratedGoodCounter": 80,
      "ratedBadCounter": 12,
      "ratingIndex": 0.860113553149989,
      "_id": "iHmeiEuhDkWMMcy8p"
    },
    {
      "textContent": "poco trzymać bąka w dupie ?\nniech polata. po hałupie",
      "author": "Dragomine",
      "dateAdded": {
        "$date": 1451512497278
      },
      "ratedGoodCounter": 80,
      "ratedBadCounter": 13,
      "ratingIndex": 0.8509655258588021,
      "_id": "rWBTXj7abFNpf33gB"
    },
    {
      "textContent": "lubie słońce ,lubię dzień\nidę spać bo jestem leń",
      "author": ":D",
      "dateAdded": {
        "$date": 1461610565280
      },
      "ratedGoodCounter": 79,
      "ratedBadCounter": 7,
      "ratingIndex": 0.9079232964607367,
      "_id": "w6qo77ZodDydEySnw"
    },
    {
      "textContent": "Słońce wstało miesiąc maj Jaś do Kasi Kasiu daj\nKasia na to Jasiu bierz słońce zaszło Kasia też",
      "author": "Madzik XD",
      "dateAdded": {
        "$date": 1463236819223
      },
      "ratedGoodCounter": 78,
      "ratedBadCounter": 12,
      "ratingIndex": 0.8570371828653535,
      "_id": "FoMoiDRwRgStiA4Qp"
    },
    {
      "textContent": "Na górze róże, na dole mlecz...\nnie mam dziewczyny, mam GTA pięć!",
      "author": "#ciasteczkowa_12",
      "dateAdded": {
        "$date": 1450800875870
      },
      "ratedGoodCounter": 78,
      "ratedBadCounter": 13,
      "ratingIndex": 0.847723808370901,
      "_id": "iGDpxpi3PeHK3MdY7"
    },
    {
      "textContent": "Na górze piwo na dole fajka,\nNie mam dziewczyny mam Counter-Strike!",
      "author": "🇯🇵кσкѕυ🇯🇵",
      "dateAdded": {
        "$date": 1463678479510
      },
      "ratedGoodCounter": 76,
      "ratedBadCounter": 12,
      "ratingIndex": 0.8538224380283825,
      "_id": "sEkDeWrvFHas8K4ZD"
    },
    {
      "textContent": "Bieda, nędza, świat okrutny\njebne wierszem bo żem smutny",
      "author": "😂😂😂aż jebłem🦄",
      "dateAdded": {
        "$date": 1477846806091
      },
      "ratedGoodCounter": 75,
      "ratedBadCounter": 8,
      "ratingIndex": 0.892727595707634,
      "_id": "jKQJ9o4dgRbr6EAzv"
    },
    {
      "textContent": "co sie co sie co sie stało\npiwo bartek sie wylało",
      "author": "maciek z klanu",
      "dateAdded": {
        "$date": 1446580279069
      },
      "ratedGoodCounter": 75,
      "ratedBadCounter": 11,
      "ratingIndex": 0.8619524127383891,
      "_id": "6usYd8M2ogRWWfF7Y"
    },
    {
      "textContent": "łokieć pięta elementa\nmay w klasie konfidenta",
      "author": "shadow",
      "dateAdded": {
        "$date": 1557415603737
      },
      "ratedGoodCounter": 74,
      "ratedBadCounter": 5,
      "ratingIndex": 0.9248517956085158,
      "_id": "RurvEECdzFsJzzs5i"
    },
    {
      "textContent": "Dzikie węże aligator\nTwoja stara to predator",
      "author": "Bartosz tkacz",
      "dateAdded": {
        "$date": 1557415442434
      },
      "ratedGoodCounter": 74,
      "ratedBadCounter": 7,
      "ratingIndex": 0.9023015521407457,
      "_id": "6kfDcEfYcqiWXZrvd"
    },
    {
      "textContent": "na gorze róże na dole ćma\nnie mam dziewczyny mam gta",
      "author": "koksu2219",
      "dateAdded": {
        "$date": 1464419262379
      },
      "ratedGoodCounter": 74,
      "ratedBadCounter": 10,
      "ratingIndex": 0.8704650019183494,
      "_id": "hdpyoTfqhwgr8wqsT"
    },
    {
      "textContent": "jestes piękna jak róża\nktóra się z kibla wynuża",
      "author": "Morda",
      "dateAdded": {
        "$date": 1456868388891
      },
      "ratedGoodCounter": 74,
      "ratedBadCounter": 12,
      "ratingIndex": 0.8504598491597729,
      "_id": "y9jqg4FYBQgsxj82e"
    },
    {
      "textContent": "W Hiszpanii słoneczko przygrzewa,\na w Polsce jak zawsze ulewa...",
      "author": "Jednorożec",
      "dateAdded": {
        "$date": 1461691100070
      },
      "ratedGoodCounter": 72,
      "ratedBadCounter": 8,
      "ratingIndex": 0.8887500504021473,
      "_id": "xG9kCsD9t62d46ezA"
    },
    {
      "textContent": "Jestem raperem\nBo jeżdżę rowerem",
      "author": "Henryk Sienkiewicz",
      "dateAdded": {
        "$date": 1449694039976
      },
      "ratedGoodCounter": 72,
      "ratedBadCounter": 12,
      "ratingIndex": 0.8469388330381875,
      "_id": "wSqpR39iBJHJ3RFKe"
    },
    {
      "textContent": "Wysoki jak topola,\ngłupi jak fasola",
      "author": "Słodka_Papryczka_PL",
      "dateAdded": {
        "$date": 1455540685255
      },
      "ratedGoodCounter": 69,
      "ratedBadCounter": 10,
      "ratingIndex": 0.8623618904878743,
      "_id": "ZMihcyeusQSR9DBvY"
    },
    {
      "textContent": "Dzień bez kompa, noc przespana\nInternecik wyłączyła mama",
      "author": "Ki11eR",
      "dateAdded": {
        "$date": 1455036325349
      },
      "ratedGoodCounter": 68,
      "ratedBadCounter": 12,
      "ratingIndex": 0.8393751565722621,
      "_id": "kzW7ztqoDNRzA6BMM"
    },
    {
      "textContent": "Dziś sobota dzień wesoły\nBo nie trzeba iść do szkoły",
      "author": "stanki5000",
      "dateAdded": {
        "$date": 1463938235650
      },
      "ratedGoodCounter": 65,
      "ratedBadCounter": 11,
      "ratingIndex": 0.8440097509792239,
      "_id": "XXqNLFv7E9CeKJzjh"
    },
    {
      "textContent": "ŁOKIEĆ PIĘTA 3 BANANY JESTEŚ KURWA ROZJEBANY\nXd",
      "author": "Szczur",
      "dateAdded": {
        "$date": 1482434022332
      },
      "ratedGoodCounter": 63,
      "ratedBadCounter": 6,
      "ratingIndex": 0.8998111027780813,
      "_id": "2WzLqWgpJdjjwbWfw"
    },
    {
      "textContent": "suplementy  z rana?\nlepiej zjedz banana",
      "author": "Pani Gwoździkowa",
      "dateAdded": {
        "$date": 1450426117428
      },
      "ratedGoodCounter": 63,
      "ratedBadCounter": 10,
      "ratingIndex": 0.8511916454256184,
      "_id": "xdteTgGmEoxvq3dCn"
    },
    {
      "textContent": "Łokieć pięta, dwa rekiny\nMoże spróbuj kokainy?",
      "author": "Sebixx",
      "dateAdded": {
        "$date": 1485346838499
      },
      "ratedGoodCounter": 62,
      "ratedBadCounter": 4,
      "ratingIndex": 0.9251607804617744,
      "_id": "p4LawhbMwBde3TW3F"
    },
    {
      "textContent": "Hokus Pokus, dobre granie\nWszyscy chwalą Cię Pazdanie.",
      "author": "legia real pamiętam",
      "dateAdded": {
        "$date": 1478336553438
      },
      "ratedGoodCounter": 61,
      "ratedBadCounter": 7,
      "ratingIndex": 0.8838669168864765,
      "_id": "E7bzmAw4TWenTXa3u"
    },
    {
      "textContent": "WYJEBANE MIEJ\nI SIĘ KURWA ŚMIEJ",
      "author": "DAVEEE®",
      "dateAdded": {
        "$date": 1463436001172
      },
      "ratedGoodCounter": 60,
      "ratedBadCounter": 9,
      "ratingIndex": 0.856962869896627,
      "_id": "3WdpmeatPvMyeAHJS"
    },
    {
      "textContent": "Łokieć pięta, twa piwnica,\nTo siedziba Trynkiewicza",
      "author": "kuzynka89",
      "dateAdded": {
        "$date": 1474795048828
      },
      "ratedGoodCounter": 59,
      "ratedBadCounter": 5,
      "ratingIndex": 0.9074707655063105,
      "_id": "tsCDQ4o4cXD68Ra8w"
    },
    {
      "textContent": "Justin Bieber to jest baba która\nRucha wciąż araba myje zęby kabanosem i popija domestosem",
      "author": "Ola",
      "dateAdded": {
        "$date": 1480527528629
      },
      "ratedGoodCounter": 59,
      "ratedBadCounter": 6,
      "ratingIndex": 0.8937279125946983,
      "_id": "kPn7By76pcPhbJRw9"
    },
    {
      "textContent": "Na górze wacki,na dole wacki,\nkto kocha wacki?Juliusz Słowacki.",
      "author": "XceL",
      "dateAdded": {
        "$date": 1467050235171
      },
      "ratedGoodCounter": 57,
      "ratedBadCounter": 6,
      "ratingIndex": 0.890400640829969,
      "_id": "gKQFkExPAdwL3DC7S"
    },
    {
      "textContent": "jestem raperem i jeżdżę rowerem\nmam włosy na klacie i gacie po tacie",
      "author": "~dziewczynka z pentagramem",
      "dateAdded": {
        "$date": 1499032151804
      },
      "ratedGoodCounter": 55,
      "ratedBadCounter": 1,
      "ratingIndex": 0.9646046531725986,
      "_id": "wtmAPCh5SoPjsbHde"
    },
    {
      "textContent": "mam te moc, mam te moc\nzaraz będzie w kiblu kloc",
      "author": "kurczaczekman",
      "dateAdded": {
        "$date": 1468312645490
      },
      "ratedGoodCounter": 55,
      "ratedBadCounter": 7,
      "ratingIndex": 0.8727888177609167,
      "_id": "xLLaqnZreZkAAAvWc"
    },
    {
      "textContent": "kot drapie fotele\nzaraz mu wpierdzielę",
      "author": "pedant alergik",
      "dateAdded": {
        "$date": 1446415486166
      },
      "ratedGoodCounter": 55,
      "ratedBadCounter": 9,
      "ratingIndex": 0.8459474822527151,
      "_id": "tXhXpA8iGmicBu4su"
    },
    {
      "textContent": "Tez mi wielki pan magister\nTaki mały ma tornister",
      "author": "Goździkowa",
      "dateAdded": {
        "$date": 1446088538614
      },
      "ratedGoodCounter": 53,
      "ratedBadCounter": 8,
      "ratingIndex": 0.8546090027024,
      "_id": "JaTNWHAkLoAwaAGYi"
    },
    {
      "textContent": "Piękne drzewo groźny lew\nMasz ryj jak świński chlew",
      "author": "Ja😊",
      "dateAdded": {
        "$date": 1463419978334
      },
      "ratedGoodCounter": 53,
      "ratedBadCounter": 9,
      "ratingIndex": 0.8410510529682532,
      "_id": "ojEus3KR3ZQaL8hNJ"
    },
    {
      "textContent": "na górze róże na dole lodówka\nten wiersz nie ma sensu mikrofalówka",
      "author": "mati mati",
      "dateAdded": {
        "$date": 1459583192018
      },
      "ratedGoodCounter": 51,
      "ratedBadCounter": 7,
      "ratingIndex": 0.8641499861946366,
      "_id": "WYAtpdZv7QPFteNXJ"
    },
    {
      "textContent": "łokieć pięta dwa placuszki,\nnie bądź taki, zrób se brzuszki😉",
      "author": "HerneS😡",
      "dateAdded": {
        "$date": 1483169657915
      },
      "ratedGoodCounter": 50,
      "ratedBadCounter": 3,
      "ratingIndex": 0.9255963778944412,
      "_id": "JrXZpdsauz76BHKdp"
    },
    {
      "textContent": "gram dziś sobie w gta\na za oknem kotek sra",
      "author": "SPIDERMAN",
      "dateAdded": {
        "$date": 1450529442903
      },
      "ratedGoodCounter": 50,
      "ratedBadCounter": 8,
      "ratingIndex": 0.8472059270751228,
      "_id": "7SwDecf3wiJDoujaT"
    },
    {
      "textContent": "Gdy ci smutno, gdy ci źle\nSkręć gibona, zjaraj się",
      "author": "Mary Jane Konopnicka",
      "dateAdded": {
        "$date": 1445981227009
      },
      "ratedGoodCounter": 48,
      "ratedBadCounter": 8,
      "ratingIndex": 0.8418368862832109,
      "_id": "wKdXFYkuGAXmErQ7c"
    },
    {
      "textContent": "na górze róże na\ndole kredens nie  mam dziewczyny bo gram w leauge of legends",
      "author": "tajemniczy ktoś",
      "dateAdded": {
        "$date": 1461011934597
      },
      "ratedGoodCounter": 47,
      "ratedBadCounter": 8,
      "ratingIndex": 0.8390084471081791,
      "_id": "mp2Hhh5PkRMq8t8nf"
    },
    {
      "textContent": "Raz dwa osiem trzy\nDzisiaj wpierdol dostaniesz...Ty!",
      "author": "Lili78xd",
      "dateAdded": {
        "$date": 1464331289251
      },
      "ratedGoodCounter": 45,
      "ratedBadCounter": 6,
      "ratingIndex": 0.8650521485273235,
      "_id": "AH9caPLY8GfW3x3xD"
    },
    {
      "textContent": "Łokieć pięta dwa pierogi\nWeś nie pierdol, zejdz mi z drogi",
      "author": "Ala",
      "dateAdded": {
        "$date": 1501239793111
      },
      "ratedGoodCounter": 44,
      "ratedBadCounter": 4,
      "ratingIndex": 0.8975696490152822,
      "_id": "mL39ezrgdb8eT8zsH"
    },
    {
      "textContent": "Hokus Pokus Dwa Pazdany\nSTUU Zna Numer Twojej Mamy",
      "author": "MłodySTUU 💎",
      "dateAdded": {
        "$date": 1478378970588
      },
      "ratedGoodCounter": 44,
      "ratedBadCounter": 6,
      "ratingIndex": 0.8624002481504001,
      "_id": "GaHqxK28D8vpd7mE9"
    },
    {
      "textContent": "Wymacałem już jednego zaraz pora na drugiego\nbo nie jestem tak okrutny by ten drugi miał być smutny",
      "author": "Pan mandarynka 🍊 i ciastko 🍪",
      "dateAdded": {
        "$date": 1462612300262
      },
      "ratedGoodCounter": 44,
      "ratedBadCounter": 7,
      "ratingIndex": 0.8458287484292664,
      "_id": "b97pL6KXrNj6ti6Lv"
    },
    {
      "textContent": "Gdyby nie ten wdech\nto by czlowiek zdechl",
      "author": "Mante/maxs11",
      "dateAdded": {
        "$date": 1453457330107
      },
      "ratedGoodCounter": 43,
      "ratedBadCounter": 7,
      "ratingIndex": 0.8428002998746751,
      "_id": "dyzZE5gMEi7PqGx9t"
    },
    {
      "textContent": "Piwo grzeje ,piwo chłodzi\npiwo nigdy nie zaszkodzi",
      "author": "Żaba gaba",
      "dateAdded": {
        "$date": 1461488630109
      },
      "ratedGoodCounter": 42,
      "ratedBadCounter": 7,
      "ratingIndex": 0.8396504423972856,
      "_id": "nMZsZK6ec5dCjASx7"
    },
    {
      "textContent": "Czarny chleb czarna sprawa\nJak ci smutno zjedz kebaba :D",
      "author": "Criski334",
      "dateAdded": {
        "$date": 1458326693086
      },
      "ratedGoodCounter": 41,
      "ratedBadCounter": 6,
      "ratingIndex": 0.8537802455633748,
      "_id": "opnKwssNLwMSHjYL2"
    },
    {
      "textContent": "Roses are red, Hamlet is tragic\nEveryone dies, it's a kind of magic",
      "author": "Mickiewit$ch",
      "dateAdded": {
        "$date": 1488305624409
      },
      "ratedGoodCounter": 41,
      "ratedBadCounter": 6,
      "ratingIndex": 0.8537802284008954,
      "_id": "CDucEMKjbSSy2AqhD"
    },
    {
      "textContent": "Szczęsny bramkarz pierwszą klasa\nRękawice z adidasa",
      "author": "Wojciech",
      "dateAdded": {
        "$date": 1552814951004
      },
      "ratedGoodCounter": 40,
      "ratedBadCounter": 3,
      "ratingIndex": 0.9085993966201206,
      "_id": "MXumztyycJY4dfLoY"
    },
    {
      "textContent": "Łokieć pięta samo grajka\nTwoja stara znosi jajka",
      "author": "Tkubaq",
      "dateAdded": {
        "$date": 1485456722118
      },
      "ratedGoodCounter": 39,
      "ratedBadCounter": 5,
      "ratingIndex": 0.8662190825902151,
      "_id": "QhaMPgryAhHNHrFTA"
    },
    {
      "textContent": "Nudzi mi się jak cholera\nZawołajcie striptizera",
      "author": "Zizua🌌",
      "dateAdded": {
        "$date": 1484405259505
      },
      "ratedGoodCounter": 37,
      "ratedBadCounter": 4,
      "ratingIndex": 0.8804284226004977,
      "_id": "6MSyQ26T6aCX3knuy"
    },
    {
      "textContent": "Idzie Grześ przez wieś niesie worek zioła,\nworek się rozerwał, cała wieś wesoła",
      "author": "mufinka125",
      "dateAdded": {
        "$date": 1480709699017
      },
      "ratedGoodCounter": 37,
      "ratedBadCounter": 5,
      "ratingIndex": 0.859977407097355,
      "_id": "wcMnDFMLkKZFrjYw6"
    },
    {
      "textContent": "siekiera motyka maka-paka a ta pani ma siusiaka\nsiekiera motyka pięć kilosów a Kowalska nie ma włosów",
      "author": "takatamja",
      "dateAdded": {
        "$date": 1467915002333
      },
      "ratedGoodCounter": 36,
      "ratedBadCounter": 6,
      "ratingIndex": 0.8367349427160979,
      "_id": "44EefgwwRSaLMdy7W"
    },
    {
      "textContent": "Gdy ci smutno, gdy ci źle\nidź do Wisły utop się!",
      "author": "F1vE :P",
      "dateAdded": {
        "$date": 1479730398382
      },
      "ratedGoodCounter": 34,
      "ratedBadCounter": 4,
      "ratingIndex": 0.8711914160718718,
      "_id": "LjDfwAdmFiZ5RjbZt"
    },
    {
      "textContent": "Hokus pokus, pół robaka\nZgiń, przepadnij, dostań raka",
      "author": "Spierdolina Umysłowa",
      "dateAdded": {
        "$date": 1486161652597
      },
      "ratedGoodCounter": 34,
      "ratedBadCounter": 4,
      "ratingIndex": 0.8711912247898417,
      "_id": "rnry35TYzxDiGqMsa"
    },
    {
      "textContent": "Mam ochotę na batona ale łapie pokemona",
      "author": "Kemix",
      "dateAdded": {
        "$date": 1474550190878
      },
      "ratedGoodCounter": 34,
      "ratedBadCounter": 4,
      "ratingIndex": 0.871191176932129,
      "_id": "BzxpQMQnWQq7HEZ5a"
    },
    {
      "textContent": "Ja jem gofry, on je serek,\nLecz ty ładny masz sweterek.",
      "author": "Say cheese!",
      "dateAdded": {
        "$date": 1482706354317
      },
      "ratedGoodCounter": 33,
      "ratedBadCounter": 4,
      "ratingIndex": 0.8677869218772452,
      "_id": "ccLSS6cKRAhBwKxPb"
    },
    {
      "textContent": "Przez las spory przez las dziki zapierdziela  myszka miki za\nnią Yogi ciężko sapie czekaj pindo ja cie złapię",
      "author": "Psychiczna",
      "dateAdded": {
        "$date": 1483629362329
      },
      "ratedGoodCounter": 32,
      "ratedBadCounter": 2,
      "ratingIndex": 0.9134949124742413,
      "_id": "36TLMnNtXwJY2FH2R"
    },
    {
      "textContent": "Do it do it or i'll die\nBecause life is just a big lie",
      "author": "me",
      "dateAdded": {
        "$date": 1492941676408
      },
      "ratedGoodCounter": 32,
      "ratedBadCounter": 4,
      "ratingIndex": 0.8641975662299435,
      "_id": "24r6yGXdbPvorRugX"
    },
    {
      "textContent": "czy to puder czy to szminka jastin\nbiber to dziewczynka",
      "author": "xdddddd",
      "dateAdded": {
        "$date": 1506520188041
      },
      "ratedGoodCounter": 31,
      "ratedBadCounter": 1,
      "ratingIndex": 0.9384766362569906,
      "_id": "5ELJMtojCSBAt8uA9"
    },
    {
      "textContent": "Łokieć pięta i kolano\nnie chce mi się wstawać rano",
      "author": "Kesha.",
      "dateAdded": {
        "$date": 1501372374878
      },
      "ratedGoodCounter": 31,
      "ratedBadCounter": 2,
      "ratingIndex": 0.9109275285278033,
      "_id": "DZ63bBbK3jhZRZHur"
    },
    {
      "textContent": "Multi miał wypadek.\nCzy to przez przypadek?",
      "author": "czuuX",
      "dateAdded": {
        "$date": 1506954311888
      },
      "ratedGoodCounter": 31,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8849481734976844,
      "_id": "FxoqrBcTDmgL8xTrD"
    },
    {
      "textContent": "Hokus Pokus, Pika Pika\nNapij się rozpuszczalnika",
      "author": "~ Pojeby.pl",
      "dateAdded": {
        "$date": 1474648597026
      },
      "ratedGoodCounter": 31,
      "ratedBadCounter": 4,
      "ratingIndex": 0.8604082126439697,
      "_id": "xMpKGmDCwEtDFRBTd"
    },
    {
      "textContent": "jak rymujesz\nto zyskukesz",
      "author": "laur",
      "dateAdded": {
        "$date": 1459282043933
      },
      "ratedGoodCounter": 31,
      "ratedBadCounter": 5,
      "ratingIndex": 0.8371914431610985,
      "_id": "5wdBckuhDtWALj2Hq"
    },
    {
      "textContent": "Wpadłem w nastrój poetycki\nale ty masz fajne cycki",
      "author": "LadyCaroline",
      "dateAdded": {
        "$date": 1486521271178
      },
      "ratedGoodCounter": 30,
      "ratedBadCounter": 2,
      "ratingIndex": 0.9082031766372861,
      "_id": "jYRmBuvdKAniXYBMq"
    },
    {
      "textContent": "Chcesz mieć cyce jak Pamela pij codziennie actimela xd\nxddd",
      "author": "Pietras 👊👊👊",
      "dateAdded": {
        "$date": 1497469067966
      },
      "ratedGoodCounter": 30,
      "ratedBadCounter": 3,
      "ratingIndex": 0.881542833378701,
      "_id": "XiP3ttkMA3wyHGmdG"
    },
    {
      "textContent": "Jutro będzie Nowy rok\nmoim zdaniem będzie OK",
      "author": "matinkaa😘",
      "dateAdded": {
        "$date": 1483194063986
      },
      "ratedGoodCounter": 30,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8815428093722453,
      "_id": "gwS2X7GDfQbmvMT2t"
    },
    {
      "textContent": "Chować kieszenie\nBo rudy w terenie xd",
      "author": "Adixs69",
      "dateAdded": {
        "$date": 1483141331159
      },
      "ratedGoodCounter": 30,
      "ratedBadCounter": 3,
      "ratingIndex": 0.881542702898852,
      "_id": "ZxsX7ZWfprXdNivDb"
    },
    {
      "textContent": "Polak wjechał na serwera\nBo cebula nie umiera xddd",
      "author": "Demoon",
      "dateAdded": {
        "$date": 1485289961592
      },
      "ratedGoodCounter": 29,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8779297461827968,
      "_id": "2mJCQcqGsGPP24CRb"
    },
    {
      "textContent": "Pada śnieg pada śnieg wali granatami,\na Mikołaj dostał w łep leży pod saniami",
      "author": "😻Kociak😻",
      "dateAdded": {
        "$date": 1480014307100
      },
      "ratedGoodCounter": 29,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8779296988820348,
      "_id": "bNYMvv8jP2btJKJ5L"
    },
    {
      "textContent": "Rosses are red , violets are blue\nSugar is sweet and so are you! 🌹❤",
      "author": "😆😅",
      "dateAdded": {
        "$date": 1492935806870
      },
      "ratedGoodCounter": 29,
      "ratedBadCounter": 4,
      "ratingIndex": 0.8521582352298852,
      "_id": "BHaMsa8KKyp3giuqt"
    },
    {
      "textContent": "Aplikacja szybciej działa\nBędziesz rymów więcej chciała!",
      "author": "Programista Rymujto.pl",
      "dateAdded": {
        "$date": 1455676662435
      },
      "ratedGoodCounter": 29,
      "ratedBadCounter": 4,
      "ratingIndex": 0.8521582238851264,
      "_id": "t78Df4LFaBy2DX3h4"
    },
    {
      "textContent": "jestem hartkorem\nbo jeżdżę traktorem",
      "author": "moon white",
      "dateAdded": {
        "$date": 1458985554316
      },
      "ratedGoodCounter": 29,
      "ratedBadCounter": 4,
      "ratingIndex": 0.8521581656974316,
      "_id": "TN4E4zF52vn5yc9Yd"
    },
    {
      "textContent": "Mam trzy latka trzy i pół\nJak sie wkurze to zjem stół",
      "author": "Rockypl",
      "dateAdded": {
        "$date": 1496549428914
      },
      "ratedGoodCounter": 28,
      "ratedBadCounter": 1,
      "ratingIndex": 0.9322237155893326,
      "_id": "FeP4fmg64EQ9TgMGF"
    },
    {
      "textContent": "(imie)walczy(imie)radzi\n(imie)nigdy cie nie zdradzi",
      "author": "barti",
      "dateAdded": {
        "$date": 1479925095920
      },
      "ratedGoodCounter": 27,
      "ratedBadCounter": 2,
      "ratingIndex": 0.8989300565346038,
      "_id": "Kqe9hnz8EFXfAj847"
    },
    {
      "textContent": "Pada śnieg, Pada śnieg cieszą się bałwanki,\nJasny gwint, Jasny gwint kto zarąbał sanki !?",
      "author": "KorneliaaGAMES",
      "dateAdded": {
        "$date": 1483184317686
      },
      "ratedGoodCounter": 27,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8700003311575835,
      "_id": "TqFjRJQkQ5q5ojM3d"
    },
    {
      "textContent": "Łokieć pięta kilo złomu\nWypierdalaj już do domu.",
      "author": "Ja.",
      "dateAdded": {
        "$date": 1482767821291
      },
      "ratedGoodCounter": 27,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8700002934774503,
      "_id": "q3TrFfq5HrmQ4nQmj"
    },
    {
      "textContent": "hokus pokus pół robaka,\nzgiń, przepadnij, dostan raka",
      "author": "<3",
      "dateAdded": {
        "$date": 1477820851186
      },
      "ratedGoodCounter": 27,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8700001111824376,
      "_id": "EPPJ9gsF78iGYCD3u"
    },
    {
      "textContent": "Rymuj za darmo\nWidzę to czarno",
      "author": "Pesymista",
      "dateAdded": {
        "$date": 1452454799289
      },
      "ratedGoodCounter": 26,
      "ratedBadCounter": 4,
      "ratingIndex": 0.8377781274538263,
      "_id": "XqCcB6Jo4qt2xtjyk"
    },
    {
      "textContent": "Łokieć,pieta i schabowy\nwyczyść proszę moje schody",
      "author": "Da mam",
      "dateAdded": {
        "$date": 1482952552260
      },
      "ratedGoodCounter": 25,
      "ratedBadCounter": 2,
      "ratingIndex": 0.8916327146199745,
      "_id": "pPaSvyoST8fs6bwhR"
    },
    {
      "textContent": "łokieć , pięta  i stodoła\nJa pierdole jutro szkoła!",
      "author": "Zuza",
      "dateAdded": {
        "$date": 1498072335635
      },
      "ratedGoodCounter": 25,
      "ratedBadCounter": 2,
      "ratingIndex": 0.8916326551787775,
      "_id": "cme8wDB6Z5fcSPzcR"
    },
    {
      "textContent": "ręka oko mózg na ścianie\npowiedz prawdę mojej mamie",
      "author": "puma_pl_19",
      "dateAdded": {
        "$date": 1485030987422
      },
      "ratedGoodCounter": 25,
      "ratedBadCounter": 2,
      "ratingIndex": 0.8916325568680549,
      "_id": "n8ExqGyoHwCTvwxNN"
    },
    {
      "textContent": "Łokieć pięta jesteś dobra, ale oczy masz jak Kobra\nCałe życie w błedzie, bo myślałam że chińczyk ze mnie będzie",
      "author": "Oxselo☺",
      "dateAdded": {
        "$date": 1478624285282
      },
      "ratedGoodCounter": 25,
      "ratedBadCounter": 2,
      "ratingIndex": 0.8916324042261515,
      "_id": "3wrnCJ4MvFarx6QWL"
    },
    {
      "textContent": "Kapie dziś poranna rosa,\nA Voldemord nie ma nosa",
      "author": "Kciuk Leszka",
      "dateAdded": {
        "$date": 1483744831442
      },
      "ratedGoodCounter": 25,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8609697937657826,
      "_id": "rYSXnPu6fL6LFs6TF"
    },
    {
      "textContent": "Trochę wina trochę wódki\nA zobaczysz krasnoludki",
      "author": "Mefedronik $_$",
      "dateAdded": {
        "$date": 1487492128399
      },
      "ratedGoodCounter": 25,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8609697012716044,
      "_id": "5kukfFzqnfJkwp4JQ"
    },
    {
      "textContent": "kiedy liże sobie pięty\nto brakuje mi zachęty !",
      "author": "123PEFSON123",
      "dateAdded": {
        "$date": 1475079431898
      },
      "ratedGoodCounter": 25,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8609694603281545,
      "_id": "AntuddxSdfs7X34bX"
    },
    {
      "textContent": "Chcesz mieć cycki jak Pamela?\nPij codziennie Actimela xD",
      "author": "Cypisek1989",
      "dateAdded": {
        "$date": 1477046353493
      },
      "ratedGoodCounter": 24,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8559672806161902,
      "_id": "dk88QjtGGfQSinZJE"
    },
    {
      "textContent": "Gdy rano wstaję\nTo sraczki dostaje",
      "author": "Adam Ghorey",
      "dateAdded": {
        "$date": 1489103499634
      },
      "ratedGoodCounter": 24,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8559672229540698,
      "_id": "PC43pJhgS9CShYMwi"
    },
    {
      "textContent": "Łokieć pięta węgiel stary\nNie zawracaj mi gitary.    Gitara siema",
      "author": "Aneta zydroń",
      "dateAdded": {
        "$date": 1496578689031
      },
      "ratedGoodCounter": 23,
      "ratedBadCounter": 2,
      "ratingIndex": 0.8832000541369904,
      "_id": "NQL6CMSSjw9CK9Ctd"
    },
    {
      "textContent": "Czy to stanik czy to szminka justin bieber to lezbijka\nmyje zęby kabanosem i popija domestosem",
      "author": "BatlicxD",
      "dateAdded": {
        "$date": 1477131509962
      },
      "ratedGoodCounter": 23,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8505918615172616,
      "_id": "aLdTGZ24cFyY8QZcC"
    },
    {
      "textContent": "Jest sobota, dzień smutaśny\nBo zabrakło mi sraj taśmy",
      "author": "Michauuu",
      "dateAdded": {
        "$date": 1485599795316
      },
      "ratedGoodCounter": 22,
      "ratedBadCounter": 2,
      "ratingIndex": 0.8784724456202679,
      "_id": "chELjxyHCA76JYrxC"
    },
    {
      "textContent": "Szkoła uczy i wychowuje\nZwłaszcza jak dostawać dwóje!",
      "author": "Adusia777@wp.pl",
      "dateAdded": {
        "$date": 1478117322090
      },
      "ratedGoodCounter": 21,
      "ratedBadCounter": 2,
      "ratingIndex": 0.8733460489639563,
      "_id": "tnYHwS28MxFZcBzLi"
    },
    {
      "textContent": "hokus pokus pika pika\nnapij sie rozpuszczalnika",
      "author": "Foka Sniezna",
      "dateAdded": {
        "$date": 1473851173677
      },
      "ratedGoodCounter": 21,
      "ratedBadCounter": 3,
      "ratingIndex": 0.8385420042401589,
      "_id": "So4mnks8xSwAQZrxe"
    }
  ];

  var template = $('[js-rhyme-list-item]').first();

  $.each(data, function(index, value) {
    var node = template.clone();
    
    var text = value.textContent.replace(/\n/g, "<br />");
    node.find('[js-rhyme-text]').html(text);

    node.find('[js-rhyme-author]').text(value.author);
    node.find('[js-rhyme-upvote-count]').text(value.ratedGoodCounter);
    node.attr('id', value._id);
    
    node.appendTo(template.parent());
  });

  $(document).trigger('renderingListReady');
}

$(document).on('preloadingComplete', function() {
  renderRhymesList();
});


//# sourceMappingURL=scripts-bundle.js.map