const jwt = require("jsonwebtoken");
require("dotenv").config();

let secretKey = process.env.SECRET_KEY;

const signPayload = (payload, duration) => {
  let token = jwt.sign(payload, secretKey, { expiresIn: duration });
  return token;
};

const accessPayload = (token) => {
  let payload = jwt.verify(token, secretKey);
  return payload;
};

module.exports = { signPayload, accessPayload };
