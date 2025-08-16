const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

// Import des controllers
const {
  getFavorites,
  addFavorite,
  deleteFavorite,
} = require("../controllers/favorite");

// Récupérer tous les favoris
router.get("/", isAuthenticated, getFavorites);

// Ajouter un favori
router.post("/", isAuthenticated, addFavorite);

// Supprimer un favori
router.delete("/:id", isAuthenticated, deleteFavorite);

module.exports = router;
