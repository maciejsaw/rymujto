/*=================================================================
=            ReactiveLocalStorage validation extension            =
=================================================================*/

State.registeredValidators = {};

State.setValidationRules = function(param, validationFunction) {
	State.registeredValidators[param] = validationFunction;
};

State.validateParam = function(paramToValidate, functionCallback) {
	var currentValue = State.getParam(paramToValidate);
	var validationResult = "";
	if (State.registeredValidators && State.registeredValidators[paramToValidate]) {
		validationResult = State.registeredValidators[paramToValidate](currentValue);
	} else {
		console.error('No validator registered for '+paramToValidate);
	}

	if (typeof functionCallback === 'function') {
		functionCallback(validationResult);
	}

	return validationResult;
};

function showErrorForElement(elm, validationResult) {
	if (typeof validationResult === 'undefined') {
		validationResult === "";
	}

	var errorMsg = "⚠ ⚠ ⚠"; //defaults to triangle exclamation
	var errorDiv = elm.parent().find('[js-selector="validation-error-msg"]');
	if (errorDiv.length === 0) {
		errorDiv = $('<div class="bem-error-text" js-selector="validation-error-msg"></div>');
	}

	var errorMsgFromElm = elm.attr('err-txt__'+validationResult);
	if (typeof errorMsgFromElm !== "undefined") {
		errorMsg = errorMsgFromElm;
	}

	errorDiv.text(errorMsg);
	elm.after(errorDiv);
	elm.removeClass('is-correct');
	elm.find('[validation-add-class]').removeClass('is-correct');
	elm.addClass('is-error');
	elm.find('[validation-add-class]').addClass('is-error');
	elm.attr('has-error', 'true');
}

function hideErrorForElement(elm) {
	var errorDiv = elm.parent().find('[js-selector="validation-error-msg"]');
	elm.addClass('is-correct');
	elm.find('[validation-add-class]').addClass('is-correct');
	elm.removeClass('is-error');
	elm.find('[validation-add-class]').removeClass('is-error');
	elm.removeAttr('has-error');
	errorDiv.remove();
}

function handleErrorForElement(elm, validationResult) {
	if (validationResult === 'good') {
		hideErrorForElement(elm);
	} else {
		showErrorForElement(elm, validationResult);
	}
}

//automatically searches for DOM elements that need to be validated and show error for them
//based on DOM attributes
State.validateElementChildren = function(elm, callbacksObject) {
  elm.find('[has-error]').removeAttr('has-error');

	elm.find('[simply-validate]').filter(':visible').each(function() {
		var relatedField = $(this);
		var paramToValidate = $(this).attr('simply-validate');
		State.validateParam(paramToValidate, function(validationResult) {
			handleErrorForElement(relatedField, validationResult);
		});
	});
	var numberOfErrors = elm.find('[has-error]').length;

	//var numberOfErrors = elm.find('[has-error]').length;
	if (numberOfErrors === 0) {
		if (callbacksObject && callbacksObject.onSuccess) {
			callbacksObject.onSuccess();
		}
	} else {
		if (callbacksObject && callbacksObject.onError) {
			callbacksObject.onError();
		}
	}
	//IDEA/TODO: validateElementChildren could return an array of errors
};

State.setDefaultParamAndValidationRules = function(param, options) {
	if (options && typeof options.default !== 'undefined') {
		State.setDefaultParam(param, options.default);
	}
	State.setValidationRules(param, options.validationFunction);
};

// validation on blur for elements with additional attribute validate-on-blur
// we will show errors only if usered focused the field at least once
// if you want to validate after each entered character, you need to use "update-on-input" attr
// for text inputs
$.On('preloadingComplete', function() {
	$.On('focus', '[simply-validate][validate-on-blur]:not([is-touched])', function() {

		var relatedInput = $(this);

		var relatedParam = $(this).attr('simply-validate');

  	relatedInput.attr('is-touched', 'true');

    relatedInput.on('blur', function() {
    	State.validateParam(relatedParam, function(validationResult) {
    		handleErrorForElement(relatedInput, validationResult);
    	});
    });

	});
});

// you can decide if you want to revalidate the field after it was changed by user
// just add attribute 'validate-on-click' -- better for radio buttons
$.On('preloadingComplete', function() {
	$.On('click', '[simply-validate][validate-on-click]:not([is-touched])', function() {
		var relatedParam = $(this).attr('simply-validate');
    	var relatedInput = $(this);

    	relatedInput.attr('is-touched', 'true');

    	State.validateParam(relatedParam, function(validationResult) {
    		handleErrorForElement(relatedInput, validationResult);
    	});

    	State.onParamChange(relatedParam, function(value) {
	    	State.validateParam(relatedParam, function(validationResult) {
	    		handleErrorForElement(relatedInput, validationResult);
	    	});
	    });

	});
});

// you can decide if you want to revalidate the field after it was changed by user
// just add attribute 'validate-on-change' -- better for select dropdowns
//TODO remove this and keep only one attribute validate-on-click
$.On('preloadingComplete', function() {
	$.On('click', '[simply-validate][validate-on-change]:not([is-touched])', function() {
		var relatedParam = $(this).attr('simply-validate');
	  	var relatedInput = $(this);

	  	relatedInput.attr('is-touched', 'true');

	  	State.onParamChange(relatedParam, function(value) {
	    	State.validateParam(relatedParam, function(validationResult) {
	    		handleErrorForElement(relatedInput, validationResult);
	    	});
	    });
	});
});


$.On('preloadingComplete', function() {
  $.On('click', 'input[simply-validate][has-error]', function() {
    var relatedParam = $(this).attr('simply-validate');
    var relatedInput = $(this);

    if (!relatedInput.attr('was-clicked-when-had-error')) {
    	relatedInput.on('input', function() {
    		State.setParam(relatedParam, relatedInput.val());
    		State.validateParam(relatedParam, function(validationResult) {
    		  handleErrorForElement(relatedInput, validationResult);
    		});
    	});

    	relatedInput.attr('was-clicked-when-had-error', 'true');
    }

  });
});

/*=====  End of ReactiveLocalStorage validation extension  ======*/


/* EXAMPLE

1. First register validators for each param separately

State.setValidationRules('registration-email', function(value) {
	if (value === "") {
		return 'required';
	} else {
		return 'good';
	}
});

State.setValidationRules('registration-password', function(value) {
	if (value === "") {
		return 'required';
	} else if (value.length < 8) {
		return 'too-short';
	} else {
		return 'good';
	}
});

2. When submitting form, you can use validateElementChildren thah will automatically
validate DOM elements that you marked with attribute "simply-validate". You should store error
messages in DOM attributes "err-txt__your-validation-result", since different fields can have indiviudal more contextual errors

function submitEmailRegistrationForm() {
	var thisForm = $('[js-selector="registration-email-form"]');
	State.validateElementChildren(thisForm, {
		onSuccess: function() {
			registerUser();
		},
		onError: function() {
			var firstError = $('[has-error]').first();
			$('.page-wrapper').scrollTo(firstError); //you have full control of what happens after error
		}
	});
}

/*
EXAMPLE 2: more flexible - manually check params and handle Errors for each element
function submitEmailRegistrationForm() {
	var thisForm = $('[js-selector="registration-email-form"]');

    State.validateParam('registration-email', function(validationResult) {
    	var relatedField = thisForm.find('[simply-validate="registration-email"]');

    	if (validationResult !== 'good') {
    		handleErrorForElement(relatedField, validationResult);
			return;
    	}

    	registerUser();
    });

}
*/