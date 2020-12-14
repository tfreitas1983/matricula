module.exports = app => {
    const ceps = require('../controllers/ceps.controller')
   
    const router = require ('express').Router()

    router.get("/ceps", ceps.buscarTodos)
    router.get("/ceps/:id", ceps.buscarUm)

    app.use('/api', router)

}