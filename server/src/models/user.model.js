const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Users name is required"]
  },
  gender: {
    type: String,
    enum: ["male", "female", "non-binary"],
    required: true
  },
  age: {
    type: Number,
    required: [true, "How old are you?"]
  },
  height: {
    type: String,
    enum: ["Very Short", "Short", "Average", "Tall", "Very Tall"],
    required: true
  },
  weight: {
    type: String,
    enum: ["Slim", "Average", "Athletic", "Curvy", "Voluptuous"],
    required: true
  },
  shortBio: {
    type: String,
    required: [true, "Give a brief description about yourself"]
  },
  longBio: {
    type: String,
    required: [true, "Give a more detailed description about yourself"]
  },
  phoneNumber: {
    type: Number
  },
  state: {
    type: String,
    enum: [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nasarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara",
      "Abuja"
    ]
  },
  revealGender: {
    type: Boolean,
    default: true
  },
  pictures: {
    type: [String], // Assuming it's an array of strings, you can adjust the type accordingly
    required: true, // The array field is required
    validate: {
      validator: function (array) {
        return array.length >= 3; // Minimum three items required
      },
      message: (props) => `${props.value} must have at least 3 items!`
    }
  },
  displayPicture: {
    type: String,
    required: true
  },
  auth: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth", // Reference to the Auth model
    required: true
  },
  preference: [
    {
      ref: "preference",
      type: mongoose.Schema.Types.ObjectId
    }
  ],
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

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
