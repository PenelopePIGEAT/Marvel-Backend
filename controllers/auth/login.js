// Import des modules nécessaires
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// Import du modèle User
const User = require("../../models/User");

// Controller pour gérer la logique de login
const loginUser = async (req, res) => {
  try {
    console.log("reçu login:", req.body);

    // Récupération des informations envoyées par le front
    const { email, password } = req.body;

    // Vérification que tous les champs sont présents
    if (!email || !password) {
      return res.status(400).json({ message: "We have a Hulk. — Tony Stark" });
    }

    // Recherche de l'utilisateur en base par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Access denied. — S.H.I.E.L.D" });
    }

    // Calcul du hash pour comparer avec celui en base
    const hash = SHA256(password + user.salt).toString(encBase64);

    // Vérification du mot de passe
    if (hash !== user.hash) {
      return res
        .status(401)
        .json({ message: "Wrong credentials. — Nick Fury" });
    }

    // Génération d'un nouveau token pour l'utilisateur
    const token = uid2(32);
    user.token = token;
    await user.save();

    // Réponse envoyée au front
    res.status(200).json({
      message: "Wakanda Forever! — T'Challa",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: user.token,
      },
    });
  } catch (error) {
    // Gestion des erreurs serveur
    res.status(500).json({
      message: "Something broke the multiverse — Doctor Strange",
    });
  }
};

// Export du controller pour l'utiliser dans la route login
module.exports = { loginUser };
