//helpful shortcuts for shorter code

/* One line to show or hide element selected by attribute if its value equal to specific value */
function showOnlyElementsWithAttributeXMatchingY(attributeName, valueToMatch) {
  $('['+attributeName+']').each(function() {
    var attrVal = $(this).attr(attributeName);
    $(this).isShownWhen(attrVal === valueToMatch);
  });
}

/* One line to show or hide element selected by attribute if its value equal to specific value */
function addClassToElementsWithAttributeXMatchingY(attributeName, valueToMatch, classToAdd) {
  $('['+attributeName+']').each(function() {
    var attrVal = $(this).attr(attributeName);
    $(this).addClassWhen(attrVal === valueToMatch, classToAdd);
  });
}

/* Quick one line showing or hiding element depending on reactive local storage param value */
(function( $ ) {
  $.fn.onlyShowWhenReactiveLocalStorageParamEquals = function(paramName, valueToEqual) {

    var thisInstance = this;

    State.onParamChange(paramName, function(value) {
      thisInstance.each(function() {
        $(this).isShownWhen(value === valueToEqual);
      });
    });

    return this;
  };
}( jQuery ));

//easier to read syntax for attribute selectors
function elementWithAttr(attrName, attrValue) {
  if ($.isEmptyObject(attrValue)) {
    return '['+attrName+']';
  } else {
    return '['+attrName+'="'+attrValue+'"]';
  }
}

/* Synonyms for state management libraries */
(function( $ ) {
  $.State = function(storageType) {
    storageType = storageType || 'localStorage';

    if (storageType === 'localStorage') {
      return ReactiveLocalStorage;
    } else if (storageType.toLoweCase() === 'url') {
      return QueryStringRouter;
    } else if (storageType.toLoweCase() === 'session') {
      //TODO
    }
  };
}( jQuery ));

$(document).on('click', '[js-prevent-default]', function(e) {
  e.preventDefault();
});

$(document).on('click', '[js-stop-propagation]', function(e) {
  e.stopPropagation();
});
