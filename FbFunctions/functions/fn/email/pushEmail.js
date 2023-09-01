const nodeMailer = require("nodemailer");
const onLogOperation = require("../onLogOperation");

const nodeMailerTransporter = async (user, pass) => {
  if (user === null || pass === null) {
    console.error("USER AND PASS ARE REQUIRED");
    return null;
  }

  return nodeMailer.createTransport({
    host: "smtp.mail.me.com",
    port: 587,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  });
};

// exports.pushEmail = async function(userMessage) {
const pushEmail = async (userMessage, user, pass) => {
  const mailOptions = {
    from: `"${userMessage.email}" <Aldrich.ta.814@icloud.com>`,
    to: "TA@TylerAldrich.dev",
    subject: userMessage.message.subject,
    text: `
    You've received a new message from ${userMessage.name}

    Email: ${userMessage.email}
    Subject: ${userMessage.message.subject}`+
    (userMessage.message.phoneNumber ?
`\n    phoneNumber: ${userMessage.message.phoneNumber}` :
  "")+
`\n    Message:\n\t\t - ${userMessage.message.message}`,
  };
  const transporter = nodeMailerTransporter(user, pass);

  if (transporter === null) {
    await onLogOperation(
        "ERROR",
        "SMTP User and Password are required.",
        `${user} == null`,
    );
    throw new Error("TRANSPORTER === null");
  }

  console.log("ABOUT TO ATTEMPT TO SEND EMAIL");

  try {
    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.error(e);
  }
};

module.exports = pushEmail;
