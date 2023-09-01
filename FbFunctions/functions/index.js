const admin = require("firebase-admin");
const functions = require("firebase-functions");
const onLogOperation = require("./fn/onLogOperation.js");
const onMessageReceived = require("./fn/onMessageReceived.js");
// const onUserMessageReceived = require("./fn/email/onUserMessageReceived.js");
// const onNewUserMessageReceived = require("./fn/onNewUserMessageReceived.js");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

// exports.onNewUserMessageReceived = functions
//     .https
//     .onRequest(onNewUserMessageReceived);
// onMessageReceived  -> HTTPS Request Function for when a user wants to
//                       send a message to me. This funciton will store
//                       the data under my Firestore userMessages/{userId}

exports.onMessageReceived = functions.https.onRequest(onMessageReceived);
// onUserMesg..       -> A Firestore trigger. For whenever
//                       'userMessages/{userId}' updates, this
//                       trigger is pulled, passing in the 'userId'
//                       tp 'sendEmail'.
// exports.onUserMessageReceived = onUserMessageReceived;
// onLogOperation      -> Firebase Firestore Error logging. Auto-deletion
//                 set to one month.
exports.onLogOperation = onLogOperation;
