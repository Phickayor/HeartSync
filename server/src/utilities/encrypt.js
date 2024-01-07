const bcrypt = require("bcrypt");

const handleEncryption = async (text) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedText = await bcrypt.hash(text, salt);
  return encryptedText;
};

module.exports = handleEncryption;
