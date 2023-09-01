const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

// Firestore Error Logger
const onLogOperation = async (severity, subject, error) => {
  const time = new Date().getTime();
  const entry = `${time}_${severity}`;

  const onLogOperationRef = admin
      .firestore()
      .collection("functionLogOperations")
      .doc(entry);

  const newError = {
    subject: subject,
    error: error,
    time: time,
  };

  return await onLogOperationRef.set(newError);
};

module.exports = onLogOperation;
