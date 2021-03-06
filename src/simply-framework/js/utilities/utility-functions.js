function formatDecimalNumber(numberToFormat, decimalNumbers) {
  if (typeof decimalNumbers === 'undefined') {
    decimalNumbers = 2;
  }
  var number = parseFloat(numberToFormat);
  var formatted = (number.toFixed(decimalNumbers)).replace('.', ',');
  return formatted;
}

function stringToDecimal(stringToFormat) {
  var number = stringToFormat.replace(',', '.');
  number = parseFloat(number);
  return number;
}

function replaceComa(stringToFormat) {
  var cleaned = stringToFormat.replace(',', '.');
  return cleaned;
}

function getPeriodTextForPredictedCost(period) {
  var textsToReturn = {
    1: 'Płaciłbyś miesięcznie',
    2: 'Płaciłbyś co 2' + String.fromCharCode(160) + 'miesiące',
    4: 'Płaciłbyś co kwartał',
    12: 'Płaciłbyś rocznie'
  }
  return textsToReturn[period] || textsToReturn[1]
}

function replaceStatementToBoolean(statement) {
  var booleanValue = {
    'yes': true,
    'no': false
  }
  return booleanValue[statement]
}

function compareValues(currentValue, newValue) {
  if (!$.isNumeric(currentValue) || !$.isNumeric(newValue)) {
    return "cannot compare";
  }

  currentValue = currentValue * 1;
  newValue = newValue * 1;
  if ( currentValue == newValue ) {
    return "equal";
  }
  else if ( newValue > currentValue ) {
    return "new-is-larger";
  }
  else if ( newValue < currentValue ) {
    return "new-is-lower";
  }
}

function arrayToString(arrayToConvert) {
  if ($.isArray(arrayToConvert)) {
    return arrayToConvert.join(' ');
  } else {
    return '';
  }
}

//https://stackoverflow.com/questions/4597900/checking-something-isempty-in-javascript
function isEmpty(val) {

    // test results
    //---------------
    // []        true, empty array
    // {}        true, empty object
    // null      true
    // undefined true
    // ""        true, empty string
    // ''        true, empty string
    // 0         false, number
    // true      false, boolean
    // false     false, boolean
    // Date      false
    // function  false

        if (val === undefined)
        return true;

    if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
        return false;

    if (val == null || val.length === 0)        // null or 0 length array
        return true;

    if (typeof (val) == "object") {
        // empty object

        var r = true;

        for (var f in val)
            r = false;

        return r;
    }

    return false;
}

function isNotEmpty(val) {
  return !isEmpty(val);
}

$.On('click', '[action-go-back]', function() {
  window.history.back();
});

//setting proper with of fixed top bar to show scroll bar
function getWidthOfWrapperScrollbar() {
  var bodyWidth = $('body').outerWidth();
  var wrapperWidth = $('[js-page-wrapper]').outerWidth();
  var difference = bodyWidth - wrapperWidth;

  return difference;
}

function isNumeric(val) {
  return $.isNumeric(val);
}

function isNotNumeric(val) {
  return !isNumeric(val);
}