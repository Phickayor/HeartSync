const bcrypt = require("bcrypt");

const handleEncryption = async (text) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedText = await bcrypt.hash(text, salt);
  return encryptedText;
};

const comparePassword = async (password, correctPassword) => {
  const status = await bcrypt.compare(password, correctPassword);
  return status;
};

module.exports = { handleEncryption, comparePassword };
