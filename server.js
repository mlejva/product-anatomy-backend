// =============================================================================
// Algolia indexation node.js server
// =============================================================================

// To REINDEX DATABASE run:         database (--database database-ref) reindex

// To IMPORT EXISTING DATA run:     database (--database database-ref) import

// To CHANGE DATABASE TO LISTEN TO: database change database-ref


/* ----- Constants ----- */


const ALGOLIA_API_KEY = process.env.ENV_ALGOLIA_API_KEY; // TODO heroku config
const ALGOLIA_APP_ID = 'E6GMBD7AHH'; // TODO heroku config
const ALGOLIA_INDEX = 'products'; // TODO heroku config

const FIREBASE_DATABASE_REF = '/products';
var firebaseConfig = { // TODO heroku config
  apiKey: process.env.ENV_FIREBASE_API_KEY,
  authDomain: 'product-anatomy.firebaseapp.com',
  databaseURL: 'https://product-anatomy.firebaseio.com',
  storageBucket: 'product-anatomy.appspot.com'
};


/* ---------- */



/* ----- Initialization ----- */
var firebase = require('firebase');
var algoliasearch = require('algoliasearch');
var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
var index = client.initIndex(ALGOLIA_INDEX);

firebase.initializeApp(firebaseConfig);

var fb = firebase.database().ref(FIREBASE_DATABASE_REF);


// Console logs
console.log('==============\n');
console.log('Node.js server initialization complete');
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
    console.log(jfdjhfa);
    bla.hell();
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
