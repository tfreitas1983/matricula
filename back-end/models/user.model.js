const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    nome: String,
    email: String,
    password: String,
    escola: String, 
    situacao: Boolean,  
    roles: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Role" }
    ]
  })
);

module.exports = User;