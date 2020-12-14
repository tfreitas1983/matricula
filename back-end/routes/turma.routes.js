module.exports = app => {
    const turmas = require('../controllers/turmas.controller')
   
    const router = require ('express').Router()

    router.post("/turmas", turmas.cadastrar)
    router.get("/turmas", turmas.buscarTodos)
    router.get("/turmas/:id", turmas.buscarUm)
    router.put("/turmas/:id", turmas.editar)
    router.delete("/turmas/:id", turmas.apagar)
    router.delete("/turmas", turmas.apagarTodos)
    
    app.use('/api', router)

}