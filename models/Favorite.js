const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  marvelId: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  thumbnail: String,
});

module.exports = Favorite;
