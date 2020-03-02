//This will bind all the input fields for the Reactive Local Storage, so that we can update rest ot the page based on this state
//either on input or on focus out

$.On('blur', '[simply-text-input]', function(event) {
    var thisAttr = $(this).attr('simply-text-input');
    State.setParam(thisAttr, $(this).val() );
});

$.On('input', '[simply-text-input][update-on-input]', function(event) {
    var thisAttr = $(this).attr('simply-text-input');
    var thisInputValue = $(this).val();
    if (typeof thisInputValue !== 'undefined' && event.target.validity.valid) {
        State.setParam(thisAttr, $(this).val() );
    }
});

$.On('preloadingComplete', function() { //need to wait for all the ajax to load

    //for each input field existing in the html we check if there's a matching state
    $('[simply-text-input]').each(function() {
        var paramToChange = $(this).attr('simply-text-input');

        State.onParamChange(paramToChange, function(value) {
            $('[simply-text-input="'+paramToChange+'"]').val(value);
        });
    });

});