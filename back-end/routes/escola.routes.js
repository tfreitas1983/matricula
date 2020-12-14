module.exports = app => {
    const escolas = require('../controllers/escolas.controller')
   
    const files = require ('../controllers/file.controller')
    const router = require ('express').Router()
    const multer = require ('multer')
    const multerConfig = require ('../config/multer')
    
    const upload = multer(multerConfig)

    router.post("/escolas", escolas.cadastrar)
    router.get("/escolas", escolas.buscarTodos)
    router.get("/escolas/files", escolas.buscarImagens)
    router.get("/escolas/files/:id", escolas.buscarImagem)
    router.get("/escolas/:id", escolas.buscarUm)
    router.put("/escolas/:id", escolas.editar)
    router.delete("/escolas/:id", escolas.apagar)
    router.delete("/escolas", escolas.apagarTodos)
    //router.post("/escolas/files", upload.single('file'), escolas.cadastrarImagem)  
    
    app.use('/api', router)

}