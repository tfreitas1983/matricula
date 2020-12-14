module.exports = app => {
    const subprefeituras = require('../controllers/subprefeituras.controller')
   
    const router = require ('express').Router()

    router.post("/subprefeituras", subprefeituras.cadastrar)
    router.get("/subprefeituras", subprefeituras.buscarTodos)
    router.get("/subprefeituras/:id", subprefeituras.buscarUm)
    router.put("/subprefeituras/:id", subprefeituras.editar)
    router.delete("/subprefeituras/:id", subprefeituras.apagar)
    router.delete("/subprefeituras", subprefeituras.apagarTodos)
    
    app.use('/api', router)

}