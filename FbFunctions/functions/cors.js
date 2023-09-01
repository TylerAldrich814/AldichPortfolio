const allowedOrigins = [
  "http://192.168.1.69:3000", // Macbook Pro
  "https://tyleraldrichdev-portfolio.uk.r.appspot.com/", // Staging
  "https://tyleraldrich.dev", // Deloyed
  "https://www.tyleraldrich.dev", // Deloyed
];

const functionCors = require("cors")({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not Allows by CORS"));
    }
  },
});

module.exports = functionCors;
