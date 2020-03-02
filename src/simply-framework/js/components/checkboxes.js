//This will bind all checkboxes with attribute [simply-checkbox] the Reactive Local Storage, so that we can update rest ot the page based on this state
//either on input or on focus out

$.On('preloadingComplete', function() { //need to wait for all the ajax to load

    //Each checkbox state is stored in reactivelocalstorage
    $.On('click', '[simply-checkbox]', function(event) {
    	var paramToChange = $(this).attr('simply-checkbox');
    	var valueToSet;
    	if (State.getParam(paramToChange) == 'true') {
    		valueToSet = 'false';
    	} else {
    		valueToSet = 'true';
    	}

    	State.setParam(paramToChange, valueToSet );
    });

    $('[simply-checkbox]').each(function() {
        var paramToChange = $(this).attr('simply-checkbox');

        //default state is the Webflow default state based on the class
        var $thisCheckmark = $(this).find('[simply-checkbox-checkmark]');

        State.onParamChange(paramToChange, function(value) {
            //fallback for weid autofill behaviour
            if (value !== "false" && value !== "true") {value = "false";}

            if (value == 'true') {
            	$thisCheckmark.addClass('is-checked').removeClass('is-unchecked');
            } else if (value == 'false') {
            	$thisCheckmark.removeClass('is-checked').addClass('is-unchecked');
            }
        });
    });

});






