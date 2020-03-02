//TODO refactor for simplicity

function initSimplyTooltipster(containerToInit) {
  containerToInit = containerToInit || 'body';

  var tooltipsterTrigger = 'custom';

  var tooltipsterTriggerOpen = {
    mouseenter: true,
    touchstart: true,
    tap: true,
    click: true
  };

  var tooltipsterTriggerClose = {
    mouseleave: true,
    scroll: true,
    tap: true
  };

  var getTooltipOptions = function(position, tooltipContent) {
    return {
      position: position,
      trigger: 'custom',
      triggerOpen: tooltipsterTriggerOpen,
      triggerClose: tooltipsterTriggerClose,
      hideOnClick: false,
      animation: 'fade',
      delay: 20,
      animationDuration: 150,
      maxWidth: 280,
      theme: 'tooltipster-borderless',
      restoration: 'current',
      content: tooltipContent
    };
  };

  $(containerToInit).not('.tooltipstered').find('[simply-tooltip]:not(.tooltipstered)').each(function() {
    var tooltipPositionFromAttr = $(this).attr('simply-tooltip');
    var tooltipContent = $(this).attr('simply-tooltip-content');
    $(this).tooltipster(getTooltipOptions(tooltipPositionFromAttr, tooltipContent));
  });
}

$.On('preloadingComplete', function() {
  initSimplyTooltipster();
});