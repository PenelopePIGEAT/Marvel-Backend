require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const marvelRoutes = require("./routes/marvel");
const favoriteRoutes = require("./routes/favorite");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/marvel");

app.get("/", (req, res) => {
  res.json({ message: "All systems are online, Sir — Jarvis" });
});

app.use(authRoutes);
app.use(marvelRoutes);
app.use(favoriteRoutes);

app.all("*", (req, res) =>
  res.status(404).json({
    error: "Dormammu, I've come to bargain... - Dr Strange",
  })
);

app.listen(process.env.PORT, () => {
  console.log("🪐 Initializing Stan Lee Universe Protocol... ACTIVATED 🧬");
});
