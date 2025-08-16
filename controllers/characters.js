const axios = require("axios");
require("dotenv").config();

// Controller pour récupérer tous les personnages
const getCharacters = async (req, res) => {
  try {
    const name = req.query.name || ""; // filtre par nom
    const page = Number(req.query.page) || 1; // pagination
    const limit = 100;
    const skip = (page - 1) * limit;

    // Appel à l'API Marvel
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters`,
      {
        params: {
          apiKey: process.env.MARVEL_API_KEY,
          name,
          limit,
          skip,
        },
      }
    );

    // On renvoie les résultats au front
    res.json({
      currentPage: page,
      count: response.data.count,
      results: response.data.results,
    });
  } catch (error) {
    console.error("Dormammu, I've come to bargain... - Dr Strange");
    res.status(500).json({ error: "Erreur serveur - characters" });
  }
};

// Controller pour récupérer le détail d'un personnage
const getCharacterDetails = async (req, res) => {
  try {
    const { characterId } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}`,
      { params: { apiKey: process.env.MARVEL_API_KEY } }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Erreur route /characterdetails/:characterId :",
      error.message
    );
    res.status(500).json({ error: "Erreur serveur - détail du personnage" });
  }
};

module.exports = { getCharacters, getCharacterDetails };
