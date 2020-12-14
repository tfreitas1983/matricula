const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    nome: String,
    email: String,
    password: String,
    escola: String,   
    roles: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Role" }
    ]
  })
);

module.exports = User;