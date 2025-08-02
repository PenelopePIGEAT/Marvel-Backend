const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/:comicId", async (req, res) => {
  try {
    const { comicId } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.MARVEL_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Erreur route /comicdetails/:comicId :", error.message);
    res.status(500).json({ error: "Erreur serveur - détail du comic" });
  }
});

module.exports = router;
