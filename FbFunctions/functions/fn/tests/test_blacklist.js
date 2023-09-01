const axios = require("axios");

// Success-
const sendMessage = async () => {
  const formData = {
    email: "sus@test.com",
    name: "Test",
    subject: "Testing Blacklist functionality",
    message: "Chill, It's just a test bro",
  };

  try {
    const response = await axios.post(
        "https://us-central1-aldrich-dev-portfolio.cloudfunctions.net/sendMessage",
        formData,
    );
    console.log(`Message sent: ${response.data}`);
  } catch (e) {
    console.error(`Error sending message: ${e}`);
  }
};

for (let i = 10; i < 30; i++) {
  setTimeout(() => {
    sendMessage();
  }, i * 900);
}
