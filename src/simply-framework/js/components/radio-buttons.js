//Each checkbox state is stored in reactivelocalstorage
$.On('click', '[simply-radio-buttons] [simply-radio-value]', function(event) {
    var paramToChange = $(this).closest('[simply-radio-buttons]').attr('simply-radio-buttons');
    var valueToSet = $(this).attr('simply-radio-value');
    State.setParam(paramToChange, valueToSet );
});

$.On('preloadingComplete', function() { //need to wait for all the ajax to load
    $('[simply-radio-buttons]').each(function() {
        var paramToChange = $(this).attr('simply-radio-buttons');

        State.onParamChange(paramToChange, function(value) {
            var chosenItem = $('[simply-radio-buttons="'+paramToChange+'"]').find('[simply-radio-value="'+value+'"]');
            var otherNotChosenItems = $('[simply-radio-buttons="'+paramToChange+'"]').find('[simply-radio-value]').not(chosenItem);
            chosenItem.addClass('is-selected');
            chosenItem.find('[simply-radio-icon]').removeClass('is-hidden');
            otherNotChosenItems.removeClass('is-selected');
            otherNotChosenItems.find('[simply-radio-icon]').addClass('is-hidden');
        });
    });
});