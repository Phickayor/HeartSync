const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ],
      validate: {
        validator: function (users) {
          return users.length === 2;
        },
        message: "Users array must contain exactly two values."
      }
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  },
  {
    // This ensures that the combination of two users is unique
    indexes: [
      {
        unique: true,
        partialFilterExpression: {
          users: {
            $exists: true,
            $size: 2
          }
        }
      }
    ]
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
