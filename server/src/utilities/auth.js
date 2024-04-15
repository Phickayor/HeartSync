const jwt = require("jsonwebtoken");
require("dotenv").config();

var secretKey = process.env.SECRET_KEY;

const signPayload = (payload,duration) => {
  var token = jwt.sign(payload, secretKey, { expiresIn: duration });
  return token;
};

const accessPayload = (token) => {
  var payload = jwt.verify(token, secretKey); 
  return payload;
};

module.exports = { signPayload, accessPayload };
