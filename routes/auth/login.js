// import des modules nécéssaires
const express = require("express");
const router = express.Router();

// Import du controller login
const { loginUser } = require("../../controllers/auth/login");

// Route en POST pour login
router.post("/", loginUser);

module.exports = router;
