$.On('click', '[action-collapse-next-div]', function() {
	$(this).next().toggleClass('is-hidden');
	$(this).find('[icon-to-rotate-when-expanding]').toggleClass('is-expanded');
});

$.On('click', '[action-show-next-section-and-hide-button]', function() {
	$(this).next().toggleClass('is-hidden');
	$(this).addClass('is-hidden');
});