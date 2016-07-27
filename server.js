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
var newItems = false;

// Console logs
console.log('==============\n');
console.log('Node.js server\n');
console.log('==============\n');
console.log('INITIALIZATION COMPLETE\n');
console.log('Listening to changes:\n');
/* ---------- */


/* ----- Listen for changes to Firebase data ----- */

// Firebase event listeners
fb.on('child_added', addOrUpdateObject);
fb.on('child_changed', addOrUpdateObject);
fb.on('child_removed', removeIndex);

fb.once('value', function(dataSnapshot) {
  console.log('Initial data indexation skipped.');
  newItems = true;
);

// Event functions
function addOrUpdateObject(dataSnapshot) {
  if(!newItems) return; // Initial re-indexation cancelation

  // Get Firebase object
  var firebaseObject = dataSnapshot.val();
  console.log("initial child_added problem");
  // Specify Algolia's objectID using the Firebase object key
  firebaseObject.objectID = dataSnapshot.key;

  // Add or update object
  index.saveObject(firebaseObject, function(err, content) {
    if (err) {
      throw err;
    }
  });
}

function removeIndex(dataSnapshot) {
  // Get Algolia's objectID from the Firebase object key
  var objectID = dataSnapshot.key;

  // Remove the object from Algolia
  index.deleteObject(objectID, function(err, content) {
    if (err) {
      throw err;
    }
  });
}
/* ---------- */
