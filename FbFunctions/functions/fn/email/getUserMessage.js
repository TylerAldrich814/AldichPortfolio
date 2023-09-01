const admin = require("firebase-admin");
const onLogOperation = require("../onLogOperation");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const getUserMessage = async (userId) => {
  const userMessageRef = admin
      .firestore()
      .collection("userMessages")
      .doc(userId);

  const userMessageDoc = await userMessageRef.get();

  if (!userMessageDoc.exists) {
    await onLogOperation("WARN", "User doesn't exist", userId);
    return null;
  }
  const userMessage = userMessageDoc.data();
  const name = userMessage.name;
  const email = userMessage.email;
  const messages = userMessage.messages;
  const lastMessage = messages[messages.length-1];

  return {
    name: name,
    email: email,
    message: lastMessage,
  };
};

module.exports = getUserMessage;
