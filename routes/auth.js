const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "I'm always angry. - Hulk" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "I'm Groot. -Groot" });
    }

    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(16);

    const newUser = new User({
      username,
      email,
      password: hash + salt,
      token,
    });

    await newUser.save();

    res.status(201).json({
      message: "Excelsior ! - Stan Lee ",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token: newUser.token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "I am... inevitable. — Thanos", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "We have a Hulk. — Tony Stark" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Access denied. — S.H.I.E.L.D" });
    }

    const storedPassword = user.password;
    const salt = storedPassword.slice(-16);
    const hash = SHA256(password + salt).toString(encBase64);

    if (storedPassword !== hash + salt) {
      return res
        .status(401)
        .json({ message: "Wrong credentials. — Nick Fury" });
    }

    res.status(200).json({
      message: "Wakanda Forever! — T'Challa",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: user.token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something broke the multiverse — Doctor Strange",
      error,
    });
  }
});

module.exports = router;
