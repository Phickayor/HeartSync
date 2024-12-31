const { mongoose } = require("mongoose");

const maxDate = () => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const formattedMaxDate = maxDate.toISOString().split("T")[0];
  return formattedMaxDate;
};

const profileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    userName: {
      type: String,
      required: [true, "Username is required"],
      minlength: 3,
      maxlength: 10
      // unique: true
    },
    fullName: {
      type: String,
      required: [true, "Fullname is required"]
    },
    dob: {
      type: Date,
      required: [true, "Date Of Birth is required"],
      max: new Date(maxDate())
    },
    gender: {
      type: String
    },
    school: {
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
    profilePicture: {
      type: String
    },
    cardPicture: {
      type: String
    },
    preferences: {
      type: [String]
    }
  },
  { timestamps: true }
);
const User = mongoose.model("User", profileSchema);
module.exports = User;
