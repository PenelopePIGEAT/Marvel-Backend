const Favorite = require("../models/Favorite");

// Controller pour récupérer tous les favoris de l'utilisateur
const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id; // récupéré depuis le middleware
    const favorites = await Favorite.find({ userId });
    res.status(200).json(favorites);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Impossible de récupérer les favoris.", error });
  }
};

// Controller pour ajouter un favori
const addFavorite = async (req, res) => {
  try {
    const { marvelId, type, name, thumbnail, description } = req.body;

    const favorite = new Favorite({
      userId: req.user._id,
      marvelId,
      type,
      name,
      thumbnail,
      description,
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: "Impossible d’ajouter le favori.", error });
  }
};

// Controller pour supprimer un favori
const deleteFavorite = async (req, res) => {
  try {
    const favoriteId = req.params.id;
    await Favorite.deleteOne({ _id: favoriteId, userId: req.user._id });
    res.status(200).json({ message: "Favori supprimé." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Impossible de supprimer le favori.", error });
  }
};

module.exports = { getFavorites, addFavorite, deleteFavorite };
