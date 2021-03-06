var On = {};

On.touchstartOrClick = function(selector, eventHandlerFunction) {
	$.On('click touchstart', selector, function(event) {

		var clickedElement = $(event.currentTarget);

		if (typeof eventHandlerFunction === 'function') {
			if (event.type === 'touchstart') {
			    $(document).off('click', selector);
		       	eventHandlerFunction(event);
		    	$.On('click', selector, function(event) {
		    		event.stopPropagation();
		    		event.preventDefault();
		    		return false;
		    	});
			} else {
				eventHandlerFunction(event);
			}
		} else {
			console.error('onTouchstartOrClick event handler is not a function');
		}
	});
};