const jwt = require("jsonwebtoken");
require("dotenv").config();

var secretKey = process.env.SECRET_KEY;

const signPayload = (payload) => {
  var token = jwt.sign(payload, secretKey, { expiresIn: "2hrs" });
  return token;
};

const accessPayload = (token) => {
  var payload = jwt.verify(token, secretKey);
  return payload;
};

module.exports = { signPayload, accessPayload };
