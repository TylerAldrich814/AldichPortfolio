const fs = require("firebase-admin");
const {FieldValue} = require("firebase-admin/firestore");
const cors = require("./cors.js");
const {logger} = require("firebase-functions");
const nodeMailer = require("nodemailer");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated, onDocumentUpdated} = require("firebase-functions/v2/firestore");

fs.initializeApp();
const db = fs.firestore();

/*
  * onMessageReceived - an HTTP request function. When a user submits a Message
  *   on www.TylerAldrich.dev/contact, the data will be sent here, and
  *   updated within "userMessages/{userId}".
  * */
exports.onMessageReceived = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const {
        name,
        email,
        subject,
        message,
        phoneNumber = null,
      } = req.body;

      const userRef = db
          .collection("userMessages")
          .doc(`${email}_${req.ip}`);
      const userDoc = await userRef.get();
      logger.log("TEST: GOT userRef SUCCESSFULLY ");

      const currentTime = new Date().getTime();
      const oneDayAgo = currentTime - 24 * 3.6 * 1e6;

      const newMsg = {
        subject,
        message,
        timeSent: currentTime,
      };
      if (phoneNumber !== null) {
        newMsg["phoneNumber"] = phoneNumber;
      }

      if (userDoc.exists) {
        logger.log("TEST: AFTER userDoc.Exists, ");
        const recentMsgs = userDoc.data().messages?.filter(
            (msg) => msg.timeSent > oneDayAgo,
        );

        if (recentMsgs.length > 10) {
          logger.warn(
              "processMessage",
              "User has sent more than 10 message in the past 25 hours.",
          );
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

        logger.log("TEST: BEFORE userRef.update({})");
        try {
          await userRef.update({
            messages: FieldValue.arrayUnion(newMsg),
          });
        } catch (e) {
          logger.error("onMessageReceived", `FAILED TO UPDATE userId WITH NEW MESSAGE ${e}`);
          res.code(400).send(`ERROR: FAILED TO UPDATE USER.MESSAGES WITH NEW MESSAGE: ${e}`);
          return;
        }
      } else {
        await userRef.set({
          name: name,
          email: email,
          messages: [newMsg],
        });
      }

      logger.info(
          "processMessage",
          `A New message has been processed, send by "${name}"`,
      );

      logger.info("onMessageReceived", "SUCCESSFULLY STORED USER SUBMITTED MESSAGE!");
      res.status(200).send("Message sent successfully.");
    } catch (e) {
      logger.error("onMessageReceived", "FAILED TO STORE USER SUBMITTED MESSAGE!");
      res.status(400).send(`ERROR: OCCURRED WHILE SAVING NEW MESSAGE: ${e}`);
    }
  });
});

const sendEmail = async (name, email, message) => {
  const ICLOUD_ID = process.env.ICLOUD_ID;
  const ICLOUD_PASS = process.env.ICLOUD_PASS;

  const transporter = nodeMailer.createTransport({
    host: "smtp.mail.me.com",
    port: 587,
    secure: false,
    auth: {
      user: ICLOUD_ID,
      pass: ICLOUD_PASS,
    },
  });
  if (transporter === null || transporter === undefined) {
    logger.error("sendEmail", "FAILED TO CREATE NODEMAILER TRANSPORTER");
    return;
  }

  const mailOptions = {
    from: `"${email}" <Aldrich.ta.814@icloud.com>`,
    to: "TA@TylerAldrich.dev",
    subject: message.subject,
    text: `
\t\tFrom: ${name}
\t\tEmail: ${email}` +
    (message.phoneNumber || message.phoneNumber.length != 0 ?
`\t\tPhonenumber: ${message.phoneNumber}` :
""
    )+
`\t\tMessage:\n\t\t\t - ${message.message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info("sendMail", "SUCCESSFULLY SENT NEW EMAIL");
  } catch (e) {
    logger.error("sendMail", "ERROR WHEN ATTEMPTING TO SEND EMAIL: ${e}");
  }
  return;
};

/*
  * onFirstUserMessage - When a new "userMessage/{userId}" has been created,
  *   This specific action will trigger 'onFirstUserMessage', which doesn't
  *   test for before vs after. Simply takes the data, and pushes it to
  *   'sendEmail'.
  * */
exports.onFirstUserMessage = onDocumentCreated(
    "userMessages/{userId}",
    async (event) => {
      const snapshot = event.data;
      if (!snapshot) {
        logger.log("WARN", "onFirstUserMessage", "NO DATA ASSOCIATED WITH THIS EVENT.");
        return;
      }
      const data = snapshot.data();

      const name = data.name;
      const email = data.email;
      const message = data.messages[0];

      try {
        await sendEmail(name, email, message);
        logger.log("INFO", "onUserMessageUpdate->sendEmail", "EMAIL SENT SUCCESSFULLY");
      } catch (e) {
        logger.error(
            "onFirstUserMessage->sendEmail",
            "ERROR OCCURRED WHILST SENDING A NEW MESSAGE TO YOUR EMAIL: ${e}",
        );
      }
    },
);

/*
  * onNewUserMessage - When an update occures within "userMesssage/{userId}",
  *   caused this trigger to fire. Tests before vs after to make sure there
  *   is a new message. Conjures the data and sends it off to 'sendEmail'.
  * */
exports.onNewUserMessage = onDocumentUpdated(
    "userMessages/{userId}",
    async (event) => {
      const snapshot = event.data;
      if (!snapshot) {
        logger.warn("onUserMessageUpdate", "NO DATA ASSOCIATED WITH THIS EVENT.");
        return;
      }
      const before = event.data.before.data();
      const after = event.data.after.data();

      if (after.messages.length <= before.messages.length) {
        logger.warn("onUserMessageUpdate", "THERE ARE NO NEW MESSAGES");
        return;
      }

      const name = after.name;
      const email = after.email;
      const message = after.messages[after.messages.length-1];

      try {
        await sendEmail(name, email, message);
        logger.info("onUserMessageUpdate->sendEmail", "EMAIL SENT SUCCESSFULLY");
      } catch (e) {
        logger.error(
            "onUserMessageUpdate->sendEmail",
            "ERROR OCCURRED WHILST SENDING A NEW MESSAGE TO YOUR EMAIL: ${e}",
        );
      }
    },
);
