const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/charactereincomics/:characterId", async (req, res) => {
  res.json({ message: "Test route OK" });
});

//
module.exports = router;
