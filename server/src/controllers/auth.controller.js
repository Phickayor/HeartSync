const authModel = require("../models/auth.model");
const handleEncryption = require("../utilities/encrypt");

const registerAUser = async (req, res) => {
  try {
    let { email, password, firstName } = req.body;
    const hashedPassword = await handleEncryption(password);
    const createUser = await authModel.create({
      firstName,
      email,
      password: hashedPassword
    });
    res.status(200).json({
      message: "Account created Sucessfully",
      success: true,
      createUser
    });
  } catch (error) {
    res.status(502).json({ error: error.message, success: false });
  }
};


module.exports = {
  registerAUser
};
