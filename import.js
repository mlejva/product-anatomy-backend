/*
// Connect to our firebase contacts data
var fb = firebase.database().ref('/contacts').once('value').then(function(snapshot) {

  console.log('Taham data');
  console.log('==============');
  console.log(snapshot.val());
  console.log('==============');
  // Array of data to index
  var objectsToIndex = [];

  // Get all objects
  var values = snapshot.val();

  // Process each Firebase ojbect
  for (var key in values) {
    if (values.hasOwnProperty(key)) {
      // Get current Firebase object
      var firebaseObject = values[key];

      // Specify Algolia's objectID using the Firebase object key
      firebaseObject.objectID = key;

      // Add object for indexing
      objectsToIndex.push(firebaseObject);
    }
  }

  // Add or update new objects
  index.saveObjects(objectsToIndex, function(err, content) {
    if (err) {
      console.log(err);
      throw err;
    }

    console.log('Firebase<>Algolia import done');
  });
});
*/
