/* ----- Constants ----- */
const ALGOLIA_API_KEY = process.env.ENV_ALGOLIA_API_KEY;
const ALGOLIA_APP_ID = 'E6GMBD7AHH';
const ALGOLIA_INDEX = 'products';

const FIREBASE_DATABASE_REF = '/products';
var firebaseConfig = {
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

var isNewItem = false;

console.log('Initialization complete');
/* ---------- */



/* ----- Listen for changes to Firebase data ----- */
// Firebase event listeners
fb.on('child_added', addOrUpdateObject);
fb.on('child_changed', addOrUpdateObject);
fb.on('child_removed', removeIndex);

// Load the firebase database once on start to prevent reindex of existing data at algolia
fb.once('value', function(dataSnapshot) {
  console.log('Initial data indexation skipped');
  isNewItem = true;
});

// Event functions
function addOrUpdateObject(dataSnapshot) {
  // Initial re-index cancelation
  if(isNewItem)
  {
    // Get Firebase object
    var firebaseObject = dataSnapshot.val();
    // Specify Algolia's objectID using the Firebase object key
    firebaseObject.objectID = dataSnapshot.key;

    // Add or update object
    index.saveObject(firebaseObject, function(err, content) {
      if (err) {
        console.log('Error: cannot save/update object in Algolia\n' + err);
      }
    });
  }
}

function removeIndex(dataSnapshot) {
  // Get Algolia's objectID from the Firebase object key
  var objectID = dataSnapshot.key;

  // Remove the object from Algolia
  index.deleteObject(objectID, function(err, content) {
    if (err) {
      console.log('Error: cannot delete object from Algolia\n' + err);
    }
  });
}
/* ---------- */
