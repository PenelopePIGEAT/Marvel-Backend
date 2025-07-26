const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Favorite = require("../models/Favorite");

router.post("/favorite", isAuthenticated, async (req, res) => {
  try {
    const { marvelId, type, name, thumbnail } = req.body;

    const favorite = new Favorite({
      userId: req.user._id,
      marvelId,
      type,
      name,
      thumbnail,
    });

    await favorite.save();
    res.status(201).json({ message: "Favori ajouté ! — Deadpool" });
  } catch (error) {
    res.status(500).json({ message: "Impossible d’ajouter. — Vision", error });
  }
});

module.exports = router;
