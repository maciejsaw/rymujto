function fillBemStars($widget, value) {
	$widget.each(function() {
		stars = $(this).find('[bem-star]');

		if (isNotEmpty(value)) {
			starsToFill = stars.slice(0, value);
			starsToEmpty = stars.slice(value, 10);
			starsToFill.each(function() {
				$(this).find('[bem-star-pic]').addClass('is-filled');
			});
			starsToEmpty.each(function() {
				$(this).find('[bem-star-pic]').removeClass('is-filled');
			});
		}
	});
}

$.On('mouseenter touchstart', '[bem-star]', function(event) {
	var param = $(this).closest('[action-bem-stars]').attr('action-bem-stars');
	var valueToSet = $(this).attr('bem-star');
	State.set(param+"__mouseover", valueToSet);
	State.retriggerOnParamChange(param+"__mouseover");
});

$.On('mouseleave', '[action-bem-stars]', function(event) {
	var param = $(this).attr('action-bem-stars');
	State.retriggerOnParamChange(param);
});

$.On('click touchend', '[bem-star]', function(event) {
	var param = $(this).closest('[action-bem-stars]').attr('action-bem-stars');
	var valueToSet = $(this).attr('bem-star');
	State.set(param, valueToSet);
});

$.On('preloadingComplete', function() {
	$('[action-bem-stars]').each(function() {

		var thisWidget = $(this);
		var param = thisWidget.attr('action-bem-stars');

		State.remove(param+"__mouseover");
		State.onChange(param+"__mouseover", function(value) {
			fillBemStars(thisWidget, value);
		});

		State.setDefault(param, 0);
		State.onChange(param, function(value) {
			fillBemStars(thisWidget, value);
		});
	});

});