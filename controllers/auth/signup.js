const User = require("../../models/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// Controller pour gérer la création d'un utilisateur
const signupUser = async (req, res) => {
  try {
    console.log("reçu signup:", req.body);

    const { username, email, password } = req.body;

    // Vérification que tous les champs sont présents
    if (!email || !username || !password) {
      return res.status(400).json({ message: "I'm always angry. - Hulk" });
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "I'm Groot. -Groot" });
    }

    // Création du hash et du token
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(16);

    // Création de l'utilisateur en base
    const newUser = new User({
      username,
      email,
      salt,
      hash,
      token,
    });

    await newUser.save();

    // Réponse envoyée au front
    res.status(201).json({
      message: "Excelsior ! - Stan Lee ",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token: newUser.token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "I am... inevitable. — Thanos",
    });
  }
};

module.exports = { signupUser };
