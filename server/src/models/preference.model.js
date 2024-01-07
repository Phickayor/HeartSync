const { mongoose } = require("mongoose");

const preferenceSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ["male", "female", "everyone"],
    default: "everyone"
  },
  relationshipIntent: {
    type: String,
    enum: [
      "long term partner",
      "short term fun",
      "long term, open to short",
      "short term, open to long",
      "new friends",
      "still figuring it out"
    ]
  },
  age: {
    type: String,
    enum: [
      "Young Adult (18-24)",
      "Adult (25-34)",
      "Middle-Aged (35-49)",
      "Mature (50-64)",
      "Senior (65+)"
    ]
  },
  height: {
    type: String,
    enum: ["Very Short", "Short", "Average", "Tall", "Very Tall"],
    required: true
  },
  femaleBodyType: {
    type: String,
    enum: ["Slim", "Average", "Athletic", "Curvy", "Voluptuous"],
    required: true
  },
  maleBodyType: {
    type: String,
    enum: ["Lean", "Average", "Fit/Athletic", "Muscular", "Stocky"]
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
  }
});

const preferenceModel = mongoose.model("preference", preferenceSchema);
module.exports = preferenceModel;
