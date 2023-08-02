const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
