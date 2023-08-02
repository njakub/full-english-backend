const express = require("express");
// const { getPublicMessage, getProtectedMessage } = require("./messages.service");
const { checkJwt } = require("../../authz/check-jwt");
const User = require("../models/User");

/**
 * Router Definition
 */

const usersRouter = express.Router();

// @Route GET api/v1/users - Get all user
usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @Route GET api/v1/users/:id - Returns a User by id
usersRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @Route POST api/v1/users - Add new User
usersRouter.post("/", async (req, res) => {
  try {
    const newUser = new User({
      ...req.body,
    });
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @Route DELETE api/v1/users/:id - Delete a User by id
usersRouter.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    await user.deleteOne();
    return res.status(200).json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = {
  usersRouter,
};
