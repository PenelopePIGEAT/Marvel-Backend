const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const name = req.query.name || "";
    const page = Number(req.query.page) || 1;
    const limit = 100;
    const skip = (page - 1) * limit;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );

    res.json({
      currentPage: page,
      count: response.data.count,
      results: response.data.results,
    });
    console.log("API KEY:", process.env.MARVEL_API_KEY);
  } catch (error) {
    console.error("Dormammu, I've come to bargain... - Dr Strange");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);

      res.status(error.response.status).json({
        message: "Dormammu, I've come to bargain... - Dr Strange",
        error: error.response.data,
      });
    } else {
      console.error(error.message);
      res.status(500).json({
        message: "Dormammu, I've come to bargain... - Dr Strange",
        error: error.message,
      });
    }
  }
});

router.get("/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Erreur route /characterdetails/:characterId :",
      error.message
    );
    res.status(500).json({ error: "Erreur serveur - détail du personnage" });
  }
});

module.exports = router;
