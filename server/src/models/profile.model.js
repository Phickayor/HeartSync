const { mongoose } = require("mongoose");

const profileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  dob: {
    type: Date
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary"]
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
    type: [String],
    data: Buffer
  },
  displayPicture: {
    type: String
  },
  auth: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
    unique: true
  },
  preference: {
    ref: "preference",
    type: mongoose.Schema.Types.ObjectId
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
