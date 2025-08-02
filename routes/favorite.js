const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Favorite = require("../models/Favorite");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user._id });
    res.status(200).json(favorites);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Impossible de récupérer les favoris.", error });
  }
});

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { marvelId, type, name, thumbnail } = req.body;
    console.log("req.body fav:", req.body);

    const favorite = new Favorite({
      userId: req.user._id,
      marvelId,
      type,
      name,
      thumbnail,
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    console.log("error mise en fav soté back:", error);
    res.status(500).json({ message: "Impossible d’ajouter. — Vision", error });
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const favoriteId = req.params.id;
    await Favorite.deleteOne({ _id: favoriteId, userId: req.user._id });
    res.status(200).json({ message: "Favori supprimé." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Impossible de supprimer le favori.", error });
  }
});

module.exports = router;
