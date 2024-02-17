const { mongoose } = require("mongoose");

const profileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: true
  },
  firstName: {
    type: String,
    required: [true, "Firstname is required"]
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"]
  },
  dob: {
    type: Date,
    required: [true, "Date Of Birth is required"]
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },
  height: {
    type: String
  },
  weight: {
    type: String
  },
  shortBio: {
    type: String
  },
  longBio: {
    type: String
  },
  phoneNumber: {
    type: Number
  },
  revealGender: {
    type: Boolean,
    default: true
  },
  pictures: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pictures"
  },
  auth: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
    unique: true
  },
  preferences: {
    type: [String]
  },
  mutualMatches: [
    {
      ref: "mutualMatches",
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  blockedProfiles: [
    {
      ref: "blockedProfiles",
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});

const profileModel = mongoose.model("Profile", profileSchema);
module.exports = profileModel;
