module.exports = app => {
    const cursos = require('../controllers/cursos.controller')
   
    const router = require ('express').Router()

    router.post("/cursos", cursos.cadastrar)
    router.get("/cursos", cursos.buscarTodos)
    router.get("/cursos/:id", cursos.buscarUm)
    router.put("/cursos/:id", cursos.editar)
    router.delete("/cursos/:id", cursos.apagar)
    router.delete("/cursos", cursos.apagarTodos)
    
    app.use('/api', router)

}