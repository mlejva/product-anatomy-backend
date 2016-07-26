/*
// Get all data from Firebase
fb.on('value', reindexIndex);

function reindexIndex(dataSnapshot) {
  // Array of objects to index
  var objectsToIndex = [];


// Create a temp index
var tempIndexName = 'contacts_temp';
var tempIndex = client.initIndex(tempIndexName);

// Get all objects
var values = dataSnapshot.val();

// Process each Firebase object
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
    throw err;
  }

  // Overwrite main index with temp index
  client.moveIndex(tempIndexName, 'contacts', function(err, content) {
    if (err) {
      throw err;
    }

    console.log('Firebase<>Algolia reimport done');
  });
});
}

*/
