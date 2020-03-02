//TODO use some real testing framework instead of silly console log

/*======================================
=            Test functions            =
======================================*/

State.setDefaultParam('test', 'a');
StateSession.setDefaultParam('test', 'b');
StateNonPersistent.setDefaultParam('test', 'c');

console.log( State.getParam('test') );
console.log( StateSession.getParam('test') );
console.log( StateNonPersistent.getParam('test') );

State.onChange('test', function(value) {
  console.log('Value changed for '+value);
});

StateSession.onChange('test', function(value) {
  console.log('Value changed for '+value);
});

StateNonPersistent.onChange('test', function(value) {
  console.log('Value changed for '+value);
});

State.setParam('test', 'a');
StateSession.setParam('test', 'b');
StateNonPersistent.setParam('test', 'c');
State.setParam('test', 'd');
StateSession.setParam('test', 'e');
StateNonPersistent.setParam('test', 'f');
State.toggleParam('test', 'd', false);
StateSession.toggleParam('test', 'e', false);
StateNonPersistent.toggleParam('test', 'f', false);

console.log( State.getAllParams() );
console.log( StateSession.getAllParams() );
console.log( StateNonPersistent.getAllParams() );

State.triggerAllParams();
StateSession.triggerAllParams();
StateNonPersistent.triggerAllParams();

console.log( State.getAllParams() );
console.log( StateSession.getAllParams() );
console.log( StateNonPersistent.getAllParams() );

State.remove('test');
StateSession.remove('test');
StateNonPersistent.remove('test');

console.log( State.getAllParams() );
console.log( StateSession.getAllParams() );
console.log( StateNonPersistent.getAllParams() );

State.clearAllButLeave('test');
StateSession.clearAllButLeave('test');
StateNonPersistent.clearAllButLeave('test');

State.clearStorage();
StateSession.clearStorage();
StateNonPersistent.clearStorage();

/*=====  End of Test functions  ======*/

/*=================================
=            Test code            =
=================================*/

StateNonPersistent.setParam('test-array', [{id: 1, name: "John"}]);
StateNonPersistent.appendToBeginningOfTheArray('test-array', {id: 2, name: "Alice"});
StateNonPersistent.appendToArray('test-array', {id: 3, name: "Cecil"});
StateNonPersistent.updateObjectInArray('test-array', {
	findObjectWithId: 2,
	propertyToUpdate: 'name',
	newValue: 'Beata',
});
console.log(StateNonPersistent.get('test-array'));
console.log(StateNonPersistent.findInArrayXObjectWithPropertyYMatchingZ('test-array', 'name', 'Beata'));
console.log(StateNonPersistent.findInArrayXObjectWithIdY('test-array', 1));
StateNonPersistent.removeElementFromArrayXWithIdY('test-array', 3);
console.log(StateNonPersistent.get('test-array'));

/*=====  End of Test code  ======*/

/*=======================================
=            URL State Params            =
=======================================*/
StateURL.setDefaultParam('test', 'foo');
StateURL.onChange('test', function(value) {
	console.log('Value changed to '+value);
});
StateURL.set('testURL', 'bar');
StateURL.set('testURL', 'te');
StateURL.remove('testURL');


/*=====  End of URL State Params  ======*/
