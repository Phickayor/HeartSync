const User = require("../models/user.model");
const userMatches = async (req, res) => {
  try {
    const allUsers = await User.find();
    const matches = [];
    // console.log(allUsers);
    allUsers.map((user) => {
      var userMatchDetails;
      var matchCount = 0;
      if (req.user.preferences?.includes(user.gender || "Male and Female")) {
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
              cardPicture: user.cardPicture
            }
          };
          matches.push(userMatchDetails);
        }
      }
    });
    if (matches.length == 0) {
      res.status(200).json({ message: "Nothing for you. lol" });
    }
    res.json({ matches });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

module.exports = userMatches;
