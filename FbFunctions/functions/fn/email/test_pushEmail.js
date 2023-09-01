const pushEmail = require("./pushEmail.js");
const config = require("../../env.json");

const testMail = {
  name: "Tyler Aldrich",
  email: "ThisIsATestEmailAddress@666.com",
  message: {
    subject: "This is a test",
    phoneNumber: "[814]651-1772",
    message: "This is a text message, for your test Email.",
  },
};

const user = config.icloudUser;
const pass = config.icloudPass;
pushEmail(testMail, user, pass)
    .then(() => console.log("SENT SUCCESSFULLY, go check your email"))
    .catch((e) => console.error(`Something wrong happened.. \n --> ${e}`));
