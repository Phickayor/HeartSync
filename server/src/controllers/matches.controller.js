const User = require("../models/user.model");
const userMatches = async (req, res) => {
  try {
    const allUsers = await User.find();
    const matches = [];
    allUsers.map((user) => {
      let userMatchDetails;
      let matchCount = 0;
      if (req.user.preferences?.includes(user.gender)) {
        req.user.preferences.map((userPreference) => {
          if (user.preferences?.includes(userPreference)) {
            matchCount++;
          }
        });
        if (req.user.userName != user.userName) {
          userMatchDetails = {
            matchCount,
            user: {
              _id: user._id,
              userName: user.userName,
              shortBio: user.shortBio,
              preferences: user.preferences,
              cardPicture: user.cardPicture
            }
          };
          matches.push(userMatchDetails);
        }
      }
    });
    res.json({ matches });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

module.exports = userMatches;
