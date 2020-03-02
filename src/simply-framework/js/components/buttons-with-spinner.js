function showLoadingInButton(elm) {
	elm = $(elm);
	elm.addClass('is-grayed-out');
	elm.find('[simply-button-text-near-spinner]').addClass('is-with-spinner-shown');
	elm.parent().attr('is-inactive-with-preloader', 'true')
	.find('[simply-button-spinner-icon]').removeClass('is-hidden');
}

function hideLoadingInButton(elm) {
	elm = $(elm);
	elm.removeClass('is-grayed-out');
	elm.find('[simply-button-text-near-spinner]').removeClass('is-with-spinner-shown');
	elm.parent().removeAttr('is-inactive-with-preloader')
	.find('[simply-button-spinner-icon]').addClass('is-hidden');
}

function initButtonsWithSpinner() {
	$('[simply-button-with-spinner]').each(function() {
		var param = $(this).attr('simply-button-with-spinner');
		var valueThatShowsSpinner = $(this).attr('simply-show-spinner-when-param-equals');
		var thisButton = $(this);

		State.onChange(param, function(value) {
			if (value == valueThatShowsSpinner) {
				showLoadingInButton(thisButton);
			} else {
				hideLoadingInButton(thisButton);
			}
		});
	});

	$.On('click', '[is-inactive-with-preloader]', function(e) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		return false;
	});
}

$.On('preloadingComplete', function() {
	initButtonsWithSpinner();
});