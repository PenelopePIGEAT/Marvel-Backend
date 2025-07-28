require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");

const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const favoriteRoute = require("./routes/favorite");
const charactersRoute = require("./routes/characters");
const comicsRoute = require("./routes/comics");
const comicsByIdRoute = require("./routes/comicsById");

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

mongoose.connect("mongodb://localhost:27017/marvel");

app.get("/", (req, res) => {
  res.json({ message: "All systems are online, Sir — Jarvis" });
});

app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/favorite", favoriteRoute);
app.use("/characters", charactersRoute);
app.use("/comics", comicsRoute);
app.use("/comics", comicsByIdRoute);

app.all("/.*/", (req, res) =>
  res.status(404).json({
    error: "Dormammu, I've come to bargain... - Dr Strange",
  })
);

app.listen(process.env.PORT || 3000, () => {
  console.log("🪐 Initializing Stan Lee Universe Protocol... ACTIVATED 🧬");
});
