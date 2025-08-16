const axios = require("axios");
require("dotenv").config();

// Controller pour récupérer tous les comics
const getComics = async (req, res) => {
  try {
    const { title = "", page = 1 } = req.query;
    const limit = 100;
    const skip = (page - 1) * limit;

    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics",
      {
        params: {
          apiKey: process.env.MARVEL_API_KEY,
          title,
          limit,
          skip,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Erreur route /comics :", error.message);
    res.status(500).json({ error: "Erreur serveur - comics" });
  }
};

// Controller pour récupérer les comics d'un personnage
const getComicsByCharacter = async (req, res) => {
  try {
    const { characterId } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}`,
      { params: { apiKey: process.env.MARVEL_API_KEY } }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Erreur route /comics/:id :", error.message);
    res.status(500).json({ error: "Erreur serveur - comics du personnage" });
  }
};

// Controller pour récupérer le détail d'un comic
const getComicDetails = async (req, res) => {
  try {
    const { comicId } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}`,
      { params: { apiKey: process.env.MARVEL_API_KEY } }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Erreur route /comic/:comicId :", error.message);
    res.status(500).json({ error: "Erreur serveur - détail du comic" });
  }
};

module.exports = { getComics, getComicsByCharacter, getComicDetails };
