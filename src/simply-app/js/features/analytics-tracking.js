StateURL.onParamChange('subpage', function(value) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'Page view', {
      'event_category': 'Navigation',
      'event_label': value,
    });

    // if (value === "thank-you") {
    //   gtag('event', 'Reached thank you page', {
    //     'event_category': 'Navigation',
    //   });
    // }

    //TODO add changes to tracked pagepath for Single Page App
    //https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications
  }

  // if (typeof fbq !== 'undefined') {

  //   if (value === "thank-you") {
  //     fbq('track', 'Thank you');
  //   }

  // }
});

// StateURL.onParamChange('modalContent', function(value) {
//   if (typeof gtag !== 'undefined') {
//     if (value === 'product-details') {
//       gtag('event', 'Opened modal with energy product details', {
//         'event_category': 'Navigation',
//       });
//     }
//   }
// });