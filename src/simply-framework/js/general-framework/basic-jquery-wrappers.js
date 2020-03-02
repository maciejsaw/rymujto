
/* shorter version of addClass and removeClass */
(function( $ ) {
  $.fn.isHidden = function(customClass) {

    customClass = customClass || 'is-hidden';

    this.each(function() {
      $(this).addClass(customClass);
    });

    return this;
  };
}( jQuery ));

(function( $ ) {
  $.fn.isShown = function(customClass) {

    customClass = customClass || 'is-hidden';

    this.each(function() {
      $(this).removeClass(customClass);
    });

    return this;
  };
}( jQuery ));

/* Synonyms for above functions */
(function( $ ) {
  $.fn.isNotShown = $.fn.isHidden;
}( jQuery ));

(function( $ ) {
  $.fn.isNotHidden = $.fn.isShown;
}( jQuery ));


/* One line show or hide based on expression */
(function( $ ) {
  $.fn.isShownWhen = function(expression) {

    var thisInstance = this;

  if (!!expression) {
    thisInstance.each(function() {
      $(this).isShown();
    });
  } else {
    thisInstance.each(function() {
      $(this).isHidden();
    });
  }

    return this;
  };
}( jQuery ));

/* One line show or hide based on expression */
(function( $ ) {
  $.fn.addClassWhen = function(expression, classToAdd) {

    var thisInstance = this;

    if (!!expression) {
      thisInstance.each(function() {
        $(this).addClass(classToAdd);
      });
    } else {
      thisInstance.each(function() {
        $(this).removeClass(classToAdd);
      });
    }

    return this;
  };
}( jQuery ));

/* One line show or hide based on expression */
(function( $ ) {
  $.fn.removeClassWhen = function(expression, classToAdd) {

    var thisInstance = this;

    if (!!expression) {
      thisInstance.each(function() {
        $(this).removeClass(classToAdd);
      });
    } else {
      thisInstance.each(function() {
        $(this).addClass(classToAdd);
      });
    }

    return this;
  };
}( jQuery ));

/* Easier to write selecting by attribute */
(function( $ ) {
  $.elementWithAttr = function(attrName, attrValue) {
    if ($.isEmptyObject(attrValue)) {
      return $('['+attrName+']');
    } else {
      return $('['+attrName+'="'+attrValue+'"]');
    }
  };
}( jQuery ));

/* Easier to write document on and provides Namespacing for events */
(function( $ ) {
  $.On = function(event, selector, callbackFunction) {
    var returned = $(document).on(event+'.simplyFramework', selector, callbackFunction);
    return returned;
  };
}( jQuery ));