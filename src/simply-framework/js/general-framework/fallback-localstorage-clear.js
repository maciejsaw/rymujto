(function() {

  try {
    // if twice in a row document preloading complete will not happen, we clear local storage
    var previousCounter = localStorage.getItem('fallback-local-storage-counter') || 0;
    var currentCounter = previousCounter + 1;
    localStorage.setItem('fallback-local-storage-counter', currentCounter);

    if (currentCounter > 2) {
      localStorage.clear();
      console.warn('Fallback clearing local storage...');    
    }

    $.On('preloadingComplete', function() {
      localStorage.setItem('fallback-local-storage-counter', 0);
    });

    //if last succesful document preloadingComplete happened more than specific time, we clear local storage
    var dateNow = Date.now();
    var previousTimestamp = localStorage.getItem('fallback-local-storage-timestamp') || dateNow;
    var currentTimestamp = dateNow;
    var timestampDifference = currentTimestamp - previousTimestamp;
    var timeToKeepLocalStorage = 259200000; //3 days

    if (timestampDifference > timeToKeepLocalStorage) {
      localStorage.clear();
      console.warn('Clearing old local storage...');  
    }

    $.On('preloadingComplete', function() {
      localStorage.setItem('fallback-local-storage-timestamp', currentTimestamp);
    });
  } catch (error) {
    console.error('Error while initialising local storage fallbacks... ');
    console.error(error);
  }
  
})();