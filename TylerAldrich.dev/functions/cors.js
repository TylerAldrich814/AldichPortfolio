const cors = require("cors");

const allowedOrigins = [
  "http://192.168.1.69:3000", // Macbook Pro
  "https://tyleraldrichdev-portfolio.uk.r.appspot.com/", // Staging
  "https://tyleraldrich.dev", // Deloyed
  "https://www.tyleraldrich.dev", // Deloyed
];

module.exports = cors({
  // origin: allowedOrigins,
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Now Allowed by CORS"));
    }
  },
  methods: "GET,PUT,POST",
  credentials: true,
  optionsSuccessStatus: 204,
});
