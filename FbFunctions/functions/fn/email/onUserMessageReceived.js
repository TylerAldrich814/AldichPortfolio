const functions = require("firebase-functions");
const onLogOperation = require("../onLogOperation.js");
const getUserMessage = require("./getUserMessage.js");
const pushEmail = require("./pushEmail.js");

const onUserMessageCreated = functions.firestore
    .document("userMessages/{userId}")
    .onUpdate(async (_, ctx) => {
      const user = functions.config().icloud.id;
      const pass = functions.config().icloud.pass;

      const userId = ctx.params.userId;
      const userMessage = await getUserMessage(userId);

      onLogOperation(
          "OK",
          "onUserMessageReceived Tiggered",
          `UserID: ${userId}`,
      );

      try {
        await pushEmail(userMessage, user, pass);
        onLogOperation("OK", "sendEmail Successfull", "");
      } catch (e) {
        onLogOperation("ERROR", "sendEmail FAILED:", `ERRROR: ${e}`);
      }
    });

module.exports = {
  onUserMessageCreated,
};
