module.exports = app => {
    const alunos = require('../controllers/alunos.controller')
   
    const router = require ('express').Router()

    router.post("/alunos", alunos.cadastrar)
    router.get("/alunos", alunos.buscarTodos)
    router.get("/alunos/:id", alunos.buscarUm)
    router.get("/alunos/envio/:id", alunos.email)
    router.get("/alunos/envioaprovado/:id", alunos.emailAprovado)
    router.get("/alunos/envioreprovado/:id", alunos.emailReprovado)
    router.put("/alunos/:id", alunos.editar)
    router.delete("/alunos/:id", alunos.apagar)
    router.delete("/alunos", alunos.apagarTodos)
    
    app.use('/api', router)

}