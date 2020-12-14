const dbConfig = require ('../config/db.config')
const mongoose = require ('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.escolas = require('./escolas.model')(mongoose)
db.turmas = require('./turmas.model')(mongoose)
db.alunos = require('./alunos.model')(mongoose)
db.subprefeituras = require('./subprefeituras.model')(mongoose)
db.cursos = require('./cursos.model')(mongoose)
db.ceps = require('./ceps.model')(mongoose)
db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db

