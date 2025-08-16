const express = require("express");
const router = express.Router();
const { signupUser } = require("../../controllers/auth/signup");

// Route en POST signup
router.post("/", signupUser);

module.exports = router;
