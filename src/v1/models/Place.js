const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  webiste: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  ],
});

module.exports = mongoose.model("place", PlaceSchema);
