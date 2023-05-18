const express = require("express");
// const { getPublicMessage, getProtectedMessage } = require("./messages.service");
const { checkJwt } = require("../authz/check-jwt");
const Place = require("../models/Place");

/**
 * Router Definition
 */

const placesRouter = express.Router();

placesRouter.get("/", (req, res) => {
  // const message = getPublicMessage();
  res.status(200).send("hello");
});

// @Route POST api/places - Add new Place
placesRouter.post("/", async (req, res) => {
  try {
    const place = new Place(req.body);
    await place.save();
    return res.status(201).json(place);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = {
  placesRouter,
};
