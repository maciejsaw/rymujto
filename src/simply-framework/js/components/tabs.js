function initSimplySetTabs() {
	var bindedTabParams = {};

	$('[simply-tabs][simply-set-tab]').each(function() {
		var tabsGroup = $(this).attr('simply-tabs');
		var tabToActivate = $(this).attr('simply-set-tab');

		if (!bindedTabParams[tabsGroup]) {
			StateURL.onParamChange(tabsGroup, function(value) {
				if (typeof value != 'undefined') {
					$('[simply-tabs="'+tabsGroup+'"][simply-tab-content="'+value+'"]').removeClass('is-hidden');
					$('[simply-tabs="'+tabsGroup+'"][simply-tab-content]').not('[simply-tab-content="'+value+'"]').addClass('is-hidden');

					$('[simply-tabs="'+tabsGroup+'"][simply-set-tab]').not('[simply-set-tab="'+value+'"]').removeClass('is-current');
					$('[simply-tabs="'+tabsGroup+'"][simply-set-tab="'+value+'"]').addClass('is-current');
				}
			});
			bindedTabParams[tabsGroup] = true;
		}
	});

	$.On('click', '[simply-tabs][simply-set-tab]', function(event) {
		var clickedTab = $(this).attr('simply-set-tab');
		var clickedTabGroup = $(this).attr('simply-tabs');
		StateURL.setParam(clickedTabGroup, clickedTab, {doNotCreateHistoryState: true});
	});
}

$.On('preloadingComplete', function() {
	initSimplySetTabs();
});