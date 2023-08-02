const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  sausage: {
    rating: { type: Number },
    type: { type: String },
    comment: { type: String },
  },
  bacon: {
    rating: { type: Number },
    type: { type: String },
    comment: { type: String },
  },
  eggs: {
    rating: { type: Number },
    comment: { type: String },
  },
  bakedBeans: {
    rating: { type: Number },
    comment: { type: String },
  },
  toast: {
    rating: { type: Number },
    comment: { type: String },
  },
  friedBread: {
    rating: { type: Number },
    comment: { type: String },
  },
  hashBrown: {
    rating: { type: Number },
    comment: { type: String },
  },
  tomato: {
    rating: { type: Number },
    comment: { type: String },
  },
  mushroom: {
    rating: { type: Number },
    comment: { type: String },
  },
  chips: {
    rating: { type: Number },
    comment: { type: String },
  },
  blackPudding: {
    rating: { type: Number },
    comment: { type: String },
  },
  whitePudding: {
    rating: { type: Number },
    comment: { type: String },
  },
  haggis: {
    rating: { type: Number },
    comment: { type: String },
  },
  bubbleAndSqueak: {
    rating: { type: Number },
    comment: { type: String },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "place",
  },
});

module.exports = mongoose.model("review", ReviewSchema);
