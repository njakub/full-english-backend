const express = require("express");
// const { getPublicMessage, getProtectedMessage } = require("./messages.service");
const { checkJwt } = require("../../authz/check-jwt");
const Place = require("../models/Place");

/**
 * Router Definition
 */

const placesRouter = express.Router();

// @Route GET api/v1/places - Get all places
placesRouter.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    return res.status(200).json(places);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @Route GET api/v1/places/:id - Returns a place by id
placesRouter.get("/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ msg: "Place not found" });
    }
    return res.status(200).json(place);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @Route POST api/v1/places - Add new Place
placesRouter.post("/", async (req, res) => {
  try {
    const newPlace = new Place({
      ...req.body,
    });
    const place = await newPlace.save();
    return res.status(200).json(place);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @Route DELETE api/v1/places/:id - Delete a place
placesRouter.delete("/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ msg: "Place not found" });
    }
    await place.deleteOne();
    return res.status(200).json({ msg: "Place removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = {
  placesRouter,
};
