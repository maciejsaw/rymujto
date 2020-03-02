function hideSimplyDropdowns() {
    $('[simply-select-dropdown-list]').isHidden();
}

function initSimplySelectDropdownButtons() {
    $.On('click', '[simply-select-dropdown-buton]', function() {
        var thisDropdown = $(this).closest('[simply-select-dropdown]');
        var dropdownList = thisDropdown.find('[simply-select-dropdown-list]');
        var allOtherDropdownLists = $('[simply-select-dropdown]').not(thisDropdown).find('[simply-select-dropdown-list]');
        allOtherDropdownLists.addClass('is-hidden');
        dropdownList.toggleClass('is-hidden');
        $('body').toggleClass('is-with-dropdown-open');
    });

    $.On('click', function(e) {
        //if clicked outside the dropdown button and content, close it
        if ($(event.target).closest("[simply-select-dropdown-buton]").length === 0 && $(event.target).closest('[simply-select-dropdown-list]').length === 0) {
            hideSimplyDropdowns();
        }
    });

    $('[simply-select-dropdown]').each(function() {
        var paramToChange = $(this).attr('simply-select-dropdown');

        //default state is the first from the dropdown chosen-values options
        var firstAvailableChoice = $(this).find('[chosen-value]').first().attr('chosen-value');
        State.setDefaultParam(paramToChange, firstAvailableChoice );

        State.onParamChange(paramToChange, function(value) {
            var relDropdown = $('[simply-select-dropdown="'+paramToChange+'"]');
            var chosenItem = relDropdown.find('[chosen-value="'+value+'"]');
            var otherNotChosenItems = relDropdown.find('[chosen-value]').not(chosenItem);
            chosenItem.removeClass('is-hidden');
            otherNotChosenItems.addClass('is-hidden');
            var selectedChoice = relDropdown.find('[choice-value="'+value+'"]').addClass('is-selected');
            var otherChoices = relDropdown.find('[choice-value]').not(selectedChoice);
            otherChoices.removeClass('is-selected');
        });
    });

    $.On('click', '[choice-value]', function() {
        var valueToSet = $(this).attr('choice-value');
        var paramToSet = $(this).closest('[simply-select-dropdown]').attr('simply-select-dropdown');
        State.setParam(paramToSet, valueToSet);
        $(this).closest('[simply-select-dropdown]').find('.select-dropdown__list.w-dropdown-list').removeClass('w--open');
        hideSimplyDropdowns();
    });
}

//Webflow dropdowns as select dropdown
//Each dropdown state is stored in a separate reactive local storage state


$.On('preloadingComplete', function() { //need to wait for all the ajax to load
    hideSimplyDropdowns();
    initSimplySelectDropdownButtons();
});
