function showHamburgerMenu() {
	$('[js-selector="sidebar"]').addClass('is-expanded');
	$('[js-selector="sidebar-overlay"]').removeClass('is-hidden');
	setTimeout(function() {
		$('[js-selector="sidebar-overlay"]').removeClass('is-transparent');
	}, 100);
}

function hideHamburgerMenu() {
	$('[js-selector="sidebar"]').removeClass('is-expanded');
	$('[js-selector="sidebar-overlay"]').addClass('is-transparent');
	setTimeout(function() {
		$('[js-selector="sidebar-overlay"]').addClass('is-hidden');
	}, 800);
}

$.On('click', '[action-show-hamburger-menu]', function() {
	StateURL.setParam('hamburgerMenu', 'show');
});

$.On('click touchstart', '[action-hide-hamburger-menu]', function() {
	StateURL.removeParam('hamburgerMenu', {doNotCreateHistoryState: true});
});

StateURL.onParamChange('hamburgerMenu', function(value) {
	if (value === 'show') {
		showHamburgerMenu();
	} else {
		hideHamburgerMenu();
	}
});