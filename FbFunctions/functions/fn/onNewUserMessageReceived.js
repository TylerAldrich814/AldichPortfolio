const admin = require("firebase-admin");
const functions = require("firebase-functions");
const cors = require("../cors.js");
const onLogOperation = require("./onLogOperation.js");
const pushEmail = require("./email/pushEmail.js");

/**
  * @param {object} req -> HTML Request sent to the sever
  * @param {object} res -> Our Response back to the client
  */
async function processMessage(req, res) {
  const {name, email, subject, message, phoneNumber = null} = req.body;

  const userRef = admin
      .firestore()
      .collection("userMessages")
      .doc(`${email}_${req.ip}`);
  const userDoc = await userRef.get();

  const currentTime = new Date().getTime();
  const oneDayAgo = currentTime - 24 * 3.6 * 1e6;

  const newMessage = {
    subject,
    message,
    timeSent: currentTime,
  };
  if (phoneNumber !== null) {
    newMessage["phoneNumber"] = phoneNumber;
  }

  // Check how many messages we've received in the past 24hours
  if (userDoc.exists) {
    const recentMessages = userDoc.data().messages?.filter(
        (msg) => msg.timeSent > oneDayAgo);

    if (recentMessages.length >= 20) {
      res.status(429).send(`
        I'm sorry but You've exceeded the maximum
        number of messages for today.
        I Kind of need to keep my database usage low..
        If your message is important,
        then please get ahold of me via email.
        Sorry for any inconvenience!
      `);
      return;
    }

    await userRef.update({
      messages: admin.firestore.FieldValue.arrayUnion(newMessage),
    });
  } else {
    await userRef.set({
      name: name,
      email: email,
      messages: [newMessage],
    });
  }

  newMessage["email"] = email;
  newMessage["name"] = name;

  return newMessage;
}
/**
  * @param {object} req -> HTML Request sent to the sever
  * @param {object} res -> Our Response back to the client
  */
async function isUserBlackListed(req, res) {
  const blackListRef = admin
      .firestore()
      .collection("blackList")
      .doc(req.ip);
  const blackList = await blackListRef.get();

  const currentTime = new Date().getTime();
  // User's first message. Push time and return true
  if (!blackList.exists) {
    await blackListRef.set(
        {
          recentTime: currentTime,
          strike: 1,
        },
        {merge: true},
    );
    return true;
  }
  const blackListData = blackList.data();

  if (blackListData.blocked) {
    res.status(401)
        .send("You're blacklisted. Please contact me via email.");
    return false;
  }
  const strikeLimit = 10;
  const timeLimitBetweenMsgs = 2000; // 2000ms

  const currentStrikeCount = blackListData.strike;
  if (currentStrikeCount >= strikeLimit) {
    res.status(403).send(`
      IP Is blacklisted. If you feel you should be taken
      off the blacklist, then please contact me via email.
      `);
    return false;
  }

  const previousTime = await blackListData.recentTime;
  const diff = currentTime - previousTime;

  let increment = 1;
  if (diff <= timeLimitBetweenMsgs) {
    if (blackListData.strike + 1 === strikeLimit) {
      await blackListRef.set(
          {
            blocked: true,
            strike: admin.firestore.FieldValue.increment(increment),
            recentTime: currentTime,
          },
          {merge: true},
      );
      res.status(401).send(`
        You've been blacklisted due to too many message requests.
        Please contact me via email.
      `);
      return false;
    }
  } else {
    increment = blackListData.strike > 0 ? -1 : 0;
  }

  await blackListRef.set(
      {
        recentTime: currentTime,
        strike: admin.firestore.FieldValue.increment(increment),
      },
      {merge: true},
  );
  return true;
}

const onNewUserMessageReceived = async (req, res) => {
  cors(req, res, async () => {
    try {
      if (!(await isUserBlackListed(req, res))) {
        return await onLogOperation(
            "WARN",
            "Blocked User Detected",
            `${req.body.email}_${req.ip}`,
        ); // User is on the naughty list.
      }
      // Store Message on Firebase
      const message = await processMessage(req, res);
      await onLogOperation("OK", "New User Message created", "");

      // Create & Send email to Myself
      const user = functions.config().icloud.id;
      const pass = functions.config().icloud.pass;
      await pushEmail(message, user, pass);
      await onLogOperation("OK", "New Email Sent", "");
      res.status(200).send({status: "success"});
    } catch (e) {
      await onLogOperation("ERROR", "onNewUserMessageReceived FAILED", e);
      res.status(500).send({status: "failure", error: e.message});
    }
  });
};

module.exports = onNewUserMessageReceived;
