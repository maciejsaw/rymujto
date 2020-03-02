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