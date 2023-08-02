const express = require("express");
// const { getPublicMessage, getProtectedMessage } = require("./messages.service");
const { checkJwt } = require("../../authz/check-jwt");
const Review = require("../models/Review");
const User = require("../models/User");
const Place = require("../models/Place");

/**
 * Router Definition
 */

const reviewsRouter = express.Router();

// @Route GET api/v1/reviews/:id - Returns a Review by id
reviewsRouter.get("/:id", async (req, res) => {
  try {
    const rating = await Review.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({ msg: "Review not found" });
    }
    return res.status(200).json(rating);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @Route POST api/v1/reviews - Add new Review
reviewsRouter.post("/", async (req, res) => {
  try {
    const place = await Place.findById(req.body.place);
    const user = await User.findById(req.body.user);

    if (!place) {
      return res.status(404).json({ msg: "Place not found" });
    }

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const newReview = new Review({
      ...req.body,
      user: user,
      place: place,
    });
    const rating = await newReview.save();
    return res.status(200).json(rating);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @Route DELETE api/v1/reviews/:id - Delete a Review
reviewsRouter.delete("/:id", async (req, res) => {
  try {
    const rating = await Review.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({ msg: "Review not found" });
    }
    await rating.deleteOne();
    return res.status(200).json({ msg: "Review removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @Route GET api/v1/reviews/place/:id - Returns all Reviews for a Place
reviewsRouter.get("/place/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ msg: "Place not found" });
    }
    const reviews = await Review.find({ place: place });
    return res.status(200).json(reviews);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @Route GET api/v1/reviews/user/:id - Returns all Reviews by a User
reviewsRouter.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const reviews = await Review.find({ user: user });
    return res.status(200).json(reviews);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = {
  reviewsRouter,
};
