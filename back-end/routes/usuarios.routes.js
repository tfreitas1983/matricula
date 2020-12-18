module.exports = app => {
    const usuarios = require('../controllers/usuarios.controller')
   
    const router = require ('express').Router()

    router.get("/usuarios", usuarios.buscarTodos)
    router.get("/usuarios/:id", usuarios.buscarUm)
    router.put("/usuarios/:id", usuarios.editar)

    app.use('/api', router)

}