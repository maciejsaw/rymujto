function ReactiveLocalStorageOnParamChangeShowElementsOnlyWhenParamXEqualsY(param, paramValue) {
	State.onParamChange(param, function(value) {
		if (value === paramValue) {
		    $('[show-when-'+param+']').not('[show-when-'+param+'='+paramValue+']').addClass('is-hidden');
		    $('[show-when-'+param+'='+paramValue+']').removeClass('is-hidden');
		} else {
			$('[show-when-'+param+']').not('[show-when-'+param+'='+paramValue+']').addClass('is-hidden');
		}
	});
}

function ReactiveLocalStorageDependVisibilityOnParam(paramName) {
	State.onParamChange(paramName, function(value) {
		//TODO refactor needed
		$('[depends-on-param="'+paramName+'"]').not('[action-show-when-param-equals="'+value+'"]').not('[action-hide-when-param-equals]').not('[action-show-when-param-not-equals]').addClass('is-hidden');
		$('[depends-on-param="'+paramName+'"]').filter('[action-show-when-param-equals="'+value+'"]').removeClass('is-hidden');
		$('[depends-on-param="'+paramName+'"]').filter('[action-show-when-param-not-equals]').each(function() {
			var paramToCompare = $(this).attr('action-show-when-param-not-equals');
			if (paramToCompare !== value && typeof value !== 'undefined') {
				$(this).removeClass('is-hidden');
			} else if (typeof value !== 'undefined') {
				$(this).addClass('is-hidden');
			}
		});
	});
}

function ReactiveLocalStorageHideWhenParamEquals(paramName) {
	State.onParamChange(paramName, function(value) {
		$('[depends-on-param="'+paramName+'"]').not('[action-hide-when-param-equals="'+value+'"]').not('[action-show-when-param-equals]').not('[action-show-when-param-not-equals]').removeClass('is-hidden');
		$('[depends-on-param="'+paramName+'"]').filter('[action-hide-when-param-equals="'+value+'"]').addClass('is-hidden');
	});
}


function ReactiveLocalStorageHideIfParamNotUndefined(paramName) {
	State.onParamChange(paramName, function(value) {
		if ( (typeof value !== 'undefined') || (value !== 'not-selected') ) {
			$('[depends-on-param="'+paramName+'"]').filter('[action-hide-when-not-undefined]').addClass('is-hidden');
		} else {
			$('[depends-on-param="'+paramName+'"]').filter('[action-hide-when-not-undefined]').removeClass('is-hidden');
		}
	});
}

function ReactiveLocalStorageShowIfParamUndefined(paramName) {
	State.onParamChange(paramName, function(value) {
		if ( (typeof value === 'undefined') || (value === 'not-selected') ) {
			$('[depends-on-param="'+paramName+'"]').filter('[action-show-when-undefined]').removeClass('is-hidden');
		} else {
			$('[depends-on-param="'+paramName+'"]').filter('[action-show-when-undefined]').addClass('is-hidden');
		}
	});
}

function ReactiveLocalStorageHideIfParamUndefined(paramName) {
	State.onParamChange(paramName, function(value) {
		if ( (typeof value === 'undefined') || (value === 'not-selected') ) {
			$('[depends-on-param="'+paramName+'"]').filter('[action-hide-when-undefined]').addClass('is-hidden');
		} else {
			$('[depends-on-param="'+paramName+'"]').filter('[action-hide-when-undefined]').removeClass('is-hidden');
		}
	});
}

$.On('preloadingComplete', function() {
	$('[depends-on-param]').each(function() {
		var paramToDependOn = $(this).attr('depends-on-param');
		ReactiveLocalStorageDependVisibilityOnParam(paramToDependOn);
		ReactiveLocalStorageHideWhenParamEquals(paramToDependOn);
		ReactiveLocalStorageHideIfParamNotUndefined(paramToDependOn);
		ReactiveLocalStorageShowIfParamUndefined(paramToDependOn);
		ReactiveLocalStorageHideIfParamUndefined(paramToDependOn);
	});

	$('[is-hidden-on-load]').isHidden();
	$('[add-class-on-load]').each(function() {
		var classToAdd = $(this).attr('add-class-on-load');
		$(this).addClass(classToAdd);
	});
	$('[is-hidden-on-load]').removeAttr('is-hidden-on-load').attr('was-hidden-on-load', 'true');
});