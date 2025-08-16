// Import du modèle User
const User = require("../models/User");

// Middleware pour vérifier le token
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // Si pas de token, on renvoie 401
    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    // Recherche de l'utilisateur en base
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ message: "Token invalide" });
    }

    // On ajoute l'utilisateur à la requête pour les routes suivantes
    req.user = user;

    // On passe au suivant
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export du middleware
module.exports = isAuthenticated;
