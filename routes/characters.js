const express = require("express");
const router = express.Router();

// Import des controllers
const {
  getCharacters,
  getCharacterDetails,
} = require("../controllers/characters");

// Route pour récupérer tous les personnages
router.get("/", getCharacters);

// Route pour récupérer le détail d'un personnage par son ID
router.get("/:characterId", getCharacterDetails);

module.exports = router;
