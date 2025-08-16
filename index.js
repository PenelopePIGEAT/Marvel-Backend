require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");

const loginRoute = require("./routes/auth/login");
const signupRoute = require("./routes/auth/signup");
const favoriteRoute = require("./routes/favorite");
const charactersRoute = require("./routes/characters");
const comicsRoute = require("./routes/comics");
const comicDetailsRoutes = require("./routes/comicdetails");
const checkAuth = require("./routes/checkAuth");

const app = express();
app.use(
  cors({
    origin: `http://localhost:5173`,
    credentials: true,
  })
);
app.use(express.json());
app.use(fileUpload());

mongoose.connect("mongodb://localhost:27017/Marvel");

app.get("/", (req, res) => {
  res.json({ message: "All systems are online, Sir — Jarvis" });
});

app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/favorite", favoriteRoute);
app.use("/characters", charactersRoute);
app.use("/comics", comicsRoute);
app.use("/comic", comicDetailsRoutes);
app.use("/check-auth", checkAuth);

app.all("/.*/", (req, res) =>
  res.status(404).json({
    error: "Dormammu, I've come to bargain... - Dr Strange",
  })
);

app.listen(process.env.PORT || 3000, () => {
  console.log("🪐 Initializing Stan Lee Universe Protocol... ACTIVATED 🧬");
});
