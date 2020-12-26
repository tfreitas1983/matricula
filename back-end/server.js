const express = require ('express')
const path = require ('path')
const fs = require("fs")
const bodyParser = require ('body-parser')
const cors = require ('cors') 
const app = express()

var corsOptions = {
    origin: ["http://localhost:3005", "http://localhost:9000","http://matriculabelfordroxo.com.br", "http://matriculabelfordroxo.com.br" ,"http://matricula.ddns.net:3005", "http://matricula.ddns.net:9000"]
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./models')
const Role = db.role;
db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Conectado à base de dados")
    initial();
})
.catch(err => {
    console.log("Erro ao conectar à base de dados")
    process.exit()
})

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("Adicionado 'user' à collection roles");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("Adicionado 'moderator' à collection roles");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("Adicionado 'admin' à collection roles");
        });
      }
    });
}
app.get("/", (req, res) => {
res.json({ message: "Hello World"})
})


// Rota de cadastros
require("./routes/escola.routes")(app)
require("./routes/turma.routes")(app)
require("./routes/aluno.routes")(app)
require("./routes/curso.routes")(app)
require("./routes/cep.routes")(app)
require("./routes/subprefeitura.routes")(app)
require("./routes/usuarios.routes")(app)

// Rotas de login
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 8085
app.listen(PORT)//, 'localhost', () => {
    console.log(`Servidor rodando na porta ${PORT}.`)
//})

