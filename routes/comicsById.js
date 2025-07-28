const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Erreur route /comics/:id :", error.message);
    res.status(500).json({ error: "Erreur serveur - comics du personnage" });
  }
});

module.exports = router;
