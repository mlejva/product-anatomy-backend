// =============================================================================
// Algolia indexation node.js server
// =============================================================================

// To REINDEX DATABASE run:         database (--database database-ref) reindex

// To IMPORT EXISTING DATA run:     database (--database database-ref) import

// To CHANGE DATABASE TO LISTEN TO: database change database-ref


/* ----- Constants ----- */
var firebaseConfig = { // TODO heroku config
  apiKey: 'AIzaSyBJf4MX7uWsGQfoleAnoj7T2vg5boS1FUs',
  authDomain: 'product-anatomy.firebaseapp.com',
  databaseURL: 'https://product-anatomy.firebaseio.com',
  storageBucket: 'product-anatomy.appspot.com'
};

const DATABASE_REF = '/products';
const ALGOLIA_API_KEY = '4df563526d2a6c5f0adbc0273beb3427'; // TODO heroku config
const ALGOLIA_APP_ID = 'E6GMBD7AHH'; // TODO heroku config
const ALGOLIA_INDEX = 'products'; // TODO heroku config
/* ---------- */



/* ----- Initialization ----- */
var firebase = require('firebase');
var algoliasearch = require('algoliasearch');
var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
var index = client.initIndex(ALGOLIA_INDEX);

firebase.initializeApp(firebaseConfig);

var fb = firebase.database().ref(DATABASE_REF);


// Console logs
console.log('==============\n');
console.log('Node.js server initialization complete\n');
console.log('==============\n');
console.log('Listening to changes:');
/* ---------- */


/* ----- Listen for changes to Firebase data ----- */

// Firebase event listeners
fb.on('child_added', addOrUpdateObject);
fb.on('child_changed', addOrUpdateObject);
fb.on('child_removed', removeIndex);


// Event functions
function addOrUpdateObject(dataSnapshot) {
  // Get Firebase object
  var firebaseObject = dataSnapshot.val();
  console.log('On Event: Child added or changed');

  // Specify Algolia's objectID using the Firebase object key
  firebaseObject.objectID = dataSnapshot.key;

  // Add or update object
  index.saveObject(firebaseObject, function(err, content) {
    if (err) {
      throw err;
    }
    console.log('Firebase<>Algolia object saved');
  });
}

function removeIndex(dataSnapshot) {
  // Get Algolia's objectID from the Firebase object key
  var objectID = dataSnapshot.key;
  console.log('On Event: Child removed');

  // Remove the object from Algolia
  index.deleteObject(objectID, function(err, content) {
    if (err) {
      throw err;
    }

    console.log('Firebase<>Algolia object deleted');
  });
}
/* ---------- */
