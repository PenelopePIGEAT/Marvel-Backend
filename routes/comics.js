const express = require("express");
const router = express.Router();

// Import des controllers
const {
  getComics,
  getComicsByCharacter,
  getComicDetails,
} = require("../controllers/comics");

// Route en Get pour récupérer tous les comics
router.get("/", getComics);

// Route en Get pour récupérer tous les comics d'un personnage
router.get("/:characterId", getComicsByCharacter);

// Route en Get pour récupérer le détail d'un comic par ID
router.get("/comic/:comicId", getComicDetails);

module.exports = router;
