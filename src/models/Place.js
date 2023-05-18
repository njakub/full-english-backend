const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("place", PlaceSchema);
