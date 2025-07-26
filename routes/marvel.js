const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    const name = req.query.name || "";
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "No mutants detected. - Cerebro", error });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "I don’t even know who you are. — Scarlet Witch",
        error,
      });
  }
});

router.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || "";
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&title=${title}&skip=${skip}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an idea... — Nick Fury", error });
  }
});

module.exports = router;
