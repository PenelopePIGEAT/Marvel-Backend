// Import des modules
const express = require("express");
const router = express.Router();

// Import du middleware
const isAuthenticated = require("../middlewares/isAuthenticated");

// Route GET pour vérifier si l'utilisateur est authentifié
router.get("/check-auth", isAuthenticated, (req, res) => {
  // Si on arrive ici, le middleware a déjà validé le token
  res.status(200).json({ isAuthenticated: true });
});

module.exports = router;
