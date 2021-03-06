// //prevent submitting forms by clicking enter
// $.On('preloadingComplete', function() {
// 	$('form').each(function() {
// 		$(this).on('submit', function (event){
// 			event.preventDefault();
// 		});
// 	});
// });

$.On('click', '[prevent-default]', function(event) {
	event.preventDefault();
});

$.On('click', '[stop-propagation]', function(event) {
	event.stopPropagation();
});

function showSpinnerInClickedButton(clickedButtonElm, actionAfter) {
	clickedButtonElm.closest('[js-selector="button-with-spinner"]').addClass('is-inactive-with-preloader')
	  .find('[js-selector="button-spinner-icon"]').removeClass('is-hidden');

	setTimeout(function() {
		clickedButtonElm.closest('[js-selector="button-with-spinner"]').removeClass('is-inactive-with-preloader')
		  .find('[js-selector="button-spinner-icon"]').addClass('is-hidden');

		actionAfter();
	}, 1500);
}