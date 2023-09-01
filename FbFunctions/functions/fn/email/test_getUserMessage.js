const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const getUserMessage = require("./getUserMessage.js");

const userId = "TestingTesting@123.com_174.104.43.23";

getUserMessage(userId)
    .then((msg) => console.log(msg))
    .catch((e) => console.error(`Error: ${e}`));
