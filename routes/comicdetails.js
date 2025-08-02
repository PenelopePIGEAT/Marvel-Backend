const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/:comicId", async (req, res) => {
  try {
    const { comicId } = req.params;

    const url = `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.MARVEL_API_KEY}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error("Erreur route /comic/:comicId :", error.message);
    res.status(500).json({ error: "Erreur serveur - détail du comic" });
  }
});

module.exports = router;
