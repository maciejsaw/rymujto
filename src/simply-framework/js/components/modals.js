//Elements with action-open-modal should show modals container and
// and show the respective modal modal
$.On('click', '[action-open-modal]', function(event) {
    var modalToLoad = $(this).attr("action-open-modal");
    StateURL.setParam('modalContent', modalToLoad);

    hideSimplyDropdowns();
});

$.On('click', '[action-close-modal="true"]', function(event) {
    StateURL.removeParam('modalContent');
});

function bindEscButtonToCloseModal() {
    $(document).one('keydown.modal', function(event) {
        if (event.which === 27) {
            StateURL.removeParam('modalContent');
        }
    });
}

function closeModal() {
    //deselectAll();
    $("[simply-modal-wrapper]").fadeOutAndHide(300);
    $('[modal-id]').addClass('hidden');
}

StateURL.onParamChange('modalContent', function(value) {
    if (typeof value != 'undefined') {
        var modalWrapper = $("[simply-modal-wrapper]");
        if (modalWrapper.hasClass('is-hidden')) {
            modalWrapper.showAndFadeIn(200, function() {
                $('[modal-id]').not('[modal-id="'+value+'"]').addClass('is-hidden');
                $('[modal-id="'+value+'"]').removeClass('is-hidden');
            });
        } else {
            $('[modal-id]').not('[modal-id="'+value+'"]').addClass('is-hidden');
            $('[modal-id="'+value+'"]').removeClass('is-hidden');
        }

        //esc button closes modal, binded only after modal was opened
        bindEscButtonToCloseModal();
    } else {
        closeModal();
    }
});


//modal generic action
$.On('click', '[action-show-modal]', function() {
    var modalContentToShow = $(this).attr('action-show-modal');
    StateURL.setParam('modalContent', modalContentToShow);
});