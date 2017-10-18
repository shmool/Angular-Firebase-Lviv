const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function addUid(event) {
  const original = event.data.val();
  original.uid = event.auth.variable.uid;

  return event.data.adminRef.update(original);
}

exports.saveRec = functions.database.ref('/Lviv/{id}')
  .onWrite(event => {
    console.log(event);
    if (event.auth.admin) return;
    return addUid(event);
  });
