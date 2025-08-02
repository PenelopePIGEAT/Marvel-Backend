const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    console.log("reçu login:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "We have a Hulk. — Tony Stark" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Access denied. — S.H.I.E.L.D" });
    }

    const hash = SHA256(password + user.salt).toString(encBase64);

    if (hash !== user.hash) {
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
    });
  }
});

module.exports = router;
