import axios from 'axios';

const sendMessage = async (formData) => {
  const sendMessageFbFunc  = "https://us-central1-tyleraldrichdev.cloudfunctions.net/onMessageReceived"

  try {
    const response = await axios.post(
      sendMessageFbFunc,
      formData
    );
    console.log(`Message sent: ${response.data}`)
    return response.data;
  } catch (e) {
    console.error(`Error sending message to Firebase Function ${e}`)
  }
};

export default sendMessage;
